import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Document, metadataBase } from '@/lib/layout'
import '@/styles/streaming.css'

const description =
  'Olufunbi Ibrahim, frontend developer in Abuja. Insurance platforms, open source on Stellar, and event sites. Open to remote roles.'

export const metadata: Metadata = {
  metadataBase,
  title: 'Olufunbi Ibrahim, frontend developer',
  description,
  openGraph: {
    title: 'Olufunbi Ibrahim, frontend developer',
    description,
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Olufunbi Ibrahim, frontend developer' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.jpg'] },
}

export const viewport: Viewport = {
  viewportFit: 'cover',
  colorScheme: 'dark light',
  themeColor: '#0F0F12',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <Document>{children}</Document>
}
