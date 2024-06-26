import { Inter } from 'next/font/google';
import './globals.css';
import { dir } from 'i18next';
import Providers from './providers';
import Navigation from '../components/navbar/Navigation';

const inter = Inter({ subsets: ['latin'] });

const languages = ['en', 'ko'];

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng} dir={dir(lng)} className="dark">
      <body className={inter.className}>
        <Providers>
          <Navigation lng={lng} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
