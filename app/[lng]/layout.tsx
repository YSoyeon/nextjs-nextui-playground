import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navigation from './components/navigation';
import { dir } from 'i18next';
import { fetchGoogleSheetRows } from '@/lib/googlesheet';

const inter = Inter({ subsets: ['latin'] });

const languages = ['en', 'kr'];

export async function generateStaticParams() {
  const data = await fetchGoogleSheetRows(0);
  console.log('google sheets');
  console.log(data);
  return languages.map((lng) => ({ lng, data }));
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
