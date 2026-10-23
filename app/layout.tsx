import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Z — AI Seller",
  description: "Turn one product photo into a complete selling operation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
