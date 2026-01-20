import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, Search, Wind, Flame, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HumanDesign() {
  const types = [
    { 
      name: "Generator", 
      icon: Zap, 
      desc: "The Great Builders. 70% of the population. You have a defined Sacral center—an infinite motor for work you love. Your strategy is to Respond, not Initiate.",
      active: true,
      color: "bg-red-50 text-red-700"
    },
    { 
      name: "Projector", 
      icon: Search, 
      desc: "The Natural Guides. 20% of the population. You are here to master systems and guide others. Your strategy is to Wait for the Invitation.",
      color: "bg-amber-50 text-amber-700"
    },
    { 
      name: "Manifestor", 
      icon: Flame, 
      desc: "The Initiators. 9% of the population. You have a direct path from a motor to the throat. Your strategy is to Inform others before you act.",
      color: "bg-teal-50 text-teal-700"
    },
    { 
      name: "Reflector", 
      icon: Wind, 
      desc: "The Mirrors. 1% of the population. You are totally open to the lunar cycle. Your strategy is to wait 28 days before making big decisions.",
      color: "bg-blue-50 text-blue-700"
    }
  ];

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Your Energetic Type</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Human Design is the synthesis of the I Ching, Chakras, Kabbalah, and Quantum Physics. 
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
           <Card className="bg-white/60 backdrop-blur-xl border-white/60 overflow-hidden">
              <div className="h-2 bg-primary" />
              <CardHeader>
                 <CardTitle className="font-serif text-2xl">The 4 Core Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 {types.map((type) => (
                    <div key={type.name} className={cn(
                       "p-4 rounded-xl transition-all border",
                       type.active ? "bg-primary/5 border-primary/20 shadow-sm" : "bg-muted/30 border-transparent grayscale opacity-70"
                    )}>
                       <div className="flex items-center gap-3 mb-2">
                          <type.icon className="h-5 w-5" />
                          <h4 className="font-serif text-lg">{type.name}</h4>
                          {type.active && <Badge className="ml-auto bg-primary text-white">You</Badge>}
                       </div>
                       <p className="text-xs text-muted-foreground leading-relaxed">{type.desc}</p>
                    </div>
                 ))}
              </CardContent>
           </Card>
        </div>

        <div className="lg:col-span-8 space-y-8">
           <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
              <CardHeader>
                 <CardTitle className="font-serif text-2xl">Detailed Generator Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <div className="flex items-start gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm"><Shield className="h-5 w-5 text-primary" /></div>
                          <div>
                             <h4 className="font-medium text-foreground">Energetic Signature: Satisfaction</h4>
                             <p className="text-xs text-muted-foreground mt-1">When you use your energy on things you love, you feel a deep glow of satisfaction.</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm"><Info className="h-5 w-5 text-primary" /></div>
                          <div>
                             <h4 className="font-medium text-foreground">Not-Self Theme: Frustration</h4>
                             <p className="text-xs text-muted-foreground mt-1">If you push yourself to initiate or do work that bores you, you encounter heavy resistance and anger.</p>
                          </div>
                       </div>
                    </div>
                    <div className="bg-white/50 p-6 rounded-2xl border border-white/80">
                       <h4 className="font-serif text-lg mb-3">Your Decision Strategy</h4>
                       <p className="text-sm text-muted-foreground leading-relaxed italic">
                          "Wait to Respond."
                       </p>
                       <p className="text-sm text-muted-foreground mt-3">
                          Don't go looking for things to do. Your aura is like a magnet. Wait for a question or a sign from the universe, then listen to your gut (Sacral) sound: "Uh-huh" (Yes) or "Un-uh" (No).
                       </p>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-white/60">
                 <CardContent className="p-4 pt-6 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Aura</p>
                    <p className="text-sm font-serif">Open & Enveloping</p>
                 </CardContent>
              </Card>
              <Card className="bg-white/60">
                 <CardContent className="p-4 pt-6 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Definition</p>
                    <p className="text-sm font-serif">Single Definition</p>
                 </CardContent>
              </Card>
              <Card className="bg-white/60">
                 <CardContent className="p-4 pt-6 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Profile</p>
                    <p className="text-sm font-serif">4 / 6</p>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </Layout>
  );
}

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
