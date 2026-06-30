import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "../components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "KafalMart",
  description:
    "Good Food, Great Mood. Delicious food delivered to your doorstep.",

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
