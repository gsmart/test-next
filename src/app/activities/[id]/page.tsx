"use client";

import { AppHeader } from "@/components/ui/app-header";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Clock, 
  Calendar,
  Heart,
  Wind,
  BookOpen,
  ArrowLeft,
  Share2,
  Bookmark,
  Users,
  Star
} from "lucide-react";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data - in real app, fetch based on ID
const activityDetails = {
  id: "1",
  title: "Deep Sleep Release",
  description: "Let go of the day's worries and drift into a peaceful slumber. This guided meditation helps you release tension, calm your mind, and prepare your body for deep, restorative sleep.",
  longDescription: "This 20-minute meditation session is designed to help you unwind after a long day. Through gentle breathing exercises and body relaxation techniques, you'll learn to let go of stress and anxiety, allowing your body and mind to enter a state of deep rest.",
  type: "meditation",
  duration: "20 min",
  category: "Sleep",
  difficulty: "Beginner",
  instructor: "Sarah Johnson",
  rating: 4.8,
  reviews: 1247,
  participants: 15420,
  completed: false,
  progress: 0,
};

export default function ActivityDetailPage() {
  const params = useParams();
  const activity = activityDetails; // In real app, fetch by params.id

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "meditation":
        return Heart;
      case "breathing":
        return Wind;
      case "journal":
        return BookOpen;
      default:
        return Heart;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "meditation":
        return "bg-purple-100 text-purple-700";
      case "breathing":
        return "bg-blue-100 text-blue-700";
      case "journal":
        return "bg-green-100 text-green-700";
      default:
        return "bg-purple-100 text-purple-700";
    }
  };

  const Icon = getTypeIcon(activity.type);

  return (
    <div className="flex min-h-screen bg-gradient-calm">
      <AppSidebar className="hidden md:block" />
      <div className="flex-1 flex flex-col md:ml-72">
        <AppHeader showSearch={false} />
        
        <div className="container mx-auto px-4 py-6 md:px-6">
          <div className="space-y-6">
            {/* Back Button */}
            <Link href="/activities">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Activities
              </Button>
            </Link>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Hero Section */}
                <Card className="border-0 shadow-wellness-medium bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn("p-3 rounded-xl bg-white/20", getTypeColor(activity.type))}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" size="icon" className="bg-white/20 hover:bg-white/30 border-0">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="icon" className="bg-white/20 hover:bg-white/30 border-0">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-3">{activity.title}</h1>
                    <p className="text-lg opacity-90 mb-4">{activity.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm opacity-90">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {activity.duration}
                      </div>
                      <Badge className="bg-white/20 text-white border-0">
                        {activity.category}
                      </Badge>
                      <Badge className="bg-white/20 text-white border-0">
                        {activity.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                <Card className="border-0 shadow-wellness-soft bg-white">
                  <CardHeader>
                    <CardTitle>About This Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {activity.longDescription}
                    </p>
                  </CardContent>
                </Card>

                {/* Stats */}
                <Card className="border-0 shadow-wellness-soft bg-white">
                  <CardHeader>
                    <CardTitle>Activity Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-xl bg-purple-50">
                        <Star className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">{activity.rating}</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-blue-50">
                        <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">{activity.participants.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Participants</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-green-50">
                        <Heart className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">{activity.reviews.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Reviews</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Start Activity */}
                <Card className="border-0 shadow-wellness-soft bg-white sticky top-24">
                  <CardHeader>
                    <CardTitle>Ready to Start?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activity.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{activity.progress}%</span>
                        </div>
                        <Progress value={activity.progress} />
                      </div>
                    )}
                    <Button className="w-full gap-2 h-12 text-lg" size="lg">
                      <Play className="h-5 w-5" />
                      {activity.completed ? "Start Again" : "Start Activity"}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      <p>Duration: {activity.duration}</p>
                      <p className="mt-1">Instructor: {activity.instructor}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Activities */}
                <Card className="border-0 shadow-wellness-soft bg-white">
                  <CardHeader>
                    <CardTitle>You Might Also Like</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { title: "Anxiety Relief", duration: "15 min", type: "meditation" },
                      { title: "Body Scan", duration: "25 min", type: "meditation" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <div className={cn("p-2 rounded-lg", getTypeColor(item.type))}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.duration}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

