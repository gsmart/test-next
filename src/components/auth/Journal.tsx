"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save, Calendar, BookOpen } from 'lucide-react';
import { AppHeader } from "@/components/ui/app-header";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function Journal() {
  const [entryText, setEntryText] = useState('');

  const handleSave = () => {
    if (entryText.trim()) {
      // TODO: Save to backend
      console.log('Saving entry:', entryText);
      // Clear after save
      setEntryText('');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-calm">
      <AppSidebar className="hidden md:block" />
      <div className="flex-1 flex flex-col md:ml-72">
        <AppHeader />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-6 md:px-6">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <BookOpen className="w-8 h-8 text-primary" />
                  Journal
                </h1>
                <p className="text-muted-foreground">
                  A safe space for your thoughts and reflections.
                </p>
              </div>

              {/* Writing Area */}
              <Card className="border-0 shadow-wellness-soft bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      New Entry
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="What's on your mind today? This is your safe space to express any thoughts or feelings..."
                    value={entryText}
                    onChange={(e) => setEntryText(e.target.value)}
                    className="min-h-[400px] resize-none text-base leading-relaxed"
                  />
                  
                  <div className="flex justify-between items-center pt-4">
                    <div className="text-sm text-muted-foreground">
                      {entryText.length} characters
                    </div>
                    <Button 
                      onClick={handleSave}
                      disabled={!entryText.trim()}
                      className="gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Entry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
