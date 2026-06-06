'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { getOrCreateUser } from '@/lib/auth-sync';

const onboardingSchema = z.object({
  fullName: z.string().min(2, 'Full Name must be at least 2 characters'),
  universityName: z.string().min(2, 'University Name must be at least 2 characters'),
  graduationYear: z.coerce.number().min(2020).max(2035),
  githubUrl: z.string().url('Invalid URL').regex(/github\.com/, 'Must be a GitHub profile URL'),
  linkedinUrl: z.string().url('Invalid URL').regex(/linkedin\.com/, 'Must be a LinkedIn profile URL'),
  portfolioUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

export async function submitOnboarding(data: OnboardingFormValues) {
  try {
    const activeUser = await getOrCreateUser();
    if (!activeUser) {
      return { success: false, error: 'Unauthorized' };
    }

    const validatedData = onboardingSchema.parse(data);

    await connectToDatabase();
    
    // Update user profile in database
    await User.findOneAndUpdate(
      { clerkId: activeUser.clerkId },
      {
        fullName: validatedData.fullName,
        universityName: validatedData.universityName,
        graduationYear: validatedData.graduationYear,
        githubUrl: validatedData.githubUrl,
        linkedinUrl: validatedData.linkedinUrl,
        portfolioUrl: validatedData.portfolioUrl || undefined,
        accountStatus: 'pending_approval', // sets status to pending
      }
    );

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
