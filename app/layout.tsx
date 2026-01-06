import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'CoIEP - Collaborative IEP Platform',
  description: 'Transforming IEP Development Through Collaboration. CoIEP empowers educators to create high-quality, compliant Individualized Education Programs through intelligent AI collaboration.',
  keywords: ['IEP', 'Individualized Education Program', 'Special Education', 'PLAAFP', 'Education Technology', 'AI Education'],
  authors: [{ name: 'CoIEP' }],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'CoIEP - Collaborative IEP Platform',
    description: 'Transforming IEP Development Through Collaboration',
    url: 'https://coiep.com',
    siteName: 'CoIEP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CoIEP - Collaborative IEP Platform',
    description: 'Transforming IEP Development Through Collaboration',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
