import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ME4U Academy | Spoken English & Public Speaking",
  description:
    "ME4U Academy helps students and professionals build English fluency, public speaking confidence, and interview-ready communication.",
  openGraph: {
    title: "ME4U Academy",
    description:
      "Spoken English, public speaking, and career communication training in online and offline formats.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
