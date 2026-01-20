import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-violet-50 via-white to-blue-50">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-4xl text-primary mb-2">Sacred Essence</h1>
        <p className="text-muted-foreground">Your spiritual journey begins here</p>
      </div>

      <Card className="w-full max-w-md bg-white/70 backdrop-blur-xl border-white/60 shadow-2xl">
        <CardContent className="pt-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 p-1 rounded-xl">
              <TabsTrigger value="login" className="rounded-lg">Login</TabsTrigger>
              <TabsTrigger value="register" className="rounded-lg">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" />
              </div>
              <Button className="w-full h-12 rounded-full bg-primary mt-4">
                Enter Sanctuary
              </Button>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" />
              </div>
              <div className="pt-2 text-center">
                <p className="text-xs text-muted-foreground mb-4 italic">Next step: Add your birth details to unlock your chart.</p>
              </div>
              <Button className="w-full h-12 rounded-full bg-primary">
                Create Account
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
