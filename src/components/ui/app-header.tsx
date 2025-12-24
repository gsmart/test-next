"use client";

import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/libs/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { MobileMenu } from "./mobile-menu";
import { useRouter } from "next/navigation";

interface AppHeaderProps {
  onProfileClick?: () => void;
  onNotificationClick?: () => void;
  showSearch?: boolean;
  className?: string;
}

export function AppHeader({
  onProfileClick,
  onNotificationClick,
  showSearch = true,
  className,
}: AppHeaderProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  const userInitials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      router.push("/profile");
    }
  };

  const handleNotificationClick = () => {
    if (onNotificationClick) {
      onNotificationClick();
    } else {
      router.push("/notifications");
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          <MobileMenu />
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
            <span className="text-lg font-bold text-white">SM</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-foreground">SunstoneMind</h1>
            <p className="text-xs text-muted-foreground">Wellness Journey</p>
          </div>
        </div>

        {/* Center: Search */}
        {showSearch && (
          <div className="relative hidden flex-1 max-w-md mx-8 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search meditations, journals, c..."
              className="w-full pl-10 pr-4 h-10 rounded-xl border-border/50 bg-muted/50 focus:bg-background"
            />
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-xl hover:bg-muted"
            onClick={handleNotificationClick}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-foreground">
                {user?.name || "Alex Morgan"}
              </p>
              <p className="text-xs text-muted-foreground">Mindful Explorer</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={handleProfileClick}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-gradient-primary text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

