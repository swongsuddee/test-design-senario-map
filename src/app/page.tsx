import type { Metadata } from 'next';
import HomeContent from '@/client/components/HomeContent';
import './home.css';

export const metadata: Metadata = {
  title: 'POPPA · Test Design Index',
  description: 'Test design documents for the POPPA project.',
};

export default function Home() {
  return <HomeContent />;
}
