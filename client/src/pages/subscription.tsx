import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

export default function Subscription() {
  const plans = [
    {
      name: "Seeker",
      price: "Free",
      features: [
        "Basic Natal Chart",
        "Daily General Insight",
        "Sun Sign Compatibility",
        "Life Path Number",
        "Basic Human Design Type"
      ],
      icon: Zap,
      button: "Current Plan",
      variant: "outline" as const,
      description: "Basic spiritual insights"
    },
    {
      name: "Mystic",
      price: "$14.99",
      period: "/month",
      features: [
        "Advanced Vimshottari Dashas",
        "Daily Horoscope sync to Calendar",
        "Karmic Synastry (Deep Compatibility)",
        "Full Human Design Bodygraph",
        "Personalized Daily Transit Reports",
        "Interactive Chart Explorers",
        "Private Spiritual Community"
      ],
      icon: Crown,
      button: "Start Free Trial",
      variant: "default" as const,
      highlight: true,
      description: "Full cosmic integration"
    }
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-serif text-5xl mb-4">Elevate Your Journey</h1>
          <p className="text-lg text-muted-foreground">Unlock the full wisdom of the stars with our premium cosmic insights.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn(
              "relative bg-card/60 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]",
              plan.highlight ? "border-primary shadow-2xl shadow-primary/10" : "border-border"
            )}>
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-xl text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-8 p-8">
                <div className={cn("w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-4", plan.highlight ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                  <plan.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-serif text-2xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground text-sm font-normal">{plan.period}</span>}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-8">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-8">
                <Link href="/checkout" className="w-full">
                  <Button className="w-full rounded-full h-12 text-base font-semibold" variant={plan.variant}>
                    {plan.button}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}