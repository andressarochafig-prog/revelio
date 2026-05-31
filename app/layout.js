import { Open_Sans } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-open-sans',
})

export const metadata = {
  title: 'Revelio',
  description: 'Seu assistente financeiro pessoal com IA',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={openSans.className}>
        {children}
      </body>
    </html>
  )
}