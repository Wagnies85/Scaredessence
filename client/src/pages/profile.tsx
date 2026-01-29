import { useLocation } from "wouter";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Calendar, Clock, MapPin, Loader2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function Profile() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { data: profile, isLoading } = useQuery<any>({
    queryKey: ["/api/profile"],
  });

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    birthLocation: "",
  });

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cities, setCities] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        birthDate: profile.birthDate ? new Date(profile.birthDate).toISOString().split('T')[0] : "",
        birthTime: profile.birthTime || "",
        birthLocation: profile.birthLocation || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    const fetchCities = async () => {
      if (searchValue.length < 2) {
        setCities([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchValue)}&limit=5&addressdetails=1`
        );
        const data = await response.json();
        console.log("Autocomplete results:", data);
        const formattedCities = data.map((item: any) => ({
          label: item.display_name,
          value: item.display_name,
        })) || [];
        setCities(formattedCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(fetchCities, 500);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const mutation = useMutation({
    mutationFn: async (newData: typeof formData) => {
      console.log("Saving profile with data:", newData);
      
      if (!newData.birthDate) {
        throw new Error("Birth date is required");
      }

      // Ensure birthDate is strictly YYYY-MM-DD for the new Date constructor
      const dateParts = newData.birthDate.split('-');
      if (dateParts.length !== 3) {
        throw new Error("Invalid birth date format. Please use YYYY-MM-DD");
      }

      const isoDate = new Date(Date.UTC(
        parseInt(dateParts[0]), 
        parseInt(dateParts[1]) - 1, 
        parseInt(dateParts[2]), 
        12, 0, 0
      )).toISOString();

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newData,
          userId: "default-user",
          birthDate: isoDate,
        }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        console.error("Profile save error response:", data);
        throw new Error(data.error?.message || data.error || "Failed to update profile");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({
        title: "Profile Updated",
        description: "Your cosmic details have been saved successfully.",
      });
      setLocation("/astrology");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an error saving your details. Please try again.",
      });
    },
  });

  const handleSave = () => {
    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl mb-8 text-primary drop-shadow-[0_2px_10px_rgba(168,85,247,0.4)]">Your Cosmic Profile</h1>
        <Card className="bg-card/40 backdrop-blur-xl border-primary/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <User className="h-5 w-5" /> Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label className="text-primary/80">Full Name</Label>
                <Input 
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-background/50 border-primary/20 focus:border-primary text-foreground"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-primary/80"><Calendar className="h-4 w-4" /> Date of Birth</Label>
                  <Input 
                    type="date" 
                    className="bg-background/50 border-primary/20 focus:border-primary text-foreground [color-scheme:dark]"
                    value={formData.birthDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-primary/80"><Clock className="h-4 w-4" /> Time of Birth</Label>
                  <Input 
                    type="time" 
                    className="bg-background/50 border-primary/20 focus:border-primary text-foreground [color-scheme:dark]"
                    value={formData.birthTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, birthTime: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-primary/80"><MapPin className="h-4 w-4" /> Place of Birth</Label>
                <div className="relative">
                  <Input
                    placeholder="Type city name (e.g. London, UK)..."
                    className="bg-background/50 border-primary/20 focus:border-primary text-foreground"
                    value={formData.birthLocation}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData(prev => ({ ...prev, birthLocation: val }));
                      setSearchValue(val);
                      if (val.length >= 2) setOpen(true);
                      else setOpen(false);
                    }}
                    onFocus={() => {
                      if (formData.birthLocation.length >= 2) setOpen(true);
                    }}
                  />
                  {open && (searchValue.length >= 2) && (
                    <Card className="absolute left-0 right-0 z-[100] mt-1 max-h-[250px] overflow-y-auto shadow-2xl border-primary/30 bg-card/95 backdrop-blur-md ring-1 ring-black/5">
                      <div className="p-1">
                        {isSearching ? (
                          <div className="p-4 text-sm text-center flex items-center justify-center gap-2 text-primary">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Searching...
                          </div>
                        ) : cities.length === 0 ? (
                          <div className="p-4 text-sm text-center text-muted-foreground">No city found.</div>
                        ) : (
                          cities.map((city, index) => (
                            <button
                              key={`${city.value}-${index}`}
                              type="button"
                              className="w-full text-left px-4 py-3 text-sm hover:bg-primary/20 text-foreground rounded-md transition-colors border-b border-primary/10 last:border-0"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                setFormData(prev => ({ ...prev, birthLocation: city.label }));
                                setSearchValue(city.label);
                                setOpen(false);
                              }}
                            >
                              {city.label}
                            </button>
                          ))
                        )}
                      </div>
                    </Card>
                  )}
                </div>
                {open && (
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setOpen(false)}
                  />
                )}
              </div>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90 rounded-full h-12"
              onClick={handleSave}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Update Birth Details"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
