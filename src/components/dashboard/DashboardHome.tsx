"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Frown,
  Meh,
  Smile,
  Laugh,
  AlertCircle,
  Play,
  Edit,
  Calendar,
  Trophy,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { cn } from "@/libs/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { getRoleName, type UserRole } from "@/utils/rbac";

const moods = [
  { name: "Stressed", icon: Frown, color: "text-red-500", bg: "bg-red-50", value: "stressed" },
  { name: "Anxious", icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-50", value: "anxious" },
  { name: "Okay", icon: Meh, color: "text-yellow-400", bg: "bg-yellow-50/50", value: "okay" },
  { name: "Good", icon: Smile, color: "text-orange-500", bg: "bg-orange-50", value: "good" },
  { name: "Great", icon: Laugh, color: "text-green-500", bg: "bg-green-50", value: "great" },
];

const quickActivities = [
  {
    id: "box-breathing",
    title: "Box Breathing",
    description: "Reduce anxiety & regain focus.",
    duration: "5 min",
    icon: "🫁",
    color: "blue",
    action: "Tap to start",
  },
  {
    id: "morning-pages",
    title: "Morning Pages",
    description: "Clear your mind for the day.",
    frequency: "Daily",
    icon: "✍️",
    color: "purple",
    stats: { entries: 12, streak: 17 },
  },
];

const wellnessSessions = [
  {
    id: "deep-sleep",
    title: "Deep Sleep Release",
    type: "Meditation",
    duration: "20m",
    description: "Let go of the day's worries and drift into a peaceful slumber.",
    tag: "Premium",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    id: "focus-flow",
    title: "Focus Flow",
    type: "Breathing",
    duration: "8m",
    description: "Enhance concentration and mental clarity with rhythmic breathing.",
    tag: "Popular",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "gratitude-practice",
    title: "Gratitude Practice",
    type: "Journal",
    duration: "10m",
    description: "Cultivate appreciation and positivity through reflection.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: "body-scan",
    title: "Body Scan Awareness",
    type: "Mindfulness",
    duration: "15m",
    description: "Develop body awareness and release physical tension.",
    tag: "New",
    gradient: "from-blue-500 to-cyan-600",
  },
];

const routineItems = [
  {
    id: "hydration",
    title: "Morning Hydration",
    time: "08:00 AM",
    duration: "5 mins",
    completed: true,
  },
  {
    id: "meditation",
    title: "Meditation",
    time: "09:30 AM",
    duration: "15 mins",
    completed: false,
    canStart: true,
  },
  {
    id: "sleep-prep",
    title: "Sleep Prep",
    time: "10:00 PM",
    duration: "30 mins",
    completed: false,
  },
];

const moodData = [
  { day: "Mon", mood: 2 },
  { day: "Tue", mood: 3 },
  { day: "Wed", mood: 3 },
  { day: "Thu", mood: 4 },
  { day: "Fri", mood: 4 },
  { day: "Sat", mood: 3 },
  { day: "Sun", mood: 3 },
];

export function DashboardHome() {
  const { user } = useAuthStore();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentTime] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  });

  const userRole = (user?.role || "patient") as UserRole;
  const roleName = getRoleName(userRole);
  const greeting = `Good ${currentTime}, ${user?.name || "Alex"}!`;

  const moodEmojis = ["😢", "😕", "😐", "🙂", "😄"];

  return (
    <div className="min-h-screen bg-gradient-calm">
        <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="space-y-6">
          {/* Welcome Section */}
          <Card className="border-0 shadow-wellness-medium bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-semibold">{greeting} ☀️</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {roleName}
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic mt-2">
                "Peace comes from within. Do not seek it without." - Buddha
              </p>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-xl px-6 py-3 gap-2">
                <Play className="h-4 w-4" />
                Start Daily Routine
              </Button>
              <Button variant="outline" className="rounded-xl px-6 py-3 border-primary/40 text-primary hover:bg-primary/10">
                View Progress
              </Button>
            </CardContent>
          </Card>

          {/* Mood Check-in */}
          <Card className="border-0 shadow-wellness-soft bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-xl font-semibold">How are you feeling right now?</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                Weekly Check-in
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {moods.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood === mood.value;

                  return (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-2xl transition-all hover:scale-105 min-w-[90px]",
                        isSelected
                          ? `${mood.bg} ${mood.color} ring-2 ring-purple-500 ring-offset-2`
                          : `${mood.bg} ${mood.color} hover:opacity-80`
                      )}
                    >
                      <Icon className="h-8 w-8 mb-2" />
                      <span className="text-xs font-medium">{mood.name}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Activities */}
          <div className="grid md:grid-cols-2 gap-4">
            {quickActivities.map((activity) => (
              <Card
                key={activity.id}
                className={cn(
                  "border-0 shadow-wellness-soft bg-white hover:shadow-wellness-medium transition-all cursor-pointer",
                  activity.color === "blue" ? "hover:bg-blue-50/50" : "hover:bg-purple-50/50"
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
                            activity.color === "blue" ? "bg-blue-100" : "bg-purple-100"
                          )}
                        >
                          {activity.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{activity.title}</h3>
                          {activity.duration && (
                            <Badge
                              variant="secondary"
                              className={cn(
                                "mt-1 text-xs",
                                activity.color === "blue" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                              )}
                            >
                              {activity.duration}
                            </Badge>
                          )}
                          {activity.frequency && (
                            <Badge variant="secondary" className="mt-1 text-xs bg-purple-100 text-purple-700">
                              {activity.frequency}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                      {activity.action && (
                        <p className="text-xs text-primary font-medium">{activity.action}</p>
                      )}
                      {activity.stats && (
                        <div className="flex gap-2 mt-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>✍️</span>
                            <span>{activity.stats.entries}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>🔥</span>
                            <span>{activity.stats.streak}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Explore Wellness */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Explore Wellness</h2>
                <p className="text-sm text-muted-foreground">Curated sessions for your mind and soul.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-lg">
                  <span className="text-lg">‹</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-lg">
                  <span className="text-lg">›</span>
                </Button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
              {wellnessSessions.map((session) => (
                <Card
                  key={session.id}
                  className={cn(
                    "border-0 shadow-wellness-soft bg-gradient-to-br",
                    session.gradient,
                    "text-white min-w-[260px] cursor-pointer hover:shadow-wellness-medium transition-all"
                  )}
                >
                  <CardContent className="p-6">
                    {session.tag && (
                      <Badge className="mb-3 bg-white/20 text-white border-0">
                        {session.tag}
                      </Badge>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs opacity-90">{session.type}</span>
                      <span className="text-xs opacity-90">{session.duration}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{session.title}</h3>
                    <p className="text-sm opacity-90 line-clamp-2">{session.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Two Column Layout: Routine + Trends + Goals */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Today's Routine */}
            <Card className="border-0 shadow-wellness-soft bg-white lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold">Today's Routine</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {routineItems.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl",
                      item.completed ? "bg-green-50" : "bg-muted/50"
                    )}
                  >
                    {item.completed ? (
                      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.time} • {item.duration}
                      </p>
                    </div>
                    {item.canStart && (
                      <Button size="sm" className="h-7 px-3 text-xs rounded-lg bg-orange-500 hover:bg-orange-600">
                        Start Now
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mood Trends */}
            <Card className="border-0 shadow-wellness-soft bg-white lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold">Mood Trends</CardTitle>
                <select className="text-xs border-0 bg-transparent text-muted-foreground cursor-pointer">
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodData}>
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                      />
                      <YAxis
                        domain={[0, 4]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        ticks={[0, 1, 2, 3, 4]}
                        tickFormatter={(value) => moodEmojis[value]}
                      />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#a855f7"
                        strokeWidth={2}
                        dot={{ fill: "#a855f7", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card className="border-0 shadow-wellness-soft bg-gradient-to-br from-blue-900 to-blue-800 text-white lg:col-span-1">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  <CardTitle className="text-lg font-semibold text-white">Goals</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Stress Reduction</span>
                    <span className="text-sm font-semibold">75%</span>
                  </div>
                  <Progress value={75} className="h-2 bg-white/20" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Mindfulness Minutes</span>
                    <span className="text-sm font-semibold">40%</span>
                  </div>
                  <Progress value={40} className="h-2 bg-white/20" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

