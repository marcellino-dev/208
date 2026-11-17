import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/lenis-provider"
import "./globals.css"

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "208 Estúdio | Tatuagem autoral em Joinville",
  description: "Tatuagens autorais em Joinville desde 2020. Fine line, blackwork, realismo e outros estilos no 208 Estúdio.",
  keywords: ["208 Estúdio", "tatuagem Joinville", "tatuagem autoral", "blackwork", "fine line", "realismo"],
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`}>
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
