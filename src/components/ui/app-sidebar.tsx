"use client";

import { 
  Home, 
  BookOpen, 
  Target, 
  Lightbulb, 
  Crown,
  Activity,
  Bell,
  BarChart3,
  Settings,
  User,
  LucideIcon
} from "lucide-react";
import { Button } from "./button";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { getSidebarItems, type UserRole } from "@/utils/rbac";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

const allNavItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
  { id: "activities", label: "Activities", icon: Activity, href: "/activities" },
  { id: "journal", label: "Journal", icon: BookOpen, href: "/journal" },
  { id: "reports", label: "Reports", icon: BarChart3, href: "/reports" },
  { id: "notifications", label: "Notifications", icon: Bell, href: "/notifications" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const userRole = (user?.role || "patient") as UserRole;
  const allowedItems = getSidebarItems(userRole);
  const navItems = allNavItems.filter(item => allowedItems.includes(item.id));

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 h-screen w-72 border-r border-border/50 bg-sidebar p-6",
        className
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo - Hidden on mobile, shown in header */}
        <div className="mb-8 hidden md:block">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary mb-2">
            <span className="text-lg font-bold text-white">SM</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground">SunstoneMind</h2>
          <p className="text-xs text-muted-foreground">
            {userRole === "patient" ? "Wellness Journey" : userRole === "doctor" ? "Provider Portal" : "Admin Panel"}
          </p>
          <p className="text-xs text-primary mt-1 font-medium capitalize">{userRole}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link key={item.id} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-12 px-4 rounded-xl transition-all",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive
                      ? "bg-gradient-primary text-white shadow-wellness-soft"
                      : "text-sidebar-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Premium CTA */}
        <div className="mt-auto rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-4 text-white shadow-wellness-medium">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="h-5 w-5" />
            <h3 className="font-semibold text-sm">Go Premium</h3>
          </div>
          <p className="text-xs opacity-90 mb-3">
            Unlock all premium content.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="w-full h-8 bg-white/20 hover:bg-white/30 text-white border-0"
          >
            Upgrade
          </Button>
        </div>
      </div>
    </aside>
  );
}

