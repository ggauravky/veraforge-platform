'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { currentUser } from '@clerk/nextjs/server';

const onboardingSchema = z.object({
  fullName: z.string().min(2, 'Full Name must be at least 2 characters'),
  universityName: z.string().min(2, 'University Name must be at least 2 characters'),
  graduationYear: z.string().regex(/^\d{4}$/, 'Must be a 4-digit year'),
  githubUrl: z.string().url('Invalid URL').regex(/github\.com/, 'Must be a GitHub profile URL'),
  linkedinUrl: z.string().url('Invalid URL').regex(/linkedin\.com/, 'Must be a LinkedIn profile URL'),
  portfolioUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

export async function submitOnboarding(data: OnboardingFormValues) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return { success: false, error: 'Unauthorized' };
    }

    const validatedData = onboardingSchema.parse(data);

    await connectToDatabase();

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    if (!email) {
      return { success: false, error: 'No email found in Clerk profile' };
    }

    // Check if user already exists
    let user = await User.findOne({ clerkId: clerkUser.id });

    if (user) {
      // Update existing user record
      user.fullName = validatedData.fullName;
      user.universityName = validatedData.universityName;
      user.graduationYear = validatedData.graduationYear;
      user.githubUrl = validatedData.githubUrl;
      user.linkedinUrl = validatedData.linkedinUrl;
      user.portfolioUrl = validatedData.portfolioUrl || undefined;
      user.accountStatus = 'pending_approval';
      await user.save();
    } else {
      // Create new user record
      await User.create({
        clerkId: clerkUser.id,
        fullName: validatedData.fullName,
        email,
        universityName: validatedData.universityName,
        graduationYear: validatedData.graduationYear,
        githubUrl: validatedData.githubUrl,
        linkedinUrl: validatedData.linkedinUrl,
        portfolioUrl: validatedData.portfolioUrl || undefined,
        accountStatus: 'pending_approval',
        role: 'student',
      });
    }

    revalidatePath('/onboarding');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Onboarding action error:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: error.message || 'Something went wrong' };
  }
}
