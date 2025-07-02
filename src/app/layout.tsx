import type { Metadata } from "next";
import "@/styles/global.css";
import localFont from "next/font/local";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>{children}</body>
    </html>
  );
}
