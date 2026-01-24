import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Sparkles, CreditCard, Apple, ShieldCheck, Lock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

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
                <Button className="w-full rounded-full h-12 text-base font-semibold" variant={plan.variant}>
                  {plan.button}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Payment Methods Section */}
        <div className="max-w-3xl mx-auto bg-card/30 border border-border rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-2xl font-serif mb-8 flex items-center justify-center gap-3">
            <ShieldCheck className="h-6 w-6 text-secondary" /> Secure Checkout
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 opacity-80">
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <CreditCard className="h-8 w-8 text-primary" />
              <span className="text-xs font-medium">Credit Card</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="h-8 w-16 bg-[#003087] rounded-md flex items-center justify-center font-bold italic text-white text-[10px]">PayPal</div>
              <span className="text-xs font-medium">PayPal</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Apple className="h-8 w-8 text-foreground" />
              <span className="text-xs font-medium">Apple Pay</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="h-8 w-16 bg-blue-500 rounded-md flex items-center justify-center font-bold text-white text-[10px]">DEBIT</div>
              <span className="text-xs font-medium">Debit Card</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            All payments are secured with 256-bit SSL encryption.
          </p>
          
          <div className="flex items-center justify-center gap-6 grayscale opacity-40">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-6" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-20 space-y-12">
          <div className="text-center">
            <h2 className="font-serif text-3xl mb-4">Why Go Mystic?</h2>
            <p className="text-muted-foreground">The deeper the data, the clearer the path.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card/40 border-border">
               <CardHeader>
                  <div className="p-2 w-10 h-10 bg-primary/10 rounded-lg text-primary mb-2">
                    <Star className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-serif">Deep Synastry</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Go beyond Sun signs. Analyze Venus-Mars connections, Rahu-Ketu karmic ties, and composite charts.
                  </p>
               </CardContent>
            </Card>

            <Card className="bg-card/40 border-border">
               <CardHeader>
                  <div className="p-2 w-10 h-10 bg-primary/10 rounded-lg text-primary mb-2">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-serif">Dasha Precision</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Unlock Bhukti, Antara, and Sukshma levels of the Vimshottari Dasha system.
                  </p>
               </CardContent>
            </Card>

            <Card className="bg-card/40 border-border">
               <CardHeader>
                  <div className="p-2 w-10 h-10 bg-primary/10 rounded-lg text-primary mb-2">
                    <Lock className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-serif">Master Analysis</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Access professional-grade interpretations for every placement in your Human Design and Vedic Chart.
                  </p>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
