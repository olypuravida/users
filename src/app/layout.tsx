import React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Mindflics - Users',
  description: 'Mindflics - Users microservice',
}

type Props = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={ poppins.className }>
        { children }
      </body>
    </html>
  )
}
