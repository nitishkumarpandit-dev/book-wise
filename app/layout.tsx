import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";

const ibmPlexSans = localFont({
  src: [
    { path: "/font/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/font/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/font/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/font/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/font/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "Book Wise",
  description:
    "A comprehensive resource center providing access to a vast collection of academic materials and study spaces for students and faculty.",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
