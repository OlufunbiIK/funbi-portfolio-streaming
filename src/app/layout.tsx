import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Document, metadataBase } from '@/lib/layout'
import '@/styles/streaming.css'

const title = 'Olufunbi Ibrahim | Frontend developer in Abuja'
const description =
  "Hi, I'm Funbi. I turn long insurance forms into flows people finish, contribute to open source every month, and build event sites. Open to remote roles."

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: 'Olufunbi Ibrahim',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Olufunbi Ibrahim, frontend developer in Abuja' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
}

export const viewport: Viewport = {
  viewportFit: 'cover',
  colorScheme: 'dark light',
  themeColor: '#0F0F12',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <Document>{children}</Document>
}
