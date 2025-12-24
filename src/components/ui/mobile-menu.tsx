"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Button } from "./button";
import { Menu } from "lucide-react";
import { AppSidebar } from "./app-sidebar";
import { usePathname } from "next/navigation";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <AppSidebar className="relative border-0 h-full" />
      </SheetContent>
    </Sheet>
  );
}

