"use client";

import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuLink } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { CategorySearch } from "../category/CategorySearch";
import { useSimpleModal } from "@/hooks/useSimpleModal";
import { SubscribeModalContent } from "../subscribe/SubscribeModalContent";
import { Category } from "@/apis/category";

export const Navigation = () => {
  const pathname = usePathname();
  const { isLoggedIn } = useAuthStore();
  const { open, close } = useSimpleModal();

  const handleSubscribe = (category: Category) => {
    open({
      type: "confirm",
      message: null,
      customContent: <SubscribeModalContent close={close} category={category} />,
      buttonList: [],
    });
  };

  const navMenuList = [
    { title: "Commentary", href: "/commentaries" },
    { title: "MyPage", href: "/my" },
  ];

  const checkActiveMenu = (pathname: string, href: string) => {
    const home = ["/", "/login"];
    return home.includes(pathname)
      ? href === "/"
      : pathname.startsWith(href + "/") || pathname === href;
  };

  return (
    <>
      {isLoggedIn && (
        <div className="sticky top-0 bg-white z-1">
          <CategorySearch className={"w-full px-8 py-2"} selectHandler={handleSubscribe} />
          <NavigationMenu className="flex w-full bg-white">
            <ul className="flex justify-between w-full border-b-2 border-b-gray-100">
              {navMenuList.map(menu => {
                const isActive = checkActiveMenu(pathname, menu.href);
                return (
                  <li
                    key={menu.title}
                    className="flex-1 flex justify-center  hover:bg-gray-100 pt-2 "
                  >
                    <NavigationMenuLink asChild>
                      <Link href={menu.href}>
                        <div className="group flex flex-col items-center justify-center h-full transition-colors">
                          <span>{menu.title}</span>
                          <span
                            className={`mt-2 h-1 rounded-full transition-all ${
                              isActive ? "bg-black w-5/5" : "bg-transparent w-5/5"
                            }`}
                          />
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenu>
        </div>
      )}
    </>
  );
};
