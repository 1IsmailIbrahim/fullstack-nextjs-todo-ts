import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/Providers/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { dark, experimental__simple } from "@clerk/themes";
import { cookies } from "next/headers";
import SetThemeCookie from "@/components/SetThemeCookie";

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

const getTheme = (): "dark" | "light" => {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value;

  return theme === "dark" ? "dark" : "light";
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = getTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : experimental__simple,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SetThemeCookie /> {/* Include the client component */}
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
