import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'

import '@/styles/globals.css'

import { Analytics } from '@/components/analytics'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading'
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Radix UI'
  ],
  authors: [
    {
      name: 'Natchi',
      url: 'https://natchi.fr'
    }
  ],
  creator: 'Natchi',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: false
  },
  themeColor: 'var(--background)'
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang='fr' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen font-sans antialiased',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <Providers>
          {children}
          <Analytics />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
