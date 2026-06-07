'use server';

import { cookies } from 'next/headers';

export async function adminLoginAction(data: { email: string; password: string }) {
  try {
    const { email, password } = data;

    const expectedEmail = process.env.ADMIN_EMAIL || 'admin@veraforge.com';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'VeraForgeAdmin2026Secure';

    if (email === expectedEmail && password === expectedPassword) {
      const cookieStore = await cookies();
      cookieStore.set('admin_session', 'veraforge_admin_secure_session_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      return { success: true };
    }

    return { success: false, error: 'Invalid administrator email or password.' };
  } catch (err: any) {
    console.error('Admin login error:', err);
    return { success: false, error: err.message || 'An error occurred during login.' };
  }
}

export async function adminLogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return { success: true };
}
