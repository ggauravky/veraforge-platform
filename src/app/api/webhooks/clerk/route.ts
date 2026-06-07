import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    return new Response('Error: Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local', {
      status: 500,
    });
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('x-svix-id');
  const svix_timestamp = headerPayload.get('x-svix-timestamp');
  const svix_signature = headerPayload.get('x-svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'x-svix-id': svix_id,
      'x-svix-timestamp': svix_timestamp,
      'x-svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification failed', {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data;

    const email = email_addresses?.[0]?.email_address;
    const fullName = `${first_name || ''} ${last_name || ''}`.trim() || 'New Student';

    if (!email) {
      return new Response('Error: No email provided', { status: 400 });
    }

    try {
      await connectToDatabase();

      // Check if user already exists
      const existingUser = await User.findOne({ clerkId: id });
      if (!existingUser) {
        await User.create({
          clerkId: id,
          fullName,
          email,
          accountStatus: 'pending_approval',
          role: 'student',
        });
        console.log(`Synced user ${email} as student to database.`);
      }
    } catch (dbError) {
      console.error('Database sync error in webhook:', dbError);
      return new Response('Database error', { status: 500 });
    }
  }

  return new Response('Webhook received', { status: 200 });
}
