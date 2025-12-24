"use client";

import { AppHeader } from "@/components/ui/app-header";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { DashboardHome } from "@/components/dashboard/DashboardHome";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gradient-calm">
      <AppSidebar className="hidden md:block" />
      <div className="flex-1 flex flex-col md:ml-72">
        <AppHeader />
        <main className="flex-1">
          <DashboardHome />
        </main>
      </div>
    </div>
  );
}
