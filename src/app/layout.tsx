'use client';
import AppProvider from '@/util/app-context';
import { Inter } from 'next/font/google';
import './globals.css';
import AppLayout from '@/components/AppLayout';
import React from 'react';

export default function RootLayout({
  children,
  dialog,
  appbar,
}: {
  children: React.ReactNode;
  dialog: React.ReactNode;
  appbar: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ display: 'flex' }}>
        <AppProvider>
          <AppLayout dialog={dialog} appbar={appbar}>
            {children}
          </AppLayout>
        </AppProvider>
      </body>
    </html>
  );
}
