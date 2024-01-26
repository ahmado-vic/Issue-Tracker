import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import { Theme } from '@radix-ui/themes';

import Navbar from './Navbar';
import ClientProvider from './QueryClientProvider';
import AuthProvider from './auth/Provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Issue Tracker is a web app to record daily work issues',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.variable}>
        <AuthProvider>
          <ClientProvider>
            <Theme appearance='light' accentColor='purple'>
              <Navbar />
              <main className='p-5'>{children}</main>
            </Theme>
          </ClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
