import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Victory Heritage International School | Learn with purpose',
  description:
    'One school community for nursery, primary and secondary education. Nursery · Primary · Secondary.',
  themeColor: '#A80028',
  openGraph: {
    siteName: 'Victory Heritage International School',
    title: 'Victory Heritage International School',
    description:
      'One school community for every stage of the learning journey—from nursery to secondary.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head />
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}