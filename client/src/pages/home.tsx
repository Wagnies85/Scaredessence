import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Moon, Fingerprint, Calendar, Sparkles, Lock, Gift, Zap } from "lucide-react";
import generatedImage from "@assets/generated_images/ethereal_pastel_gradient_background_background_with_spiritual_vibes.png";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

function getZodiacSign(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
  return "Capricorn";
}

export default function Home() {
  const { data: profile } = useQuery<any>({
    queryKey: ["/api/profile"],
  });

  const birthDate = profile?.birthDate ? new Date(profile.birthDate) : null;
  const today = new Date();
  const isBirthday = birthDate && 
    birthDate.getDate() === today.getDate() && 
    birthDate.getMonth() === today.getMonth();
  
  const zodiacSign = birthDate ? getZodiacSign(birthDate) : "Mystic";

  return (
    <Layout>
      {/* Birthday Horoscope Section */}
      {isBirthday && (
        <section className="mb-12 animate-in zoom-in duration-700">
          <Card className="bg-gradient-to-br from-primary/20 via-primary/5 to-background border-primary/30 shadow-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-3 bg-primary/20 rounded-full">
                <Gift className="h-8 w-8 text-primary animate-bounce" />
              </div>
              <div>
                <CardTitle className="font-serif text-3xl">Happy Solar Return!</CardTitle>
                <CardDescription className="text-lg text-primary font-medium">Special Birthday Horoscope for {zodiacSign}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-xl leading-relaxed text-foreground font-light italic bg-white/40 p-6 rounded-2xl border border-white/60 backdrop-blur-sm">
                "Today, as the Sun returns to the exact degree it held at your birth, a portal of profound transformation opens. For you, {zodiacSign}, this year marks a cycle of unprecedented spiritual expansion. Your intuition is at an all-time high—trust the whispers of your soul. A major breakthrough in your personal expression is manifesting. Shine your light without hesitation; the universe is conspiring in your favor."
              </p>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-primary/5 group">
        <div className="absolute inset-0 z-0">
          <img 
            src={generatedImage} 
            alt="Ethereal Background" 
            className="w-full h-full object-cover opacity-60 transition-transform duration-[20s] ease-in-out group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/60 to-accent/20 backdrop-blur-[1px]" />
        </div>
        
        <div className="relative z-10 p-8 md:p-16 lg:p-20 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Premium: Sync to Google & iPhone Calendar
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-[1.1]">
            Unlock Your <span className="italic text-primary">Soul Blueprint</span> Today
          </h1>
          <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed max-w-lg">
            Unveil your cosmic architecture. Sync your daily horoscopes directly to your calendar and master your Rahu & Ketu karmic nodes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/subscription">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base shadow-lg shadow-primary/20 transition-all hover:scale-105">
                Go Premium
              </Button>
            </Link>
            <Link href="/astrology">
              <Button size="lg" variant="outline" className="rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border-white/10 px-8 h-12 text-base text-foreground">
                Explore Rahu & Ketu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Insights */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-3xl text-foreground">Daily Insights</h2>
          <span className="text-sm text-muted-foreground font-medium bg-secondary/30 px-3 py-1 rounded-full">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card/50 backdrop-blur-xl border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Moon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-serif">Planetary Transit</CardTitle>
                <CardDescription className="text-muted-foreground/80">
                  {(profile as any)?.astrologyChart?.currentTransit || "Moon in Taurus"}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 text-sm leading-relaxed mb-4">
                {(profile as any)?.astrologyChart?.insight || "Today brings a sense of grounding and stability. It's a perfect time to focus on material comfort and sensory pleasures."}
              </p>
              <Button variant="outline" size="sm" className="w-full rounded-full border-primary/20 hover:bg-primary/10 group">
                <Calendar className="mr-2 h-4 w-4 text-primary" />
                <span className="group-hover:hidden">Add to Calendar</span>
                <span className="hidden group-hover:inline flex items-center gap-1">
                  <Lock className="h-3 w-3" /> Mystic Feature
                </span>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-serif">Numerology</CardTitle>
                <CardDescription className="text-muted-foreground/80">
                  {(profile as any)?.numerologyNumbers?.currentYear || "Personal Year 5"}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 text-sm leading-relaxed">
                {(profile as any)?.numerologyNumbers?.insight || "Change is in the air. Embrace the unexpected and be open to new opportunities that cross your path today."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 rounded-xl bg-accent/10 text-accent">
                <Fingerprint className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-serif">Human Design</CardTitle>
                <CardDescription className="text-muted-foreground/80">
                  {(profile as any)?.humanDesignBodygraph?.strategy || "Generator Strategy"}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 text-sm leading-relaxed">
                {(profile as any)?.humanDesignBodygraph?.insight || "Wait to respond. Your gut instinct is your compass today—don't initiate without a sign from your environment."}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pathways */}
      <section>
        <h2 className="font-serif text-3xl text-foreground mb-8">Your Pathways</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <Link href="/astrology">
            <a className="group block relative overflow-hidden rounded-3xl bg-card border border-primary/20 p-8 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity transform group-hover:scale-110 duration-500 text-primary">
                <Moon className="h-32 w-32" />
              </div>
              <h3 className="font-serif text-2xl mb-2 text-foreground group-hover:text-primary transition-colors">Vedic Astrology</h3>
              <p className="text-foreground/80 mb-6 max-w-[200px]">Understand your karma through the ancient wisdom of the stars.</p>
              <div className="flex items-center text-sm font-medium text-primary">
                View Chart <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </Link>

          <Link href="/numerology">
            <a className="group block relative overflow-hidden rounded-3xl bg-card border border-secondary/20 p-8 shadow-sm hover:shadow-xl hover:border-secondary/50 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity transform group-hover:scale-110 duration-500 text-secondary">
                <Star className="h-32 w-32" />
              </div>
              <h3 className="font-serif text-2xl mb-2 text-foreground group-hover:text-secondary transition-colors">Numerology</h3>
              <p className="text-foreground/80 mb-6 max-w-[200px]">Decode the hidden patterns and vibrations of your life path.</p>
              <div className="flex items-center text-sm font-medium text-secondary">
                Analyze Numbers <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </Link>

          <Link href="/human-design">
            <a className="group block relative overflow-hidden rounded-3xl bg-card border border-accent/20 p-8 shadow-sm hover:shadow-xl hover:border-accent/50 transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity transform group-hover:scale-110 duration-500 text-accent">
                <Fingerprint className="h-32 w-32" />
              </div>
              <h3 className="font-serif text-2xl mb-2 text-foreground group-hover:text-accent transition-colors">Human Design</h3>
              <p className="text-foreground/80 mb-6 max-w-[200px]">Discover your unique energy blueprint and decision strategy.</p>
              <div className="flex items-center text-sm font-medium text-accent">
                See Bodygraph <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </Link>

        </div>
      </section>
    </Layout>
  );
}
