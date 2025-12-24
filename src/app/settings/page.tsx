"use client";

import { AppHeader } from "@/components/ui/app-header";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Moon, 
  Sun,
  Volume2,
  Mail,
  Smartphone,
  Lock,
  UserCheck,
  Eye,
  Download,
  Upload
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-gradient-calm">
      <AppSidebar className="hidden md:block" />
      <div className="flex-1 flex flex-col md:ml-72">
        <AppHeader />
        
        <div className="container mx-auto px-4 py-6 md:px-6">
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
              <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <Tabs defaultValue="notifications" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <div className="grid gap-6">
                  <Card className="border-0 shadow-wellness-soft bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notification Preferences
                      </CardTitle>
                      <CardDescription>Choose how you want to be notified about updates and activities.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                          <div className="space-y-1">
                            <Label className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                          <div className="space-y-1">
                            <Label className="flex items-center gap-2">
                              <Smartphone className="h-4 w-4" />
                              Push Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                          <div className="space-y-1">
                            <Label className="flex items-center gap-2">
                              <Bell className="h-4 w-4" />
                              Daily Reminders
                            </Label>
                            <p className="text-sm text-muted-foreground">Get reminded about your daily routine</p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                          <div className="space-y-1">
                            <Label className="flex items-center gap-2">
                              <Volume2 className="h-4 w-4" />
                              Sound Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-wellness-soft bg-white">
                    <CardHeader>
                      <CardTitle>Notification Schedule</CardTitle>
                      <CardDescription>Set when you want to receive notifications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Quiet Hours Start</Label>
                          <Input type="time" defaultValue="22:00" />
                        </div>
                        <div className="space-y-2">
                          <Label>Quiet Hours End</Label>
                          <Input type="time" defaultValue="08:00" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent value="appearance">
                <div className="grid gap-6">
                  <Card className="border-0 shadow-wellness-soft bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Theme Settings
                      </CardTitle>
                      <CardDescription>Customize the appearance of your application.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                        <div className="space-y-1">
                          <Label className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            Theme Mode
                          </Label>
                          <p className="text-sm text-muted-foreground">Choose between light and dark mode</p>
                        </div>
                        <Select defaultValue="light">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">
                              <div className="flex items-center gap-2">
                                <Sun className="h-4 w-4" />
                                Light
                              </div>
                            </SelectItem>
                            <SelectItem value="dark">
                              <div className="flex items-center gap-2">
                                <Moon className="h-4 w-4" />
                                Dark
                              </div>
                            </SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Accent Color</Label>
                        <div className="grid grid-cols-5 gap-2">
                          {[
                            { name: "Blue", color: "bg-blue-500" },
                            { name: "Purple", color: "bg-purple-500" },
                            { name: "Green", color: "bg-green-500" },
                            { name: "Orange", color: "bg-orange-500" },
                            { name: "Teal", color: "bg-teal-500" },
                          ].map((item) => (
                            <button
                              key={item.name}
                              className={`h-12 rounded-xl ${item.color} hover:opacity-80 transition-all border-2 border-transparent hover:border-foreground`}
                              title={item.name}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy">
                <div className="grid gap-6">
                  <Card className="border-0 shadow-wellness-soft bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Privacy Settings
                      </CardTitle>
                      <CardDescription>Control your privacy and data sharing preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                        <div className="space-y-1">
                          <Label className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Profile Visibility
                          </Label>
                          <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                        <div className="space-y-1">
                          <Label className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Activity Tracking
                          </Label>
                          <p className="text-sm text-muted-foreground">Allow tracking of your wellness activities</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50">
                        <div className="space-y-1">
                          <Label className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4" />
                            Data Sharing
                          </Label>
                          <p className="text-sm text-muted-foreground">Share anonymized data for research</p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-wellness-soft bg-white">
                    <CardHeader>
                      <CardTitle>Data Management</CardTitle>
                      <CardDescription>Download or delete your data.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Download className="h-4 w-4" />
                        Download My Data
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
                        <Upload className="h-4 w-4" />
                        Delete My Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent value="account">
                <div className="grid gap-6">
                  <Card className="border-0 shadow-wellness-soft bg-white">
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Update your account details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input type="email" defaultValue="alex.morgan@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label>Username</Label>
                        <Input defaultValue="alexmorgan" />
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-wellness-soft bg-white">
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>Update your password to keep your account secure.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Current Password</Label>
                        <Input type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label>New Password</Label>
                        <Input type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label>Confirm New Password</Label>
                        <Input type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

