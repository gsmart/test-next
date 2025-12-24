"use client";

import { useState } from "react";
import { AppHeader } from "@/components/ui/app-header";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Check, 
  X, 
  Clock,
  Calendar,
  Heart,
  Target,
  Sparkles,
  Trash2,
  Filter
} from "lucide-react";
import { cn } from "@/libs/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  type: "reminder" | "achievement" | "update" | "routine";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "reminder",
    title: "Daily Meditation Reminder",
    message: "It's time for your morning meditation session.",
    time: "2 minutes ago",
    read: false,
    icon: Bell,
  },
  {
    id: "2",
    type: "achievement",
    title: "🎉 7-Day Streak Achieved!",
    message: "Congratulations! You've completed 7 days of consistent practice.",
    time: "1 hour ago",
    read: false,
    icon: Sparkles,
  },
  {
    id: "3",
    type: "routine",
    title: "Routine: Morning Pages",
    message: "Don't forget to complete your morning journal entry.",
    time: "3 hours ago",
    read: true,
    icon: Calendar,
  },
  {
    id: "4",
    type: "update",
    title: "New Meditation Session Available",
    message: "Check out the new 'Deep Sleep Release' meditation.",
    time: "5 hours ago",
    read: true,
    icon: Heart,
  },
  {
    id: "5",
    type: "achievement",
    title: "Goal Milestone Reached",
    message: "You've completed 75% of your Stress Reduction goal!",
    time: "1 day ago",
    read: true,
    icon: Target,
  },
  {
    id: "6",
    type: "reminder",
    title: "Weekly Check-in Reminder",
    message: "Take a moment to reflect on your week.",
    time: "2 days ago",
    read: true,
    icon: Clock,
  },
];

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const filteredNotifs = notifs.filter((notif) => {
    if (filter === "unread") return !notif.read;
    if (filter === "read") return notif.read;
    return true;
  });

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifs(notifs.filter((n) => n.id !== id));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "reminder":
        return "bg-blue-100 text-blue-700";
      case "achievement":
        return "bg-yellow-100 text-yellow-700";
      case "update":
        return "bg-purple-100 text-purple-700";
      case "routine":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-calm">
      <AppSidebar className="hidden md:block" />
      <div className="flex-1 flex flex-col md:ml-72">
        <AppHeader />
        
        <div className="container mx-auto px-4 py-6 md:px-6">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
                <p className="text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
                </p>
              </div>
              {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead} className="gap-2">
                  <Check className="h-4 w-4" />
                  Mark all as read
                </Button>
              )}
            </div>

            {/* Filters */}
            <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">
                  All
                  {notifs.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {notifs.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  {unreadCount > 0 && (
                    <Badge variant="default" className="ml-2">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
              </TabsList>

              <TabsContent value={filter} className="space-y-4">
                {filteredNotifs.length === 0 ? (
                  <Card className="border-0 shadow-wellness-soft bg-white">
                    <CardContent className="p-12 text-center">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">No notifications found.</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredNotifs.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <Card
                        key={notification.id}
                        className={cn(
                          "border-0 shadow-wellness-soft bg-white transition-all hover:shadow-wellness-medium cursor-pointer",
                          !notification.read && "border-l-4 border-l-primary"
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div
                              className={cn(
                                "p-3 rounded-xl",
                                getNotificationColor(notification.type)
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                                    {notification.title}
                                    {!notification.read && (
                                      <span className="h-2 w-2 rounded-full bg-primary" />
                                    )}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {notification.message}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                                    {notification.time}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteNotification(notification.id);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <Badge
                                variant="secondary"
                                className={cn("text-xs mt-2", getNotificationColor(notification.type))}
                              >
                                {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

