import type { Metadata } from "next";
import "@/styles/global.css";
import localFont from "next/font/local";
import { SimpleModalRenderer } from "@/components/ui/simpleModalRenderer";
import React from "react";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Commenta",
  description: "write your own commentaries for web contents and share it!",
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
});

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  const navMenuList = [
    {
      title: "Recommend",
      href: "/",
    },
    {
      title: "Commentaries",
      href: "/commentaries",
    },
    {
      title: "MyPage",
      href: "/my",
    },
  ];

  return (
    <html lang="ko" className={pretendard.className}>
      <body className="overflow-hidden h-screen">
        <div className="min-h-screen sm:px-6 lg:px-8 py-6 h-full flex flex-col">
          <Navigation />
          <div className="flex-1 overflow-y-auto scrollbar scrollbar-thumb-gray-100">
            {children}
          </div>
        </div>
        {auth}
        <SimpleModalRenderer />
      </body>
    </html>
  );
}
