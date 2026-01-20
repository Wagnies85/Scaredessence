import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown } from "lucide-react";

export default function Subscription() {
  const plans = [
    {
      name: "Seeker",
      price: "Free",
      features: ["Basic Natal Chart", "Daily General Insight", "Basic Compatibility", "Life Path Number"],
      icon: Zap,
      button: "Current Plan",
      variant: "outline" as const
    },
    {
      name: "Mystic",
      price: "$14.99",
      period: "/month",
      features: ["Advanced Vimshottari Dashas", "Deep Synastry Reports", "Unlimited Human Design Analysis", "Ad-free Experience", "Personalized Rituals"],
      icon: Crown,
      button: "Start Free Trial",
      variant: "default" as const,
      highlight: true
    }
  ];

  return (
    <Layout>
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-serif text-5xl mb-4">Elevate Your Journey</h1>
        <p className="text-lg text-muted-foreground">Unlock the full wisdom of the stars with our premium cosmic insights.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={cn(
            "relative bg-white/60 backdrop-blur-xl transition-all hover:scale-[1.02]",
            plan.highlight ? "border-primary shadow-2xl shadow-primary/10" : "border-white/60"
          )}>
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <CardHeader className="text-center pb-8">
              <div className={cn("w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-4", plan.highlight ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>
                <plan.icon className="h-6 w-6" />
              </div>
              <CardTitle className="font-serif text-2xl">{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full rounded-full h-12 text-base" variant={plan.variant}>
                {plan.button}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

import { cn } from "@/lib/utils";
