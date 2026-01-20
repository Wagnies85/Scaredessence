import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Hexagon, User, Zap } from "lucide-react";

export default function HumanDesign() {
  return (
    <Layout>
      <div className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Human Design</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          The Science of Differentiation. Uncover your energetic blueprint.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* BodyGraph Visualization (Mockup) */}
        <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] bg-white/30 backdrop-blur-xl rounded-3xl border border-white/50 p-6 shadow-xl flex items-center justify-center">
                {/* Abstract Bodygraph representation using CSS/SVG */}
                <div className="relative w-full h-full opacity-80">
                    {/* Centers */}
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-12 h-12 rotate-45 bg-yellow-200 border-2 border-yellow-400 z-10" title="Head Center" />
                    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-12 h-12 rotate-45 bg-white border-2 border-gray-400 z-10" title="Ajna Center" />
                    <div className="absolute top-[32%] left-1/2 -translate-x-1/2 w-10 h-10 bg-amber-200 border-2 border-amber-400 z-10" title="Throat Center" />
                    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-10 h-10 rotate-45 bg-yellow-200 border-2 border-yellow-400 z-10" title="G Center" />
                    <div className="absolute top-[58%] left-[70%] w-8 h-8 rotate-45 bg-red-200 border-2 border-red-400 z-10" title="Heart Center" />
                    <div className="absolute top-[60%] left-[30%] w-10 h-10 rotate-45 bg-white border-2 border-gray-400 z-10" title="Spleen Center" />
                    <div className="absolute top-[60%] right-[30%] w-10 h-10 rotate-45 bg-amber-700/30 border-2 border-amber-800 z-10" title="Solar Plexus Center" />
                    <div className="absolute top-[75%] left-1/2 -translate-x-1/2 w-12 h-12 bg-red-400 border-2 border-red-600 z-10" title="Sacral Center" />
                    <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-200 border-2 border-amber-400 z-10" title="Root Center" />

                    {/* Connecting Channels (simplified lines) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-gray-400 stroke-2">
                        <line x1="50%" y1="14%" x2="50%" y2="18%" />
                        <line x1="50%" y1="24%" x2="50%" y2="32%" />
                        <line x1="50%" y1="36%" x2="50%" y2="44%" />
                    </svg>
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-muted-foreground">
                    Interactive BodyGraph
                </div>
            </div>
        </div>

        {/* Info Cards */}
        <div className="lg:col-span-7 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-blue-600 uppercase tracking-wider">Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h3 className="text-2xl font-serif text-foreground">Generator</h3>
                        <p className="text-sm text-muted-foreground mt-2">To Respond</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-purple-600 uppercase tracking-wider">Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h3 className="text-2xl font-serif text-foreground">4 / 6</h3>
                        <p className="text-sm text-muted-foreground mt-2">Opportunist Role Model</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white/60 backdrop-blur-xl border-white/60">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <Zap className="h-5 w-5" />
                        </div>
                        <CardTitle className="font-serif text-xl">Strategy & Authority</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-medium text-foreground mb-1">Strategy: Wait to Respond</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Your aura is magnetic and enveloping. Life comes to you. Your power lies in your Sacral response—the gut feeling of "uh-huh" (yes) or "un-uh" (no). Do not initiate; wait for life to present something to you, then trust your gut response.
                        </p>
                    </div>
                    <div className="h-px bg-border/50" />
                    <div>
                        <h4 className="font-medium text-foreground mb-1">Authority: Sacral</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Trust your immediate gut instinct in the moment. There is no truth in the now for you other than what your body tells you.
                        </p>
                    </div>
                </CardContent>
            </Card>

             <Card className="bg-white/60 backdrop-blur-xl border-white/60">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary/20 rounded-lg text-secondary-foreground">
                            <Hexagon className="h-5 w-5" />
                        </div>
                        <CardTitle className="font-serif text-xl">Incarnation Cross</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <h4 className="font-medium text-foreground mb-1">Right Angle Cross of The Vessel of Love</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        You are here to show the world that love is the essence of being. Your life journey is about embodying love in its various forms—love of the body, love of humanity, love of the spirit, and love of the self.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </Layout>
  );
}
