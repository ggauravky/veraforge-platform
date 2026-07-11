import { redirect } from 'next/navigation';
import { getOrCreateUser } from '@/lib/auth-sync';
import { getStudentsForRecruiter } from '@/lib/actions/recruiter';
import RecruiterDashboard from '@/components/RecruiterDashboard';

export const dynamic = 'force-dynamic';

export default async function RecruiterPage() {
  const user = await getOrCreateUser();
  if (!user || user.role !== 'recruiter') {
    redirect('/sign-in');
  }

  const res = await getStudentsForRecruiter();
  const students = res.success && res.students ? res.students : [];

  return (
    <RecruiterDashboard 
      recruiter={JSON.parse(JSON.stringify(user))} 
      students={students} 
    />
  );
}
