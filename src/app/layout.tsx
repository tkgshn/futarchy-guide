import type { Metadata, Viewport } from "next"
import { Courier_Prime } from "next/font/google"
import "./globals.css"
import { dir } from 'i18next'
import i18nConfig from '../../next-i18next.config'; // Import config

const font = Courier_Prime({ subsets: ["latin"], weight: "400" })

// Determine the current locale (this needs a proper way to get locale in Server Component)
// For now, let's assume a way to get it, or default to 'en'
// In a real app, you might get this from headers, cookies, or path
const currentLocale = i18nConfig.i18n.defaultLocale; // Example: defaulting

// Function to generate static paths for locales (optional but good for SSG)
export async function generateStaticParams() {
  return i18nConfig.i18n.locales.map((lng) => ({ lng }))
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.5,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "futarchy.guide",
  description:
    "You may know tractor beams, cyberanon, but you still have a lot to learn.",
  metadataBase: new URL("https://futarchy.guide"), // why would this be needed?? fuck you netlify
}

export default function RootLayout({
  children,
  params: { lng } // Expect 'lng' param if using path-based routing
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  const localeToUse = lng || currentLocale;
  return (
    <html lang={localeToUse} dir={dir(localeToUse)}>
      <body className={font.className}>{children}</body>
    </html>
  )
}
