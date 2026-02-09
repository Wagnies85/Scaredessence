import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, Sparkles, Zap, Sun, Lock, Download, Loader2, Star, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Astrology() {
  const { data: profile } = useQuery<any>({
    queryKey: ["/api/profile"],
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(2026);
  const [viewYear, setViewYear] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

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

  const vedicData = profile?.astrologyChart || {
    sunSign: "Calculating...",
    moonSign: "Calculating...",
    ascendant: "Calculating...",
    sunInsight: "Connecting with your core identity...",
    moonInsight: "Refining your emotional inner-world...",
    dailyHoroscope: "Your stars for today are aligning...",
    planetaryPlacements: []
  };

  const westernData = (profile?.astrologyChart as any)?.western || {
    sunSign: "Calculating...",
    moonSign: "Calculating...",
    ascendant: "Calculating...",
    sunDescription: "Analyzing your Western Sun placement...",
    moonDescription: "Analyzing your Western Moon placement...",
    ascendantDescription: "Analyzing your Western Ascendant...",
    overview: "Your Western chart is being calculated..."
  };

  const planetaryPlacements = vedicData.planetaryPlacements || [];

  const downloadMonthlyHoroscope = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch(`/api/horoscope/monthly?month=${selectedMonth}&year=${selectedYear}`);
      const data = await res.json();
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `spiritual-calendar-${data.month}-${data.year}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const planetIcons: Record<string, string> = {
    Sun: "☉", Moon: "☽", Mars: "♂", Mercury: "☿",
    Jupiter: "♃", Venus: "♀", Saturn: "♄", Rahu: "☊", Ketu: "☋"
  };

  const planetColors: Record<string, string> = {
    Sun: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
    Moon: "from-slate-300/20 to-blue-200/10 border-slate-400/30",
    Mars: "from-red-500/20 to-rose-500/10 border-red-500/30",
    Mercury: "from-emerald-500/20 to-green-500/10 border-emerald-500/30",
    Jupiter: "from-yellow-500/20 to-amber-400/10 border-yellow-500/30",
    Venus: "from-pink-500/20 to-fuchsia-400/10 border-pink-500/30",
    Saturn: "from-indigo-500/20 to-blue-500/10 border-indigo-500/30",
    Rahu: "from-violet-500/20 to-purple-500/10 border-violet-500/30",
    Ketu: "from-orange-500/20 to-red-400/10 border-orange-500/30"
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
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">12: PI</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">1: AR</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">2: TA</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">3: GE</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">11: AQ</div>
          <div className="col-span-2 row-span-2 flex flex-col items-center justify-center bg-primary/10 rounded-xl m-2 border border-primary/20 shadow-lg">
             <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold">Soul Center</p>
             <p className="font-serif text-2xl text-primary font-bold drop-shadow-md">{data.atmakaraka}</p>
             <p className="text-[10px] text-muted-foreground mt-1 font-medium">ASC: {data.lagnam}</p>
          </div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">4: CA</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">10: CP</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">5: LE</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">9: SG</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">8: SC</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">7: LI</div>
          <div className="border border-primary/30 p-2 flex flex-col items-center justify-center text-[10px] font-bold text-foreground/80">6: VI</div>
        </div>
        
        <div className="bg-primary/10 p-6 border-t border-primary/20 grid grid-cols-2 md:grid-cols-4 gap-6">
           <div className="text-center group" data-testid="chart-ascendant">
              <p className="text-xs uppercase text-primary/60 font-bold tracking-wider mb-1">Ascendant</p>
              <p className="text-base font-black text-foreground group-hover:text-primary transition-colors">{siderealData.lagnam || vedicData.ascendant}</p>
           </div>
           <div className="text-center group" data-testid="chart-sun">
              <p className="text-xs uppercase text-primary/60 font-bold tracking-wider mb-1">Sun (S)</p>
              <p className="text-base font-black text-foreground group-hover:text-primary transition-colors">{vedicData.sunSign}</p>
           </div>
           <div className="text-center group" data-testid="chart-moon">
              <p className="text-xs uppercase text-primary/60 font-bold tracking-wider mb-1">Moon (M)</p>
              <p className="text-base font-black text-foreground group-hover:text-primary transition-colors">{vedicData.moonSign}</p>
           </div>
           <div className="text-center group" data-testid="chart-soul-planet">
              <p className="text-xs uppercase text-primary/60 font-bold tracking-wider mb-1">Soul Planet</p>
              <p className="text-base font-black text-foreground group-hover:text-primary transition-colors">{siderealData.atmakaraka}</p>
           </div>
        </div>
      </CardContent>
    </Card>
  );

  const PlanetaryPlacementsGrid = () => {
    if (!planetaryPlacements || planetaryPlacements.length === 0) {
      return (
        <Card className="border-2 border-primary/30">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-primary">Planetary Placements</CardTitle>
            <CardDescription>Submit your birth details to see your planetary positions</CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return (
      <Card className="border-2 border-primary/40 shadow-xl overflow-hidden" data-testid="planetary-placements">
        <CardHeader className="bg-primary/10 border-b border-primary/20">
          <CardTitle className="font-serif text-2xl text-primary flex items-center gap-2">
            <Star className="h-5 w-5" /> Vedic Planetary Placements
          </CardTitle>
          <CardDescription className="text-foreground/80">Each planet's position and personal meaning in your Sidereal birth chart</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planetaryPlacements.map((p: any, idx: number) => (
              <div
                key={idx}
                className={cn(
                  "p-4 rounded-xl border-2 bg-gradient-to-br transition-all hover:shadow-lg hover:scale-[1.02]",
                  planetColors[p.planet] || "from-gray-500/20 to-gray-400/10 border-gray-500/30"
                )}
                data-testid={`planet-card-${p.planet?.toLowerCase()}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{planetIcons[p.planet] || "⚫"}</span>
                  <div>
                    <h4 className="font-bold text-lg text-foreground">{p.planet}</h4>
                    <p className="text-xs text-muted-foreground font-medium">
                      {p.sign} | House {p.house} | {p.degree}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">{p.interpretation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const WesternAstrologySection = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-950/80 to-indigo-950/80 border-2 border-blue-500/30 shadow-2xl text-white overflow-hidden" data-testid="western-astrology-section">
        <CardHeader className="border-b border-blue-500/20">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="font-serif text-2xl text-blue-200 flex items-center gap-2">
                <Globe className="h-5 w-5" /> Western (Tropical) Astrology
              </CardTitle>
              <CardDescription className="text-blue-300/80">Seasonal zodiac - your personality and psychological patterns</CardDescription>
            </div>
            <Badge className="bg-blue-500/30 text-blue-200 border-blue-400/30">Tropical</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <h3 className="font-serif text-lg text-blue-200 mb-2">About Tropical Astrology</h3>
            <p className="text-sm text-blue-100/80 leading-relaxed">
              Western (Tropical) astrology is based on the seasons and the Earth's relationship to the Sun. It reflects your personality, psychological patterns, and how you experience the world. While Vedic shows your karmic destiny, Tropical reveals your psychological self.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 bg-amber-500/10 rounded-xl border border-amber-500/20" data-testid="western-sun">
              <div className="flex items-center gap-2 mb-3">
                <Sun className="h-5 w-5 text-amber-400" />
                <h4 className="font-bold text-amber-200">Sun in {westernData.sunSign}</h4>
              </div>
              <p className="text-sm text-blue-100/90 leading-relaxed">{westernData.sunDescription}</p>
            </div>
            <div className="p-5 bg-slate-400/10 rounded-xl border border-slate-400/20" data-testid="western-moon">
              <div className="flex items-center gap-2 mb-3">
                <Moon className="h-5 w-5 text-slate-300" />
                <h4 className="font-bold text-slate-200">Moon in {westernData.moonSign}</h4>
              </div>
              <p className="text-sm text-blue-100/90 leading-relaxed">{westernData.moonDescription}</p>
            </div>
            <div className="p-5 bg-indigo-400/10 rounded-xl border border-indigo-400/20" data-testid="western-ascendant">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-indigo-300" />
                <h4 className="font-bold text-indigo-200">{westernData.ascendant} Rising</h4>
              </div>
              <p className="text-sm text-blue-100/90 leading-relaxed">{westernData.ascendantDescription}</p>
            </div>
          </div>

          <div className="p-5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
            <h4 className="font-bold text-purple-200 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Chart Overview
            </h4>
            <p className="text-sm text-blue-100/90 leading-relaxed">{westernData.overview}</p>
          </div>
        </CardContent>
      </Card>
    </div>
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
                {vedicData.nakshatras && (
                  <div className="p-4 bg-background/50 rounded-lg border border-primary/20 mt-4">
                    <h4 className="font-bold text-primary mb-3">Nakshatra Details (Vedic Star Constellations)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(vedicData.nakshatras).map(([planet, details]: [string, any], i: number) => (
                        <div key={i} className="text-xs p-3 bg-primary/5 rounded-xl border border-primary/10 shadow-sm" data-testid={`nakshatra-${planet}`}>
                          <span className="font-bold text-primary text-sm capitalize">{planet}</span>
                          <p className="font-medium mt-1">Nakshatra: {details.nakshatra}</p>
                          <p className="text-muted-foreground">Lord: {details.lord} | Pada: {details.pada}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {vedicData.ashtakvarga && (
                  <div className="p-4 bg-background/50 rounded-lg border border-secondary/20 mt-4">
                    <h4 className="font-bold text-secondary mb-3">Ashtakvarga (Planetary Strength)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      {Object.entries(vedicData.ashtakvarga).map(([sign, score]: [string, any], i: number) => (
                        <div key={i} className="text-[10px] p-2 bg-secondary/5 rounded-lg border border-secondary/10 flex flex-col items-center" data-testid={`ashtakvarga-${sign}`}>
                          <span className="font-bold text-secondary uppercase">{sign.slice(0, 3)}</span>
                          <span className="text-lg font-black">{score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
             </div>
          </CardContent>
       </Card>
    </div>
  );

  const AnnualCosmicCalendar = () => {
    const significantEvents = [
      { date: "March 20", event: "Spring Equinox - New Beginnings", type: "Equinox" },
      { date: "June 21", event: "Summer Solstice - Peak Solar Energy", type: "Solstice" },
      { date: "September 22", event: "Autumn Equinox - Balance & Harvest", type: "Equinox" },
      { date: "December 21", event: "Winter Solstice - Inward Reflection", type: "Solstice" },
      { date: "March 29", event: "Solar Eclipse in Aries", type: "Eclipse" },
      { date: "September 21", event: "Solar Eclipse in Virgo", type: "Eclipse" },
      { date: "Feb 24 - Mar 20", event: "Mercury Retrograde", type: "Retrograde" },
      { date: "Jun 29 - Jul 23", event: "Mercury Retrograde", type: "Retrograde" },
      { date: "Oct 24 - Nov 13", event: "Mercury Retrograde", type: "Retrograde" }
    ];

    const typeColors: Record<string, string> = {
      Equinox: "bg-green-500/20 text-green-300 border-green-500/30",
      Solstice: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      Eclipse: "bg-red-500/20 text-red-300 border-red-500/30",
      Retrograde: "bg-purple-500/20 text-purple-300 border-purple-500/30"
    };

    return (
      <Card className="border-2 border-primary/40 shadow-xl overflow-hidden mt-8" data-testid="annual-cosmic-calendar">
        <CardHeader className="bg-primary/5 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="font-serif text-2xl text-primary">2026 Cosmic Forecast</CardTitle>
            <CardDescription>Annual view of significant planetary shifts</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setViewYear(!viewYear)} data-testid="toggle-annual-view">
            {viewYear ? "Hide Annual View" : "Show Annual View"}
          </Button>
        </CardHeader>
        {viewYear && (
          <CardContent className="pt-6 space-y-6">
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
              <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Major Astrological Events 2026
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {significantEvents.map((event, idx) => (
                  <div key={idx} className="flex flex-col p-3 bg-background rounded-lg border border-primary/10" data-testid={`event-${idx}`}>
                    <span className="text-[10px] font-bold text-primary/60 uppercase">{event.date}</span>
                    <span className="text-xs font-medium mt-1">{event.event}</span>
                    <Badge className={cn("w-fit text-[8px] h-4 mt-2 border", typeColors[event.type])}>{event.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {months.map((month, idx) => (
                <div key={idx} className="p-3 bg-card rounded-lg border border-primary/10 hover:border-primary/30 transition-colors" data-testid={`month-card-${idx}`}>
                  <h4 className="font-bold text-primary border-b border-primary/10 pb-1 mb-2">{month} 2026</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Zap className="h-3 w-3 text-yellow-500 mt-1 flex-shrink-0" />
                      <p className="text-[10px] leading-tight text-muted-foreground italic">
                        Major focus: {idx % 3 === 0 ? "Spiritual expansion" : idx % 3 === 1 ? "Material foundation" : "Relationship harmony"}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-[10px] h-7 hover:bg-primary/10"
                      onClick={() => {
                        setSelectedMonth(idx);
                        setSelectedYear(2026);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      data-testid={`view-month-${idx}`}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <Layout>
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4" data-testid="text-page-title">Cosmic Charts</h1>
          {profile?.birthLocation && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl mb-6" data-testid="text-birth-info">
              <p className="text-sm text-primary font-medium">
                Calculations generated for: <span className="text-foreground">{profile.birthLocation}</span> on <span className="text-foreground">{new Date(profile.birthDate).toLocaleDateString()}</span> at <span className="text-foreground">{profile.birthTime}</span>
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="bg-card border border-primary/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            data-testid="select-month"
          >
            {months.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="bg-card border border-primary/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            data-testid="select-year"
          >
            <option value={2026}>2026</option>
          </select>
          <Button 
            onClick={downloadMonthlyHoroscope} 
            disabled={isDownloading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
            data-testid="button-download-calendar"
          >
            {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Download Calendar
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Tabs defaultValue="vedic" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-xl mb-6">
              <TabsTrigger value="vedic" className="rounded-lg" data-testid="tab-vedic">Vedic (Sidereal)</TabsTrigger>
              <TabsTrigger value="western" className="rounded-lg" data-testid="tab-western">Western (Tropical)</TabsTrigger>
              <TabsTrigger value="planets" className="rounded-lg" data-testid="tab-planets">Planet Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vedic" className="space-y-6">
              <SouthIndianChart title="Natal Birth Chart (D1)" data={siderealData} />
              <VedicInsights />

              <div className="space-y-4">
                <h2 className="font-serif text-2xl text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> Karmic Nodes: Rahu & Ketu
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-violet-950/80 to-purple-950/60 border-violet-500/20 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-serif text-violet-200">☊ Rahu (North Node)</CardTitle>
                      <Badge className="bg-violet-500/20 text-violet-200 border-violet-400/30 w-fit">Future Growth</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-violet-100/80">{siderealData.rahuInsight}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-amber-950/80 to-orange-950/60 border-amber-500/20 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-serif text-amber-200">☋ Ketu (South Node)</CardTitle>
                      <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30 w-fit">Past Mastery</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-amber-100/80">{siderealData.ketuInsight}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

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
                        </div>
                      </div>
                    </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="western" className="space-y-6">
              <WesternAstrologySection />
            </TabsContent>

            <TabsContent value="planets" className="space-y-6">
              <PlanetaryPlacementsGrid />
            </TabsContent>
          </Tabs>

          <AnnualCosmicCalendar />
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
              <p className="text-sm leading-relaxed italic" data-testid="text-daily-horoscope">
                {vedicData.dailyHoroscope || "Your personalized daily guidance is aligning with the stars."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-900/90 to-purple-900/90 text-white border-primary/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <Sparkles className="h-12 w-12 text-indigo-300 rotate-12" />
            </div>
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="font-serif text-xl flex items-center gap-2 text-indigo-100">
                <Zap className="h-5 w-5 text-yellow-400" /> Daily Affirmation
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-xl font-serif leading-relaxed italic text-indigo-50 drop-shadow-sm" data-testid="text-daily-affirmation">
                "{profile?.dailyAffirmation || "I am aligned with the wisdom of the cosmos and open to its guidance."}"
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/90 to-black text-white border-primary/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <Moon className="h-12 w-12 text-purple-300 -rotate-12" />
            </div>
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="font-serif text-xl flex items-center gap-2 text-purple-100">
                <Sparkles className="h-5 w-5 text-indigo-300" /> Cosmic Meditation
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-sm leading-relaxed text-purple-100/90 font-medium" data-testid="text-daily-meditation">
                {profile?.dailyMeditation || "Close your eyes, breathe into your heart space, and visualize a radiant indigo light connecting your crown to the stars above."}
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
                Use the Vedic (Sidereal) system for your life's destiny and timing, and the Western (Tropical) system for understanding your inner psychological patterns.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
