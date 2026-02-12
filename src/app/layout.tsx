import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

// 👉 Added Google Fonts
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
})

// import { Inter, Playfair_Display } from 'next/font/google'

// const inter = Inter({
//   subsets: ['latin'],
//   weight: ['400', '500', '600'],
//   variable: '--font-body',
//   display: 'swap',
// })

// const playfair = Playfair_Display({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   variable: '--font-heading',
//   display: 'swap',
// })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>

      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
