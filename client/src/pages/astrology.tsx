import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, Sun, ArrowUpRight } from "lucide-react";

export default function Astrology() {
  return (
    <Layout>
      <div className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Vedic Astrology</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Jyotish Shastra: The Science of Light. Explore your karmic map and planetary periods.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Chart Visualization Mockup */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-0 shadow-lg bg-white/40 backdrop-blur-xl overflow-hidden">
            <div className="aspect-square md:aspect-[16/9] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative flex items-center justify-center p-8 group">
              {/* Decorative Chart Lines */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
              
              {/* North Indian Chart Style (Diamond) SVG Mockup */}
              <svg viewBox="0 0 100 100" className="w-full h-full max-w-md stroke-white/30 stroke-1 fill-none drop-shadow-2xl animate-in zoom-in duration-1000">
                 <path d="M50 0 L100 50 L50 100 L0 50 Z" />
                 <path d="M0 0 L100 100" />
                 <path d="M100 0 L0 100" />
                 <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
                 
                 {/* Planetary Symbols (text placeholders) */}
                 <text x="50" y="25" fill="white" fontSize="4" textAnchor="middle" className="font-serif">Sun</text>
                 <text x="25" y="50" fill="white" fontSize="4" textAnchor="middle" className="font-serif">Jup</text>
                 <text x="75" y="50" fill="white" fontSize="4" textAnchor="middle" className="font-serif">Ven</text>
                 <text x="50" y="75" fill="white" fontSize="4" textAnchor="middle" className="font-serif">Sat</text>
                 <text x="50" y="50" fill="white" fontSize="5" fontWeight="bold" textAnchor="middle" className="font-serif">Lagna</text>
              </svg>
              
              <Badge className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-white/20">
                Rasi Chart (D1)
              </Badge>
            </div>
          </Card>

          {/* Dasha Periods - Specifically Requested */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-foreground flex items-center gap-2">
              <SparkleIcon className="text-primary" /> Vimshottari Dasha
            </h2>
            <Card className="bg-gradient-to-r from-violet-50 to-fuchsia-50 border-violet-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Current Mahadasha</h3>
                    <p className="text-primary font-medium">Rahu (North Node)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Ends</p>
                    <p className="font-mono text-foreground">May 2028</p>
                  </div>
                </div>

                <div className="relative pt-6">
                  <div className="absolute top-0 left-0 w-full h-1 bg-black/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[65%]" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-white/60 p-3 rounded-lg border border-white/50">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Antardasha</p>
                      <p className="font-semibold text-foreground">Ketu</p>
                      <p className="text-xs text-primary mt-1">Current</p>
                    </div>
                     <div className="bg-white/40 p-3 rounded-lg border border-white/20 opacity-60">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Pratyantar</p>
                      <p className="font-semibold text-foreground">Venus</p>
                      <p className="text-xs text-muted-foreground mt-1">Next: Sun</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/50 rounded-xl border border-white/40">
                  <h4 className="font-serif font-medium mb-2 text-foreground">Ketu Dasha Insights</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You are currently in a sub-period of Ketu within Rahu. This is a time of deep spiritual introspection and detachment. 
                    While Rahu pushes you towards worldly ambition, Ketu pulls you inward to find the essence. Expect sudden insights and a desire for liberation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="bg-white/50 backdrop-blur-md border-white/60">
            <CardHeader>
              <CardTitle className="font-serif">Planetary Positions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { planet: "Sun", sign: "Leo", house: "1st", deg: "12° 34'" },
                { planet: "Moon", sign: "Taurus", house: "10th", deg: "05° 12'" },
                { planet: "Mars", sign: "Aries", house: "9th", deg: "28° 45'" },
                { planet: "Mercury", sign: "Virgo", house: "2nd", deg: "15° 20'" },
                { planet: "Jupiter", sign: "Pisces", house: "8th", deg: "02° 10'" },
                { planet: "Venus", sign: "Libra", house: "3rd", deg: "19° 55'" },
                { planet: "Saturn", sign: "Aquarius", house: "7th", deg: "11° 08'" },
                { planet: "Rahu", sign: "Gemini", house: "11th", deg: "22° 30'" },
                { planet: "Ketu", sign: "Sagittarius", house: "5th", deg: "22° 30'" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-white/60 rounded-lg transition-colors cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-xs">
                      {item.planet.substring(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.planet}</p>
                      <p className="text-xs text-muted-foreground">{item.sign}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{item.house}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{item.deg}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={cn("w-5 h-5", className)}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

// Utility for this file
import { cn } from "@/lib/utils";
