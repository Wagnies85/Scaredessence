import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Moon, Fingerprint, Calendar, Sparkles, Lock } from "lucide-react";
import generatedImage from "@assets/generated_images/ethereal_pastel_gradient_background_with_spiritual_vibes.png";
import { Link } from "wouter";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-primary/5 group">
        <div className="absolute inset-0 z-0">
          <img 
            src={generatedImage} 
            alt="Ethereal Background" 
            className="w-full h-full object-cover opacity-80 transition-transform duration-[20s] ease-in-out group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 p-8 md:p-16 lg:p-20 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/40 backdrop-blur-md border border-white/50 text-xs font-semibold uppercase tracking-widest text-primary-foreground mb-6">
            Premium: Sync to Google & iPhone Calendar
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-[1.1]">
            Unlock Your <span className="italic text-primary">Soul Blueprint</span> Today
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
            Unveil your cosmic architecture. Sync your daily horoscopes directly to your calendar and master your Rahu & Ketu karmic nodes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/subscription">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 h-12 text-base shadow-lg shadow-primary/20 transition-all hover:scale-105">
                Go Premium
              </Button>
            </Link>
            <Link href="/astrology">
              <Button size="lg" variant="outline" className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 px-8 h-12 text-base">
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
          <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 rounded-xl bg-violet-100 text-violet-600">
                <Moon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-serif">Planetary Transit</CardTitle>
                <CardDescription>Moon in Taurus</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Today brings a sense of grounding and stability. It's a perfect time to focus on material comfort and sensory pleasures.
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

          <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 rounded-xl bg-teal-100 text-teal-600">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-serif">Numerology</CardTitle>
                <CardDescription>Personal Year 5</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Change is in the air. Embrace the unexpected and be open to new opportunities that cross your path today.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                <Fingerprint className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-serif">Human Design</CardTitle>
                <CardDescription>Generator Strategy</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Wait to respond. Your gut instinct is your compass today—don't initiate without a clear sign from your environment.
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
            <a className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-50 to-white border border-white/60 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                <Moon className="h-32 w-32" />
              </div>
              <h3 className="font-serif text-2xl mb-2 text-foreground group-hover:text-primary transition-colors">Vedic Astrology</h3>
              <p className="text-muted-foreground mb-6 max-w-[200px]">Understand your karma through the ancient wisdom of the stars.</p>
              <div className="flex items-center text-sm font-medium text-primary">
                View Chart <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </Link>

          <Link href="/numerology">
            <a className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-50 to-white border border-white/60 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                <Star className="h-32 w-32" />
              </div>
              <h3 className="font-serif text-2xl mb-2 text-foreground group-hover:text-primary transition-colors">Numerology</h3>
              <p className="text-muted-foreground mb-6 max-w-[200px]">Decode the hidden patterns and vibrations of your life path.</p>
              <div className="flex items-center text-sm font-medium text-primary">
                Analyze Numbers <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </Link>

          <Link href="/human-design">
            <a className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 to-white border border-white/60 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                <Fingerprint className="h-32 w-32" />
              </div>
              <h3 className="font-serif text-2xl mb-2 text-foreground group-hover:text-primary transition-colors">Human Design</h3>
              <p className="text-muted-foreground mb-6 max-w-[200px]">Discover your unique energy blueprint and decision strategy.</p>
              <div className="flex items-center text-sm font-medium text-primary">
                See Bodygraph <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </Link>

        </div>
      </section>
    </Layout>
  );
}
