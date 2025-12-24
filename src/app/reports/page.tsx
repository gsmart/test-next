"use client";

import { AppHeader } from "@/components/ui/app-header";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Activity,
  Heart,
  Brain,
  Moon,
  Download,
  Filter
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const moodData = [
  { day: "Mon", mood: 3, stress: 4, energy: 6 },
  { day: "Tue", mood: 4, stress: 3, energy: 7 },
  { day: "Wed", mood: 4, stress: 3, energy: 7 },
  { day: "Thu", mood: 5, stress: 2, energy: 8 },
  { day: "Fri", mood: 5, stress: 2, energy: 8 },
  { day: "Sat", mood: 4, stress: 3, energy: 7 },
  { day: "Sun", mood: 4, stress: 3, energy: 7 },
];

const activityData = [
  { activity: "Meditation", minutes: 120, sessions: 12 },
  { activity: "Breathing", minutes: 45, sessions: 8 },
  { activity: "Journaling", minutes: 90, sessions: 7 },
  { activity: "Exercise", minutes: 150, sessions: 5 },
];

const sleepData = [
  { day: "Mon", hours: 7.5 },
  { day: "Tue", hours: 8.0 },
  { day: "Wed", hours: 7.0 },
  { day: "Thu", hours: 8.5 },
  { day: "Fri", hours: 7.5 },
  { day: "Sat", hours: 9.0 },
  { day: "Sun", hours: 8.0 },
];

const goalProgress = [
  { name: "Stress Reduction", current: 75, target: 100, color: "#a855f7" },
  { name: "Mindfulness Minutes", current: 40, target: 100, color: "#3b82f6" },
  { name: "Sleep Quality", current: 85, target: 100, color: "#10b981" },
  { name: "Journal Entries", current: 60, target: 100, color: "#f59e0b" },
];

const COLORS = ['#a855f7', '#3b82f6', '#10b981', '#f59e0b'];

export default function ReportsPage() {
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h1>
                <p className="text-muted-foreground">Track your wellness journey and insights.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-0 shadow-wellness-soft bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <Heart className="h-5 w-5 text-purple-600" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Mood</p>
                  <p className="text-2xl font-bold text-foreground">4.2</p>
                  <p className="text-xs text-green-600 mt-1">+12% from last week</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-wellness-soft bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Total Sessions</p>
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <p className="text-xs text-green-600 mt-1">+24% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-wellness-soft bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-green-100">
                      <Brain className="h-5 w-5 text-green-600" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Mindfulness Hours</p>
                  <p className="text-2xl font-bold text-foreground">24.5</p>
                  <p className="text-xs text-green-600 mt-1">+8h from last month</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-wellness-soft bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-indigo-100">
                      <Moon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Sleep</p>
                  <p className="text-2xl font-bold text-foreground">7.9h</p>
                  <p className="text-xs text-red-600 mt-1">-0.3h from last week</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Charts */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Mood Trends */}
                  <Card className="border-0 shadow-wellness-soft bg-white">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Mood Trends</CardTitle>
                        <CardDescription>Your mood over the past week</CardDescription>
                      </div>
                      <Select defaultValue="week">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                          <SelectItem value="year">This Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={moodData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="day" stroke="#888" />
                          <YAxis stroke="#888" />
                          <Tooltip />
                          <Area type="monotone" dataKey="mood" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} />
                          <Area type="monotone" dataKey="energy" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Sleep Quality */}
                  <Card className="border-0 shadow-wellness-soft bg-white">
                    <CardHeader>
                      <CardTitle>Sleep Quality</CardTitle>
                      <CardDescription>Average hours of sleep per day</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={sleepData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="day" stroke="#888" />
                          <YAxis stroke="#888" />
                          <Tooltip />
                          <Bar dataKey="hours" fill="#6366f1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="activities" className="space-y-6">
                <Card className="border-0 shadow-wellness-soft bg-white">
                  <CardHeader>
                    <CardTitle>Activity Breakdown</CardTitle>
                    <CardDescription>Time spent on different wellness activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium mb-4">Minutes by Activity</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={activityData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis type="number" stroke="#888" />
                            <YAxis dataKey="activity" type="category" stroke="#888" />
                            <Tooltip />
                            <Bar dataKey="minutes" fill="#a855f7" radius={[0, 8, 8, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-4">Activity Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={activityData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="minutes"
                            >
                              {activityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="goals" className="space-y-6">
                <Card className="border-0 shadow-wellness-soft bg-white">
                  <CardHeader>
                    <CardTitle>Goal Progress</CardTitle>
                    <CardDescription>Track your progress towards wellness goals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {goalProgress.map((goal, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{goal.name}</span>
                          <span className="text-sm font-semibold">{goal.current}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all"
                            style={{
                              width: `${goal.current}%`,
                              backgroundColor: goal.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

