import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/Providers/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full Stack Todo App with Next.js",
  description:
    "Create a full stack todo application with Next.js, TypeScript, Prisma, and MongoDB",
  keywords: [
    "Next.js",
    "TypeScript",
    "Prisma",
    "MongoDB",
    "Server Actions",
    "Server Components",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
