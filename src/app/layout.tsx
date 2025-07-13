import type { Metadata } from "next";
import "@/styles/global.css";
import localFont from "next/font/local";
import { SimpleModalRenderer } from "@/components/ui/simpleModalRenderer";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

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
  const navMenuList = [
    {
      title: "home",
      href: "/commentaries",
    },
    {
      title: "myPage",
      href: "/my",
    },
  ];

  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <div className="min-h-screen max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <NavigationMenu
            className="flex w-full rounded-sm
            shadow-sm
            "
          >
            <NavigationMenuList className="p-4">
              {navMenuList.map((menu, index) => (
                <NavigationMenuItem
                  key={menu.title}
                  className={cn("px-4 py-2", index !== navMenuList.length - 1 && "border-r-2")}
                >
                  <NavigationMenuLink asChild>
                    <Link href={menu.href}>{menu.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {children}
        </div>
        <SimpleModalRenderer />
      </body>
    </html>
  );
}
