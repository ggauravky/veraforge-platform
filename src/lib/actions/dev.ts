'use server';

import { revalidatePath } from 'next/cache';
import { devToggleRole, devResetStudent } from '../auth-sync';

export async function toggleRoleAction(clerkId: string) {
  try {
    const updatedUser = await devToggleRole(clerkId);
    if (!updatedUser) {
      return { success: false, error: 'User not found' };
    }
    
    revalidatePath('/');
    revalidatePath('/dashboard');
    revalidatePath('/admin');
    revalidatePath('/onboarding');
    return { success: true, role: updatedUser.role };
  } catch (error: any) {
    console.error('Toggle role error:', error);
    return { success: false, error: error.message || 'Failed to toggle role' };
  }
}

export async function resetStudentAction(clerkId: string) {
  try {
    const updatedUser = await devResetStudent(clerkId);
    if (!updatedUser) {
      return { success: false, error: 'User not found' };
    }

    revalidatePath('/');
    revalidatePath('/dashboard');
    revalidatePath('/admin');
    revalidatePath('/onboarding');
    return { success: true };
  } catch (error: any) {
    console.error('Reset student error:', error);
    return { success: false, error: error.message || 'Failed to reset student status' };
  }
}
