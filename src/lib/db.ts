import mongoose from 'mongoose';
import dns from 'dns';

// Override global DNS servers in Node.js to use public DNS resolvers (1.1.1.1, 8.8.8.8)
// to fix querySrv ECONNREFUSED issues caused by local ISP/DNS blockers for mongodb+srv records.
try {
  const currentServers = dns.getServers();
  if (currentServers && !currentServers.includes('1.1.1.1')) {
    dns.setServers(['1.1.1.1', '8.8.8.8', ...currentServers]);
  }
} catch (e) {
  console.warn('Failed to set global DNS servers override:', e);
}

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/veraforge';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI or MONGO_URI environment variable inside .env');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseGlobal: MongooseGlobal | undefined;
}

let cached = global.mongooseGlobal;

if (!cached) {
  cached = global.mongooseGlobal = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached && cached.conn) {
    return cached.conn;
  }

  if (cached && !cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    if (cached) {
      cached.conn = await cached.promise;
    }
  } catch (e) {
    if (cached) {
      cached.promise = null;
    }
    throw e;
  }

  return cached?.conn;
}
