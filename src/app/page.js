import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to Portuguese by default
  redirect('/pt');
} 