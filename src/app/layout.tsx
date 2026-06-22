import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';

// Highly premium typography pairing
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Imperial Financial | Premium Loan Consultancy & Financial Services',
  description: 'Secure the right financing with Imperial Financial. Expert guidance on Salaried Personal Loans, Home Loans, Business Loans, and Loan Against Property (LAP). Direct consultancy by Ravi Godghate.',
  keywords: 'Imperial Financial, Salaried Personal Loan, Home Loan, Business Loan, Loan Against Property, Balance Transfer, Ravi Godghate, Financial Consultation, Pune, Mumbai, Maharashtra Loans',
  authors: [{ name: 'Ravi Godghate' }],
  metadataBase: new URL('https://imperialfinancial.co.in'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Imperial Financial | Premium Loan Consultancy & Financial Services',
    description: 'Expert financial guidance, fast processing, and trusted loan solutions.',
    url: 'https://imperialfinancial.co.in',
    siteName: 'Imperial Financial',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/logo.jpeg',
        width: 800,
        height: 800,
        alt: 'Imperial Financial Logo',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans bg-white text-slate-900 flex flex-col min-h-screen antialiased">
        <SmoothScroll />
        <Navbar />
        <main className="flex-grow pt-[72px] md:pt-[82px]">
          {children}
        </main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
