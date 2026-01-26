import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Lock, Star } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export default function Compatibility() {
  const { data: profile } = useQuery<any>({
    queryKey: ["/api/profile"],
  });

  const isPremium = profile?.isPremium ?? false;

  return (
    <Layout>
      <h1 className="font-serif text-4xl mb-4">Soul Compatibility</h1>
      <p className="text-muted-foreground mb-10 max-w-xl">Compare your energetic blueprints with others to understand your cosmic resonance.</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Content */}
        <Card className="bg-white/60 backdrop-blur-xl border-white/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" /> Basic Resonance (Free)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Sun Sign Match</span>
                <Badge variant="secondary">85%</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Your Leo energy radiates beautifully with their Aries fire. This creates a natural bond of mutual inspiration.</p>
            </div>
            
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Life Path Harmony</span>
                <Badge variant="secondary">70%</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Paths 7 and 3 create a fascinating dynamic of depth and expression.</p>
            </div>
          </CardContent>
        </Card>

        {/* Paid Content Mockup */}
        <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-violet-50 to-white">
          {!isPremium && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[4px] z-10 flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-white p-4 rounded-full shadow-xl mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif mb-2">Deep Cosmic Synastry</h3>
              <p className="text-sm text-muted-foreground mb-6">Unlock detailed Rahu/Ketu karmic knots, Human Design channel connections, and intimate dasha overlaps.</p>
              <Link href="/subscription">
                <Button className="rounded-full bg-primary px-8">Unlock Premium</Button>
              </Link>
            </div>
          )}
          <CardHeader>
            <CardTitle>Detailed Comparison</CardTitle>
          </CardHeader>
          <CardContent className={cn("transition-all", !isPremium && "opacity-20 blur-sm pointer-events-none")}>
            <div className="space-y-4">
              <div className="p-4 bg-white/60 rounded-xl border border-primary/10">
                <h4 className="font-bold text-sm mb-2">Karmic Knots</h4>
                <p className="text-xs text-muted-foreground">Your Rahu conjunct their North Node indicates a fated connection for growth.</p>
              </div>
              <div className="p-4 bg-white/60 rounded-xl border border-primary/10">
                <h4 className="font-bold text-sm mb-2">Human Design Synthesis</h4>
                <p className="text-xs text-muted-foreground">Channel 10-57 is defined between you, creating a shared sense of intuition.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
