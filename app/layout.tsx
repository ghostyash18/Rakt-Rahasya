import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Rakt Rahasya - Track Your Cycle, Own Your Power',
  description: 'A supportive menstrual hygiene tracking and awareness app designed to empower girls and young women.',
  keywords: 'menstrual health, period tracking, women health, cycle tracking, menstrual hygiene',
  authors: [{ name: 'Rakt Rahasya Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#dc2626',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-charcoal-900 text-white`}>
        <ThemeProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1a1d20',
                color: '#fff',
                border: '1px solid #dc2626',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
