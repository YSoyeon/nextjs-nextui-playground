'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { useRouter } from 'next/navigation';
import Providers from './providers';
import Navigation from './navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
