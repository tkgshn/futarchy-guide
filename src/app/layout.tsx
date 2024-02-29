import type { Metadata } from "next"
import { Courier_Prime } from "next/font/google"
import "./globals.css"

const font = Courier_Prime({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "futarchy.guide",
  description:
    "You may know tractor beams, cyberanon, but you still have a lot to learn.",
  metadataBase: new URL("https://futarchy.guide"), // why would this be needed?? fuck you netlify
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
