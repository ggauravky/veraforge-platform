import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  fullName: string;
  email: string;
  universityName?: string;
  graduationYear?: number;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  accountStatus: 'pending_approval' | 'active' | 'rejected';
  role: 'student' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  universityName: { type: String },
  graduationYear: { type: Number },
  githubUrl: { type: String },
  linkedinUrl: { type: String },
  portfolioUrl: { type: String },
  accountStatus: { 
    type: String, 
    enum: ['pending_approval', 'active', 'rejected'], 
    default: 'pending_approval' 
  },
  role: { 
    type: String, 
    enum: ['student', 'admin'], 
    default: 'student' 
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
