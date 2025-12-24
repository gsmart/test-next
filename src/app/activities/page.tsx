"use client";

import { useState } from "react";
import { AppHeader } from "@/components/ui/app-header";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Calendar,
  Heart,
  Wind,
  BookOpen,
  ChevronRight
} from "lucide-react";
import { cn } from "@/libs/utils";
import Link from "next/link";

interface Activity {
  id: string;
  title: string;
  description: string;
  type: "meditation" | "breathing" | "journal";
  duration: string;
  category: string;
  completed: boolean;
  thumbnail?: string;
}

const activities: Activity[] = [
  {
    id: "1",
    title: "Deep Sleep Release",
    description: "Let go of the day's worries and drift into a peaceful slumber.",
    type: "meditation",
    duration: "20 min",
    category: "Sleep",
    completed: false,
  },
  {
    id: "2",
    title: "Focus Flow",
    description: "Enhance concentration and mental clarity with rhythmic breathing.",
    type: "breathing",
    duration: "8 min",
    category: "Focus",
    completed: true,
  },
  {
    id: "3",
    title: "Gratitude Practice",
    description: "Cultivate appreciation and positivity through reflection.",
    type: "journal",
    duration: "10 min",
    category: "Gratitude",
    completed: false,
  },
  {
    id: "4",
    title: "Morning Energizer",
    description: "Start your day with renewed energy and positivity.",
    type: "breathing",
    duration: "5 min",
    category: "Energy",
    completed: true,
  },
  {
    id: "5",
    title: "Anxiety Relief",
    description: "Calm your mind and reduce anxiety with guided meditation.",
    type: "meditation",
    duration: "15 min",
    category: "Anxiety",
    completed: false,
  },
  {
    id: "6",
    title: "Evening Reflection",
    description: "Reflect on your day and set intentions for tomorrow.",
    type: "journal",
    duration: "15 min",
    category: "Reflection",
    completed: false,
  },
];

export default function ActivitiesListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | Activity["type"]>("all");

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || activity.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: Activity["type"]) => {
    switch (type) {
      case "meditation":
        return Heart;
      case "breathing":
        return Wind;
      case "journal":
        return BookOpen;
    }
  };

  const getTypeColor = (type: Activity["type"]) => {
    switch (type) {
      case "meditation":
        return "bg-purple-100 text-purple-700";
      case "breathing":
        return "bg-blue-100 text-blue-700";
      case "journal":
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-calm">
      <AppSidebar className="hidden md:block" />
      <div className="flex-1 flex flex-col md:ml-72">
        <AppHeader showSearch={false} />
        
        <div className="container mx-auto px-4 py-6 md:px-6">
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Activities</h1>
              <p className="text-muted-foreground">Explore wellness activities and sessions.</p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedType === "all" ? "default" : "outline"}
                  onClick={() => setSelectedType("all")}
                >
                  All
                </Button>
                <Button
                  variant={selectedType === "meditation" ? "default" : "outline"}
                  onClick={() => setSelectedType("meditation")}
                >
                  Meditation
                </Button>
                <Button
                  variant={selectedType === "breathing" ? "default" : "outline"}
                  onClick={() => setSelectedType("breathing")}
                >
                  Breathing
                </Button>
                <Button
                  variant={selectedType === "journal" ? "default" : "outline"}
                  onClick={() => setSelectedType("journal")}
                >
                  Journal
                </Button>
              </div>
            </div>

            {/* Activities Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredActivities.map((activity) => {
                const Icon = getTypeIcon(activity.type);
                return (
                  <Link key={activity.id} href={`/activities/${activity.id}`}>
                    <Card className="border-0 shadow-wellness-soft bg-white hover:shadow-wellness-medium transition-all cursor-pointer h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className={cn("p-2 rounded-lg", getTypeColor(activity.type))}>
                            <Icon className="h-5 w-5" />
                          </div>
                          {activity.completed && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              Completed
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg">{activity.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {activity.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {activity.duration}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {activity.category}
                            </Badge>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {filteredActivities.length === 0 && (
              <Card className="border-0 shadow-wellness-soft bg-white">
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No activities found matching your search.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

