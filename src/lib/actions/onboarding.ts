'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { currentUser } from '@clerk/nextjs/server';

const onboardingSchema = z.object({
  role: z.enum(['student', 'recruiter']).default('student'),
  fullName: z.string().min(2, 'Full Name must be at least 2 characters'),
  universityName: z.string().optional(),
  graduationYear: z.string().optional(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().url('Invalid URL').regex(/linkedin\.com/, 'Must be a LinkedIn profile URL'),
  portfolioUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  companyName: z.string().optional(),
}).refine((data) => {
  if (data.role === 'student') {
    return (
      !!data.universityName &&
      data.universityName.length >= 2 &&
      !!data.graduationYear &&
      /^\d{4}$/.test(data.graduationYear) &&
      !!data.githubUrl &&
      /github\.com/.test(data.githubUrl)
    );
  } else {
    return !!data.companyName && data.companyName.length >= 2;
  }
}, {
  message: "Required parameters missing for the selected role",
  path: ["role"]
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
      user.role = validatedData.role;
      user.linkedinUrl = validatedData.linkedinUrl;
      
      if (validatedData.role === 'student') {
        user.universityName = validatedData.universityName;
        user.graduationYear = validatedData.graduationYear;
        user.githubUrl = validatedData.githubUrl;
        user.portfolioUrl = validatedData.portfolioUrl || undefined;
        user.accountStatus = 'pending_approval';
        user.companyName = undefined;
      } else {
        user.companyName = validatedData.companyName;
        user.accountStatus = 'active'; // Recruiters auto-approve immediately
        user.universityName = undefined;
        user.graduationYear = undefined;
        user.githubUrl = undefined;
        user.portfolioUrl = undefined;
      }
      await user.save();
    } else {
      // Create new user record
      await User.create({
        clerkId: clerkUser.id,
        fullName: validatedData.fullName,
        email,
        role: validatedData.role,
        linkedinUrl: validatedData.linkedinUrl,
        universityName: validatedData.role === 'student' ? validatedData.universityName : undefined,
        graduationYear: validatedData.role === 'student' ? validatedData.graduationYear : undefined,
        githubUrl: validatedData.role === 'student' ? validatedData.githubUrl : undefined,
        portfolioUrl: (validatedData.role === 'student' && validatedData.portfolioUrl) ? validatedData.portfolioUrl : undefined,
        companyName: validatedData.role === 'recruiter' ? validatedData.companyName : undefined,
        accountStatus: validatedData.role === 'student' ? 'pending_approval' : 'active',
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
