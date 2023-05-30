import React from "react";
import {Nunito} from 'next/font/google'
import './globals.css'
import Navbar from "@/app/components/navbar/Navbar";
export const metadata = {
  title: 'Air bnb clone',
  description: 'Air bnb clone with next js 13',
}
const font = Nunito({
  subsets : ['latin']
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
      <Navbar/>
      {children}
      </body>
    </html>
  )
}
