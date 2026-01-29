import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, Sparkles, Zap, Sun, Info, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

export default function Astrology() {
  const { data: profile } = useQuery<any>({
    queryKey: ["/api/profile"],
  });

  const isPremium = profile?.isPremium ?? false;

  const siderealData = profile?.siderealChart || {
    atmakaraka: "Calculating...",
    lagnam: "Calculating...",
    rahu: "Calculating...",
    ketu: "Calculating...",
    atmakarakaInsight: "Decoding your soul's purpose...",
    lagnamInsight: "Analyzing your rising path...",
    rahuInsight: "Tracing your future evolution...",
    ketuInsight: "Harvesting past life wisdom..."
  };

  const tropicalData = profile?.astrologyChart || {
    sunSign: "Calculating...",
    moonSign: "Calculating...",
    ascendant: "Calculating...",
    sunInsight: "Connecting with your core identity...",
    moonInsight: "Refining your emotional inner-world...",
    dailyHoroscope: "Your stars for today are aligning..."
  };

  const SouthIndianChart = ({ title, data }: { title: string, data: any }) => (
    <Card className="bg-card/40 backdrop-blur-md border-2 border-primary/40 shadow-2xl overflow-hidden mb-8">
      <CardHeader className="bg-primary/20 border-b border-primary/20">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-serif text-3xl text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{title}</CardTitle>
            <CardDescription className="text-foreground/90 font-medium italic">South Indian Style Chart</CardDescription>
          </div>
          <Badge className="bg-primary text-primary-foreground border-none px-3 py-1 shadow-lg shadow-primary/20">Sidereal Lahiri</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 bg-transparent">
        <div className="grid grid-cols-4 grid-rows-4 aspect-square max-w-[500px] mx-auto border-4 border-primary/50 m-4 bg-background/30 rounded-lg shadow-inner">
          {/* Row 1 */}
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">12: PI</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">1: AR</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">2: TA</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">3: GE</div>
          
          {/* Row 2 */}
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">11: AQ</div>
          <div className="col-span-2 row-span-2 flex flex-col items-center justify-center bg-primary/10 rounded-xl m-2 border border-primary/20 shadow-lg">
             <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold">Soul Center</p>
             <p className="font-serif text-2xl text-primary font-bold drop-shadow-md">{data.atmakaraka}</p>
             <p className="text-[10px] text-muted-foreground mt-1 font-medium">ASC: {data.lagnam}</p>
          </div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">4: CA</div>
          
          {/* Row 3 */}
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">10: CP</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">5: LE</div>
          
          {/* Row 4 */}
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">9: SG</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">8: SC</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">7: LI</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">6: VI</div>
        </div>
        
        <div className="bg-primary/10 p-6 border-t border-primary/20 grid grid-cols-2 md:grid-cols-4 gap-6">
           <div className="text-center group">
              <p className="text-xs uppercase text-primary/60 font-bold tracking-wider mb-1">Ascendant</p>
              <p className="text-base font-black text-foreground group-hover:text-primary transition-colors">{siderealData.lagnam || tropicalData.ascendant}</p>
           </div>
           <div className="text-center group">
              <p className="text-xs uppercase text-primary/60 font-bold tracking-wider mb-1">Sun (S)</p>
              <p className="text-base font-black text-foreground group-hover:text-primary transition-colors">{tropicalData.sunSign}</p>
           </div>
           <div className="text-center group">
              <p className="text-xs uppercase text-primary/60 font-bold tracking-wider mb-1">Moon (M)</p>
              <p className="text-base font-black text-foreground group-hover:text-primary transition-colors">{tropicalData.moonSign}</p>
           </div>
           <div className="text-center group">
              <p className="text-xs uppercase text-primary/60 font-bold tracking-wider mb-1">Soul Planet</p>
              <p className="text-base font-black text-foreground group-hover:text-primary transition-colors">{siderealData.atmakaraka}</p>
           </div>
        </div>
      </CardContent>
    </Card>
  );

  const VedicInsights = () => (
    <div className="space-y-6">
       <Card className="border-2 border-primary/40 shadow-lg">
          <CardHeader className="bg-primary/10">
             <CardTitle className="font-serif text-2xl text-primary">Vedic (Jyotish) Wisdom</CardTitle>
             <CardDescription className="text-foreground/80">Deep insights from the ancient Sidereal tradition</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
             <div className="grid gap-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                   <h4 className="font-bold text-primary mb-1">Soul Purpose (Atmakaraka)</h4>
                   <p className="text-sm">{siderealData.atmakarakaInsight}</p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                   <h4 className="font-bold text-secondary mb-1">Destiny Path (Rahu & Ketu)</h4>
                   <p className="text-sm mb-2">{siderealData.rahuInsight}</p>
                   <p className="text-sm">{siderealData.ketuInsight}</p>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
                   <h4 className="font-bold text-accent mb-1">Ascendant (Lagnam)</h4>
                   <p className="text-sm">{siderealData.lagnamInsight}</p>
                </div>
             </div>
          </CardContent>
       </Card>
    </div>
  );

  const NatalChartDisplay = () => (
    <div className="space-y-8">
      <SouthIndianChart title="Natal Birth Chart (D1)" data={siderealData} />
      <SouthIndianChart title="Navamsha Chart (D9)" data={{...siderealData, atmakaraka: "Venus"}} />
      <VedicInsights />
    </div>
  );

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Cosmic Charts</h1>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl mb-6">
          <p className="text-sm text-primary font-medium">
            Calculations generated for: <span className="text-foreground">{profile?.birthLocation || "Unknown Location"}</span> on <span className="text-foreground">{profile?.birthDate ? new Date(profile.birthDate).toLocaleDateString() : "Unknown Date"}</span> at <span className="text-foreground">{profile?.birthTime || "Unknown Time"}</span>
          </p>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Decoding your spiritual architecture through the Sidereal and Tropical systems.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <NatalChartDisplay />
          
          <Tabs defaultValue="sidereal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-xl mb-6">
              <TabsTrigger value="sidereal" className="rounded-lg">Sidereal (Vedic)</TabsTrigger>
              <TabsTrigger value="tropical" className="rounded-lg">Tropical (Western)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sidereal" className="space-y-6">
              <Card className="bg-card/40 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-primary drop-shadow-sm">Your Sidereal Soul Map</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 shadow-inner">
                    <h3 className="font-serif text-xl text-primary/90 mb-2">What is a Sidereal Chart?</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                      The Sidereal (Vedic) system uses the actual observable positions of the constellations in the sky. It accounts for the "Precession of the Equinoxes," which shifts about 1 degree every 72 years. This chart represents your **Karmic Reality**—the objective truth of your soul's journey and destiny.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2"><Moon className="h-4 w-4 text-primary" /> Atmakaraka</h4>
                      <p className="text-sm text-muted-foreground">{siderealData.atmakarakaInsight}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2"><Sun className="h-4 w-4 text-primary" /> Lagnam</h4>
                      <p className="text-sm text-muted-foreground">{siderealData.lagnamInsight}</p>
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
                      <p className="text-sm text-muted-foreground">{siderealData.rahuInsight}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-serif">Ketu (South Node)</CardTitle>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">The Mastery</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{siderealData.ketuInsight}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20 mt-6">
                  <h3 className="font-serif text-xl text-primary mb-3">The Soul's Axis Deep-Dive</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Rahu's Material Quest</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Rahu is the head of the dragon. It represents where you are expanding your boundaries. In your chart, Rahu pushes you to master the material world through intellect and communication.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-2">Ketu's Spiritual Wisdom</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Ketu is the tail of the dragon. It represents your natural talents brought from past lives. You possess an innate mastery of spiritual laws, allowing you to navigate the world with a sense of detachment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Lock for Deeper Dashas */}
              <Card className="relative overflow-hidden border-primary/20 bg-primary/5">
                {!isPremium && (
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-8 text-center">
                      <Lock className="h-8 w-8 text-primary mb-4" />
                      <h3 className="font-serif text-xl mb-2">Bhukti & Antara Dashas</h3>
                      <p className="text-sm text-muted-foreground mb-4">Go deeper than Mahadashas. Unlock 5 levels of time-lord precision.</p>
                      <Link href="/subscription">
                          <Button variant="outline" className="rounded-full">View Premium Options</Button>
                      </Link>
                  </div>
                )}
                <CardHeader>
                    <CardTitle className="font-serif">Micro-Timing Cycles</CardTitle>
                </CardHeader>
                <CardContent className={cn("transition-all", !isPremium && "opacity-20 blur-sm pointer-events-none")}>
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold">Jupiter Mahadasha</span>
                          <span className="text-xs text-muted-foreground">Ends 2032</span>
                        </div>
                        <div className="pl-4 border-l-2 border-primary/30 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Saturn Bhukti</span>
                            <Badge variant="outline">Current</Badge>
                          </div>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>Mercury Antara</span>
                            <span>Active through July</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
                      <p className="font-semibold text-foreground">Sun in {tropicalData.sunSign}</p>
                      <p className="text-xs text-muted-foreground mt-1">{tropicalData.sunInsight}</p>
                    </div>
                    <div className="p-4 bg-white/40 rounded-lg">
                      <p className="font-semibold text-foreground">Moon in {tropicalData.moonSign}</p>
                      <p className="text-xs text-muted-foreground mt-1">{tropicalData.moonInsight}</p>
                    </div>
                    <div className="p-4 bg-white/40 rounded-lg col-span-2">
                      <p className="font-semibold text-foreground">Ascendant (Rising) in {tropicalData.ascendant}</p>
                      <p className="text-xs text-muted-foreground mt-1">Your Ascendant represents your outward personality and how others perceive you.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Premium Lock for Asteroids/Transits */}
               <Card className="relative overflow-hidden border-blue-200 bg-blue-50/20">
                {!isPremium && (
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-8 text-center">
                      <Lock className="h-8 w-8 text-blue-600 mb-4" />
                      <h3 className="font-serif text-xl mb-2">Minor Placements & Transits</h3>
                      <p className="text-sm text-muted-foreground mb-4">Unlock Chiron, Lilith, Juno, and daily planetary transit reports.</p>
                      <Link href="/subscription">
                          <Button variant="outline" className="rounded-full border-blue-200 text-blue-600">Upgrade to Mystic</Button>
                      </Link>
                  </div>
                )}
                <CardHeader>
                    <CardTitle className="font-serif">Psychological Depth</CardTitle>
                </CardHeader>
                <CardContent className={cn("transition-all", !isPremium && "opacity-20 blur-sm pointer-events-none")}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-white/60 rounded-lg">
                        <span className="text-xs text-muted-foreground">Chiron</span>
                        <p className="text-sm font-medium">Aries 12°</p>
                      </div>
                      <div className="p-3 bg-white/60 rounded-lg">
                        <span className="text-xs text-muted-foreground">Black Moon Lilith</span>
                        <p className="text-sm font-medium">Scorpio 4°</p>
                      </div>
                    </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-primary text-white overflow-hidden relative">
            <Sparkles className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
            <CardHeader>
              <CardTitle className="font-serif text-xl flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> Your Daily Horoscope
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed italic">
                {tropicalData.dailyHoroscope || "Your personalized daily guidance is aligning with the stars. Please update your birth details to generate your first reading."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary text-white overflow-hidden relative">
            <Zap className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
            <CardHeader>
              <CardTitle className="font-serif text-xl">The Synthesis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed opacity-90">
                A common question is: "Which is right?" The answer is both. Use **Sidereal** for your life's destiny and timing (Dashas), and **Tropical** for your inner psychological processing.
              </p>
              {!isPremium && (
                <Link href="/subscription">
                  <Button variant="secondary" className="w-full mt-4 rounded-full bg-white text-primary hover:bg-white/90">
                    Unlock Full Analysis
                  </Button>
                </Link>
              )}
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
