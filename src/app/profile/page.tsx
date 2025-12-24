"use client";

import { useState } from "react";
import { AppHeader } from "@/components/ui/app-header";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  Camera,
  Shield,
  Bell,
  Palette,
  Globe
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/libs/utils";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Alex Morgan",
    email: user?.email || "alex.morgan@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Mindful Explorer | Wellness Enthusiast | Always learning and growing",
    location: "San Francisco, CA",
    joinDate: "January 2024",
  });

  const userInitials = profileData.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const stats = [
    { label: "Journal Entries", value: "47", trend: "+12%" },
    { label: "Meditation Streak", value: "23 days", trend: "🔥" },
    { label: "Goals Completed", value: "8/12", trend: "+3 this month" },
    { label: "Total Sessions", value: "156", trend: "+24%" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-calm">
      <AppSidebar className="hidden md:block" />
      <div className="flex-1 flex flex-col md:ml-72">
        <AppHeader />
        
        <div className="container mx-auto px-4 py-6 md:px-6">
          <div className="space-y-6">
            {/* Profile Header */}
            <Card className="border-0 shadow-wellness-medium bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-wellness-medium">
                      <AvatarImage src={user?.avatar} alt={profileData.name} />
                      <AvatarFallback className="bg-gradient-primary text-2xl text-white">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all">
                        <Camera className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        {isEditing ? (
                          <Input
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="text-2xl font-semibold mb-1"
                          />
                        ) : (
                          <h1 className="text-2xl font-semibold text-foreground">{profileData.name}</h1>
                        )}
                        <Badge className="mt-2 bg-gradient-primary text-white border-0">
                          {profileData.joinDate}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="gap-2"
                      >
                        {isEditing ? (
                          <>
                            <Save className="h-4 w-4" />
                            Save
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {isEditing ? (
                      <Input
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="text-sm text-muted-foreground mt-2"
                        placeholder="Your bio"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-2">{profileData.bio}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-wellness-soft bg-white hover:shadow-wellness-medium transition-all">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.trend}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="personal" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              {/* Personal Info Tab */}
              <TabsContent value="personal">
                <Card className="border-0 shadow-wellness-soft bg-white">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          <Mail className="h-4 w-4 inline mr-2" />
                          Email Address
                        </Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground py-2">{profileData.email}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          <Phone className="h-4 w-4 inline mr-2" />
                          Phone Number
                        </Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground py-2">{profileData.phone}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">
                          <MapPin className="h-4 w-4 inline mr-2" />
                          Location
                        </Label>
                        {isEditing ? (
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground py-2">{profileData.location}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="joinDate">
                          <Calendar className="h-4 w-4 inline mr-2" />
                          Member Since
                        </Label>
                        <p className="text-sm text-muted-foreground py-2">{profileData.joinDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences">
                <Card className="border-0 shadow-wellness-soft bg-white">
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Customize your app experience.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                        <div className="flex items-center gap-3">
                          <Palette className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Theme</p>
                            <p className="text-sm text-muted-foreground">Light mode</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Language</p>
                            <p className="text-sm text-muted-foreground">English (US)</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <Card className="border-0 shadow-wellness-soft bg-white">
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your account security settings.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Password</p>
                          <p className="text-sm text-muted-foreground">Last changed 2 months ago</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Change Password</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Not enabled</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
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
