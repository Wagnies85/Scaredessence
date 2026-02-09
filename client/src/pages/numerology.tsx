import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash, Sparkles, Zap, Moon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Numerology() {
  const { data: profile } = useQuery<any>({
    queryKey: ["/api/profile"],
  });

  const num = profile?.numerologyNumbers || {
    lifePath: "...",
    personalYear: "...",
    soulUrge: "...",
    insight: "Calculating your cosmic vibration..."
  };

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Numerology</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          The Universal Language of Numbers. Decode the vibration of your soul.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Core Numbers */}
        <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-background border-2 border-primary/40 overflow-hidden relative shadow-xl">
                <div className="absolute -right-6 -top-6 text-primary/10">
                    <Hash className="w-48 h-48" />
                </div>
                <CardHeader className="relative z-10">
                    <CardTitle className="font-serif text-2xl text-primary">Life Path Number</CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-10 relative z-10">
                    <span className="font-serif text-9xl text-primary font-black drop-shadow-[0_2px_10px_rgba(var(--primary),0.3)]">{num.lifePath}</span>
                    <p className="mt-4 font-bold text-xl uppercase tracking-[0.2em] text-foreground">
                      {num.lifePath === 5 ? "The Freedom Seeker" : "The Luminary"}
                    </p>
                    <div className="mt-6 p-4 bg-background/60 backdrop-blur-sm rounded-xl border border-primary/20 text-left">
                      <p className="text-sm text-foreground leading-relaxed font-medium">
                        {num.insight}
                      </p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card border-2 border-primary/20 shadow-lg">
                    <CardContent className="p-4 text-center">
                        <p className="text-xs uppercase tracking-widest font-bold text-primary/70 mb-1">Personal Year</p>
                        <p className="text-4xl font-serif font-black text-foreground">{num.personalYear}</p>
                    </CardContent>
                </Card>
                <Card className="bg-card border-2 border-primary/20 shadow-lg">
                    <CardContent className="p-4 text-center">
                        <p className="text-xs uppercase tracking-widest font-bold text-primary/70 mb-1">Soul Urge</p>
                        <p className="text-4xl font-serif font-black text-foreground">{num.soulUrge}</p>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card border-2 border-primary/30 shadow-xl overflow-hidden">
                <CardHeader className="bg-primary/5 border-b border-primary/10">
                    <CardTitle className="font-serif text-2xl text-primary flex items-center gap-2">
                      <Sparkles className="h-6 w-6" /> Your Life Path Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                    <div className="space-y-4">
                      <p className="text-foreground text-lg leading-relaxed font-medium">
                        Your Life Path number {num.lifePath} represents your core essence and the mission your soul chose for this incarnation.
                      </p>
                      
                      {num.lifePath === 5 && (
                        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
                          <h4 className="font-bold text-primary text-xl mb-3">Vibration of Freedom & Change</h4>
                          <p className="text-foreground leading-relaxed">
                            As a Life Path 5, you are the ultimate explorer. Your life is a tapestry of varied experiences, fueled by an insatiable curiosity and a deep-seated need for personal freedom. You thrive on change and possess an innate ability to adapt to any situation.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                         <div className="bg-green-500/10 p-5 rounded-2xl border-2 border-green-500/20">
                            <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                              <Zap className="h-4 w-4" /> Divine Strengths
                            </h4>
                            <ul className="text-sm text-green-900 font-medium space-y-2">
                                <li className="flex items-center gap-2">• Versatile & Resourceful</li>
                                <li className="flex items-center gap-2">• Charismatic Communicator</li>
                                <li className="flex items-center gap-2">• Progressive Thinker</li>
                                <li className="flex items-center gap-2">• Courageous Adventurer</li>
                            </ul>
                         </div>
                         <div className="bg-orange-500/10 p-5 rounded-2xl border-2 border-orange-500/20">
                            <h4 className="font-bold text-orange-700 mb-3 flex items-center gap-2">
                              <Moon className="h-4 w-4" /> Soul Lessons
                            </h4>
                            <ul className="text-sm text-orange-900 font-medium space-y-2">
                                <li className="flex items-center gap-2">• Mastery of Focus</li>
                                <li className="flex items-center gap-2">• Grounding Energy</li>
                                <li className="flex items-center gap-2">• Balanced Independence</li>
                                <li className="flex items-center gap-2">• Emotional Resilience</li>
                            </ul>
                         </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-primary/5 border-2 border-primary/20 shadow-xl">
                <CardHeader>
                    <CardTitle className="font-serif text-2xl text-primary flex items-center gap-2">
                      <Zap className="h-6 w-6 text-yellow-500" /> 2026 Forecast: Personal Year {num.personalYear}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <div className="bg-primary text-primary-foreground w-16 h-16 rounded-2xl flex items-center justify-center font-serif text-4xl font-black shadow-lg shadow-primary/30 flex-shrink-0">
                            {num.personalYear}
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-xl font-bold text-foreground">
                              {num.personalYear === 1 ? "The Seed of New Beginnings" : "The Cycle of Growth"}
                            </h4>
                            <p className="text-foreground/80 leading-relaxed font-medium">
                                {num.personalYear === 1 
                                  ? "2026 is a massive reset for you. This is the start of a brand new 9-year cycle. It's time to take initiative, plant new seeds, and assert your independence. The universe is backing your boldest moves right now."
                                  : "This year focuses on the themes of your personal vibration, aligning your inner world with outer reality."}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
    </Layout>
  );
}
