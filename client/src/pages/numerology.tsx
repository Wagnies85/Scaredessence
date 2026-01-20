import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star, Hash } from "lucide-react";

export default function Numerology() {
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
            <Card className="bg-gradient-to-b from-primary/5 to-white border-primary/20 overflow-hidden relative">
                <div className="absolute -right-6 -top-6 text-primary/5">
                    <Hash className="w-48 h-48" />
                </div>
                <CardHeader>
                    <CardTitle className="font-serif text-2xl">Life Path Number</CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-10">
                    <span className="font-serif text-8xl text-primary font-bold drop-shadow-sm">7</span>
                    <p className="mt-4 font-medium text-lg uppercase tracking-widest text-muted-foreground">The Seeker</p>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed text-left">
                        A path of spiritual seeking, analysis, and solitude. You are here to uncover the deeper truths of existence.
                    </p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/60 backdrop-blur-md">
                    <CardContent className="p-4 text-center">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Expression</p>
                        <p className="text-3xl font-serif text-foreground">5</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/60 backdrop-blur-md">
                    <CardContent className="p-4 text-center">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Soul Urge</p>
                        <p className="text-3xl font-serif text-foreground">9</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/60 backdrop-blur-md">
                    <CardContent className="p-4 text-center">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Personality</p>
                        <p className="text-3xl font-serif text-foreground">11</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/60 backdrop-blur-md">
                    <CardContent className="p-4 text-center">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Birthday</p>
                        <p className="text-3xl font-serif text-foreground">3</p>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white/50 backdrop-blur-xl border-white/60">
                <CardHeader>
                    <CardTitle className="font-serif">Life Path 7 Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                        As a Life Path 7, you are the intellectual of the numerology chart. You are a thinker, an analyzer, and a seeker of truth. You don't accept things at face value; you need to understand the underlying mechanics of how the universe works. 
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Your journey often involves periods of solitude, which you need to recharge and process your deep thoughts. You are naturally intuitive, though you often filter your intuition through a logical lens.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                         <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                            <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
                            <ul className="text-sm text-green-700 list-disc list-inside space-y-1">
                                <li>Analytical</li>
                                <li>Intuitive</li>
                                <li>Deep thinker</li>
                                <li>Perceptive</li>
                            </ul>
                         </div>
                         <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                            <h4 className="font-medium text-red-800 mb-2">Challenges</h4>
                            <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                                <li>Overthinking</li>
                                <li>Isolation</li>
                                <li>Skepticism</li>
                                <li>Cynicism</li>
                            </ul>
                         </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-xl border-white/60">
                <CardHeader>
                    <CardTitle className="font-serif">Personal Year Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-start gap-4">
                        <div className="bg-accent/20 text-accent-foreground p-3 rounded-lg font-serif text-2xl font-bold min-w-[3rem] text-center">
                            5
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground mb-1">Year of Change and Freedom</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                This year is all about movement, change, and flexibility. If last year felt like hard work and building foundations, this year the energy loosens up. Expect the unexpected. Travel, new people, and new experiences are favored. It's a time to break out of ruts and embrace your freedom.
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
