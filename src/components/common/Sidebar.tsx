"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type NavigationItem } from "@/config/navigation";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  navigationOptions: NavigationItem[];
}

export function Sidebar({ className, navigationOptions }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            {navigationOptions.map((option) => (
              <Button
                key={option.id}
                variant={pathname.includes(option.url) ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Link
                  href={option.url}
                  className="flex w-full items-center justify-start capitalize"
                >
                  <span className="mr-2 h-4 w-4">{option.icon}</span>
                  {option.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
