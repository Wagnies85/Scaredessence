import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Calendar, Clock, MapPin } from "lucide-react";

export default function Profile() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl mb-8">Your Cosmic Profile</h1>
        <Card className="bg-white/60 backdrop-blur-xl border-white/60 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" defaultValue="Alex Rivera" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Date of Birth</Label>
                  <Input type="date" defaultValue="1992-08-15" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Clock className="h-4 w-4" /> Time of Birth</Label>
                  <Input type="time" defaultValue="14:30" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Place of Birth</Label>
                <Input placeholder="City, Country" defaultValue="San Francisco, CA" />
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 rounded-full h-12">
              Update Birth Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
