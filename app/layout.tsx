import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Silkscreen, Press_Start_2P } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const silkscreen = Silkscreen({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-pixel',
})

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-retro-title',
})

export const metadata: Metadata = {
  title: 'Misi Agen Pancasila | Habbo Civics Indonesia',
  description:
    'Game Interaktif Edukasi Pendidikan Pancasila: Pelanggaran Hak & Pengingkaran Kewajiban Warga Negara bergaya Habbo Hotel Retro Isometric. Powered by James Timothy (XII B2/17) & Karla Jessica Hartono (XII B2/23).',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} ${silkscreen.variable} ${pressStart.variable} font-sans antialiased bg-[#1b2a3a] text-slate-100 select-none overflow-x-hidden`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
