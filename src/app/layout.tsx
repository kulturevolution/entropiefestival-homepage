import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'entropiefestival 2025 - 22.-24.08.2025',
  description:
    'Die entropie ist dem Wunsch entsprungen, einen Raum für alternative Kunst, Feierei und kreatives Leben fernab von kapitalistischer Verwertungslogik zu schaffen.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
