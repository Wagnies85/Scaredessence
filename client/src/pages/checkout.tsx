import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ShieldCheck, Apple, CheckCircle2 } from "lucide-react";

export default function Checkout() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Complete Your Upgrade</h1>
          <p className="text-lg text-muted-foreground">Select your preferred payment method to unlock Mystic features.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card/60 backdrop-blur-xl border-primary shadow-xl">
            <CardHeader>
              <CardTitle className="font-serif text-2xl flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-primary" />
                Credit or Debit Card
              </CardTitle>
              <CardDescription>Secure payment via Stripe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="h-10 w-full bg-muted/50 rounded-md border border-border flex items-center px-3 text-sm text-muted-foreground">
                  Card Number
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-10 w-full bg-muted/50 rounded-md border border-border flex items-center px-3 text-sm text-muted-foreground">
                    MM / YY
                  </div>
                  <div className="h-10 w-full bg-muted/50 rounded-md border border-border flex items-center px-3 text-sm text-muted-foreground">
                    CVC
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full rounded-full h-12 text-base font-semibold">
                Pay $14.99 with Card
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <Card className="bg-card/60 backdrop-blur-xl border-border hover:border-primary transition-colors cursor-pointer group">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-20 bg-[#003087] rounded-lg flex items-center justify-center font-bold italic text-white text-xs">
                    PayPal
                  </div>
                  <div>
                    <h3 className="font-medium">PayPal</h3>
                    <p className="text-xs text-muted-foreground">Pay with your PayPal account</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="group-hover:text-primary">
                  <CheckCircle2 className="h-6 w-6 opacity-20 group-hover:opacity-100" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-xl border-border hover:border-primary transition-colors cursor-pointer group">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-20 bg-black rounded-lg flex items-center justify-center">
                    <Apple className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Apple Pay</h3>
                    <p className="text-xs text-muted-foreground">Quick checkout with Apple Pay</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="group-hover:text-primary">
                  <CheckCircle2 className="h-6 w-6 opacity-20 group-hover:opacity-100" />
                </Button>
              </CardContent>
            </Card>

            <div className="p-6 bg-secondary/10 rounded-3xl border border-secondary/20 flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-secondary shrink-0 mt-1" />
              <div>
                <h4 className="font-medium text-sm">Secure Checkout</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your payment information is processed securely. We do not store your credit card details on our servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}