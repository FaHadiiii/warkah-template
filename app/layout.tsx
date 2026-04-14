import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Warkah Template Previewer",
  description: "Preview environment for Warkah standard templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
