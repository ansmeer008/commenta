import type { Metadata } from "next";
import "@/styles/global.css";
import localFont from "next/font/local";
import { SimpleModalRenderer } from "@/components/ui/simpleModalRenderer";
import React from "react";
import { Navigation } from "@/components/navigation/Navigation";
import AuthLayout from "../components/auth/AuthLayout";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import { GlobalLoading } from "@/components/ui/loading";

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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body className="overflow-hidden h-screen">
        <Providers>
          <div className="min-h-screen sm:px-6 lg:px-8 py-6 h-full flex flex-col">
            <Navigation />
            <div className="flex-1 overflow-y-auto scrollbar scrollbar-thumb-gray-100">
              <AuthLayout>{children}</AuthLayout>
            </div>
            {/* <footer className="mt-2 text-center text-sm text-gray-500">© Commenta</footer> */}
          </div>
          {modal}
          <SimpleModalRenderer />
          <Toaster position="top-center" />
          <GlobalLoading />
        </Providers>
      </body>
    </html>
  );
}
