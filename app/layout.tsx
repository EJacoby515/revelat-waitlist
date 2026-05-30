import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const TITLE = "REVÉLAT — the live fashion show where everything is for sale";
const DESCRIPTION =
  "REVÉLAT is the live-auction app where sellers model their clothing on camera and AI opens bidding the moment they put an item on. Join the waitlist for early access.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · REVÉLAT",
  },
  description: DESCRIPTION,
  applicationName: "REVÉLAT",
  keywords: [
    "live shopping",
    "fashion auction",
    "live commerce",
    "resale",
    "live selling app",
    "fashion resale",
    "whatnot alternative",
    "live auction fashion",
  ],
  authors: [{ name: "REVÉLAT" }],
  creator: "REVÉLAT",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "REVÉLAT",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "shopping",
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "REVÉLAT",
      url: SITE_URL,
      description: DESCRIPTION,
      slogan: "The fashion show where everything is for sale.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "REVÉLAT",
      publisher: { "@id": `${SITE_URL}/#org` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}
