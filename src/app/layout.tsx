import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roconimons",
  description: "Rolimon's but for RoConomy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        <main className="flex flex-col min-h-screen bg-gray-900 text-white">
          <div className="flex items-center justify-between p-4 bg-gray-800">
            {/* <Navbar /> */}
            // todo: nav THAT ISNT FUCKING BUNS ♥♥♥♥♥♥
          </div>
        {children}
        </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
