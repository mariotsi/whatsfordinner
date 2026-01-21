import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ThemeRegistry from './ThemeRegistry';
import QueryProvider from './QueryProvider';
import { HistoryProvider } from '@/components/history/HistoryContext';
import styles from '@/app/page.module.css';
import { FC, PropsWithChildren } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "What's for Dinner",
  description: 'Discover your next delicious meal',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.page}>
          <main className={styles.main}>
            <AppRouterCacheProvider>
              <QueryProvider>
                <ThemeRegistry>
                  <HistoryProvider>{children}</HistoryProvider>
                </ThemeRegistry>
              </QueryProvider>
            </AppRouterCacheProvider>
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
