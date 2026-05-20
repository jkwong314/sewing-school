import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sewing-school.vercel.app"),
  title: {
    default: "Sewing School — Learn to use your sewing machine",
    template: "%s · Sewing School",
  },
  description:
    "A friendly, project-first guide to using a sewing machine. Setup walkthroughs, stitch simulators, fabric and needle references, and beginner projects.",
  openGraph: {
    title: "Sewing School",
    description:
      "Learn to use a sewing machine with project walkthroughs, an interactive stitch simulator, and a fabric/needle/thread reference.",
    url: "https://sewing-school.vercel.app",
    siteName: "Sewing School",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sewing School",
    description:
      "Learn to use a sewing machine with project walkthroughs and an interactive stitch simulator.",
  },
  themeColor: "#faf6ee",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
