import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Lock, Sparkles, Moon, Star, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "wouter";

export default function CosmicCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock data for the calendar days
  const daysInMonth = 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    energy: ["High", "Focus", "Rest", "Social"][Math.floor(Math.random() * 4)],
    vibration: Math.floor(Math.random() * 9) + 1,
    isPremium: i > 7 // Show first 7 days for free
  }));

  const selectedDay = days[currentDate.getDate() - 1];

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Cosmic Calendar</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Your personalized daily forecast synthesized from your unique Astrology, Numerology, and Human Design.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-serif text-2xl">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon"><ChevronLeft className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><ChevronRight className="h-5 w-5" /></Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                  <div key={d} className="text-center text-xs font-bold text-muted-foreground uppercase py-2">{d}</div>
                ))}
                {days.map((d) => (
                  <button
                    key={d.day}
                    className={cn(
                      "aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all border",
                      d.day === currentDate.getDate() 
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" 
                        : "hover:bg-white/5 border-transparent text-muted-foreground"
                    )}
                    onClick={() => !d.isPremium && setCurrentDate(new Date(2026, 0, d.day))}
                  >
                    <span className="text-sm font-semibold">{d.day}</span>
                    {d.isPremium && <Lock className="h-2 w-2 absolute top-1 right-1 opacity-40" />}
                    <div className={cn(
                      "w-1 h-1 rounded-full mt-1",
                      d.energy === "High" ? "bg-green-400" : d.energy === "Focus" ? "bg-blue-400" : "bg-purple-400"
                    )} />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Reading */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-primary/10 border-primary/20 backdrop-blur-xl relative overflow-hidden">
            <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-primary opacity-20" />
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Day {currentDate.getDate()} Insight</CardTitle>
              <CardDescription>Synthesized Forecast</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-violet-500/20 rounded-lg text-violet-400"><Moon className="h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold text-sm">Astrological Influence</h4>
                    <p className="text-sm text-muted-foreground">Moon square Pluto. Emotional intensity is high. Perfect for deep inner work and purging what no longer serves you.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-teal-500/20 rounded-lg text-teal-400"><Star className="h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold text-sm">Numerological Vibration: {selectedDay.vibration}</h4>
                    <p className="text-sm text-muted-foreground">A day of {selectedDay.vibration === 7 ? "introspection and wisdom" : "action and manifestation"}. Align your goals with this frequency.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Fingerprint className="h-5 w-5" /></div>
                  <div>
                    <h4 className="font-bold text-sm">Human Design Response</h4>
                    <p className="text-sm text-muted-foreground">Your Sacral energy is tuned to creative projects today. Respond to invitations that feel like a "Yes" in your gut.</p>
                  </div>
                </div>
              </div>

              {selectedDay.isPremium ? (
                <div className="p-6 bg-background/50 rounded-2xl border border-dashed border-primary/30 text-center">
                  <Lock className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm font-medium mb-4">Unlock the full month and sync to your Google/iCal Calendar</p>
                  <Link href="/subscription">
                    <Button className="w-full rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                      Upgrade to Mystic
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button variant="outline" className="w-full rounded-full border-primary/20 hover:bg-primary/10">
                  <CalendarIcon className="mr-2 h-4 w-4" /> Add to Calendar
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
