import { Metadata } from "next"
import { keywords } from "./keywords"

export const metadata: Metadata = {
  title: {
    default: "Sencept",
    template: "%s | Sencept",
  },
  keywords: keywords,
  manifest: "https://sencept.aelluminate.com/manifest.json",
  generator: "Sencept",
  applicationName: "Sencept",
  description: "Generating better synthetic data.",
  openGraph: {
    title: "Sencept",
    description: "Generating better synthetic data.",
    url: "https://sencept.aelluminate.com",
    siteName: "Sencept",
    images: [
      {
        url: "https://sencept.aelluminate.com/og.png",
        width: 1920,
        height: 1080,
        alt: "Sencept Open Graph Image",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Sencept",
    card: "summary_large_image",
    site: "@aelluminate",
    creator: "@aelluminate",
    creatorId: "",
    description: "Generating better synthetic data.",
    images: [
      {
        url: "https://sencept.aelluminate.com/og.png",
        width: 1920,
        height: 1080,
        alt: "Sencept Open Graph Image",
      },
    ],
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
    ],
  },
  alternates: {
    canonical: "https://sencept.aelluminate.com",
    languages: {},
  },
  verification: {
    other: {
      me: ["support@aelluminate.com"],
    },
  },
  appLinks: {
    web: {
      url: "https://sencept.aelluminate.com",
      should_fallback: true,
    },
  },
  category: "business",
}

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL("https://sencept.aelluminate.com")

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: "https://sencept.aelluminate.com",
      images: "/og-blog.png",
      siteName: "Sencept",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@aelluminate",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: "/og-blog.png",
      ...override.twitter,
    },
  }
}