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
  {/* === Floating WhatsApp Button === */}
<a
  href="https://wa.me/18165902011"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat on WhatsApp"
  className="whatsapp-float"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="28"
    height="28"
  >
    <path
      fill="white"
      d="M19.11 17.39c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.32.41-.48.14-.16.18-.28.27-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.44-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.28-.96.94-.96 2.3 0 1.35.98 2.66 1.12 2.84.14.18 1.94 2.96 4.7 4.15.66.28 1.18.45 1.58.58.66.21 1.26.18 1.74.11.53-.08 1.64-.67 1.87-1.31.23-.64.23-1.19.16-1.31-.07-.12-.25-.19-.53-.33zM16.02 2.67C8.87 2.67 3.07 8.47 3.07 15.62c0 2.43.64 4.79 1.86 6.86L3 29l6.69-1.75c1.99 1.09 4.25 1.66 6.53 1.66 7.15 0 12.95-5.8 12.95-12.95S23.17 2.67 16.02 2.67zm0 23.64c-2.12 0-4.2-.57-6.01-1.65l-.43-.25-3.97 1.04 1.06-3.87-.28-.45a10.35 10.35 0 01-1.61-5.51c0-5.73 4.66-10.39 10.39-10.39s10.39 4.66 10.39 10.39-4.66 10.39-10.39 10.39z"
    />
  </svg>
</a>
        <Footer />
             
      </body>
    </html>
  )
}
