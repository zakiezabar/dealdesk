import React from "react";
// import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, FileText, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex">
            <Link
              href="/"
              className="flex items-center space-x-4"
            >
              <Image
                src="/mobiz_logo.png"
                width={86}
                height={44}
                alt="mobiz-logo"
              />
              <h1 className="text-xl font-bold text-gray-900">DealDesk</h1>
            </Link>

          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <Menu className="h-4 w-4" />
                  Menu
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-32">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/"
                        className="flex gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex flex-row items-center gap-2">
                          <Home className="h-4 w-4" />
                          <span>Create SOW</span>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/sowlist"
                        className="flex gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex flex-row items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>Saved SOWs</span>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
