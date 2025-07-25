import type { Metadata } from "next";
import "@/styles/global.css";
import localFont from "next/font/local";
import { SimpleModalRenderer } from "@/components/ui/simpleModalRenderer";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import React from "react";

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
        <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 h-full flex flex-col">
          <NavigationMenu
            className="flex bg-white border-b-2
            "
          >
            <ul className="p-4 flex justify-between w-full">
              {navMenuList.map((menu, index) => (
                <li key={menu.title} className="px-4 py-2">
                  <NavigationMenuLink asChild>
                    <Link href={menu.href}>{menu.title}</Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenu>
          <div className="flex-1 overflow-y-auto scrollbar scrollbar-thumb-gray-100">
            {children}
            {auth}
          </div>
        </div>
        <SimpleModalRenderer />
      </body>
    </html>
  );
}
