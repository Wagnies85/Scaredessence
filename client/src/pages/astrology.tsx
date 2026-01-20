import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, Sparkles, Zap, Sun, Info, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Astrology() {
  return (
    <Layout>
      <div className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Cosmic Charts</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Decoding your spiritual architecture through the Sidereal and Tropical systems.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Tabs defaultValue="sidereal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-xl mb-6">
              <TabsTrigger value="sidereal" className="rounded-lg">Sidereal (Vedic)</TabsTrigger>
              <TabsTrigger value="tropical" className="rounded-lg">Tropical (Western)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sidereal" className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-xl border-white/60">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Your Sidereal Soul Map</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                    <h3 className="font-serif text-xl text-indigo-900 mb-2">What is a Sidereal Chart?</h3>
                    <p className="text-sm text-indigo-800 leading-relaxed">
                      The Sidereal (Vedic) system uses the actual observable positions of the constellations in the sky. It accounts for the "Precession of the Equinoxes," which shifts about 1 degree every 72 years. This chart represents your **Karmic Reality**—the objective truth of your soul's journey and destiny.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2"><Moon className="h-4 w-4 text-primary" /> Atmakaraka</h4>
                      <p className="text-sm text-muted-foreground">Your "Soul King." In your chart, this is **Jupiter**, indicating a soul purpose rooted in wisdom, teaching, and spiritual expansion.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2"><Sun className="h-4 w-4 text-primary" /> Lagnam</h4>
                      <p className="text-sm text-muted-foreground">Your Rising Sign is **Leo**. You are here to shine, lead, and express your creative divinity through the heart.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dasha Periods Refined */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> Karmic Nodes: Rahu & Ketu
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-violet-50 to-white border-violet-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-serif">Rahu (North Node)</CardTitle>
                      <Badge className="bg-violet-100 text-violet-700 border-violet-200">The Obsession</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Rahu in Gemini: Your soul is hungry for communication, diversity, and new information in this lifetime. You are breaking cycles of rigid dogma.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-serif">Ketu (South Node)</CardTitle>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">The Mastery</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Ketu in Sagittarius: You carry ancestral wisdom of philosophy and truth. You are naturally detached from religious structures, seeking the essence over the form.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Premium Lock for Deeper Dashas */}
              <Card className="relative overflow-hidden border-primary/20 bg-primary/5">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-8 text-center">
                    <Lock className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-serif text-xl mb-2">Bhukti & Antara Dashas</h3>
                    <p className="text-sm text-muted-foreground mb-4">Go deeper than Mahadashas. Unlock 5 levels of time-lord precision.</p>
                    <Link href="/subscription">
                        <Button variant="outline" className="rounded-full">View Premium Options</Button>
                    </Link>
                </div>
                <CardHeader>
                    <CardTitle className="font-serif">Micro-Timing Cycles</CardTitle>
                </CardHeader>
                <CardContent className="opacity-20 blur-sm pointer-events-none">
                    <div className="h-32 bg-muted rounded-xl" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tropical" className="space-y-6">
              <Card className="bg-white/60 backdrop-blur-xl border-white/60">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Your Tropical Psychological Map</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                    <h3 className="font-serif text-xl text-blue-900 mb-2">The Psychological Self</h3>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      Tropical astrology is seasonal and symbolic. It represents your **Personality and Ego Structure**—how you perceive yourself and how you interact with the social world. While Sidereal is "what happens," Tropical is "how you feel about it."
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/40 rounded-lg">
                      <p className="font-semibold text-foreground">Sun in Virgo</p>
                      <p className="text-xs text-muted-foreground mt-1">Your core identity is analytical, service-oriented, and focused on refinement.</p>
                    </div>
                    <div className="p-4 bg-white/40 rounded-lg">
                      <p className="font-semibold text-foreground">Moon in Gemini</p>
                      <p className="text-xs text-muted-foreground mt-1">Your emotional world is curious, communicative, and needs mental stimulation.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Premium Lock for Asteroids/Transits */}
               <Card className="relative overflow-hidden border-blue-200 bg-blue-50/20">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-8 text-center">
                    <Lock className="h-8 w-8 text-blue-600 mb-4" />
                    <h3 className="font-serif text-xl mb-2">Minor Placements & Transits</h3>
                    <p className="text-sm text-muted-foreground mb-4">Unlock Chiron, Lilith, Juno, and daily planetary transit reports.</p>
                    <Link href="/subscription">
                        <Button variant="outline" className="rounded-full border-blue-200 text-blue-600">Upgrade to Mystic</Button>
                    </Link>
                </div>
                <CardHeader>
                    <CardTitle className="font-serif">Psychological Depth</CardTitle>
                </CardHeader>
                <CardContent className="opacity-20 blur-sm pointer-events-none">
                    <div className="h-32 bg-muted rounded-xl" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-primary text-white overflow-hidden relative">
            <Zap className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
            <CardHeader>
              <CardTitle className="font-serif text-xl">The Synthesis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed opacity-90">
                A common question is: "Which is right?" The answer is both. Use **Sidereal** for your life's destiny and timing (Dashas), and **Tropical** for your inner psychological processing.
              </p>
              <Link href="/subscription">
                <Button variant="secondary" className="w-full mt-4 rounded-full bg-white text-primary hover:bg-white/90">
                  Unlock Full Analysis
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="bg-white/50 backdrop-blur-md border-white/60">
            <CardHeader>
              <CardTitle className="font-serif text-lg flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" /> Chart Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ayanamsa</span>
                <span className="font-medium">Lahiri</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">House System</span>
                <span className="font-medium">Whole Sign</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
