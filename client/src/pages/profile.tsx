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
  const { data: profile, isLoading } = useQuery<any>({
    queryKey: ["/api/profile"],
  });

  const [formData, setFormData] = useState({
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
        birthDate: profile.birthDate ? new Date(profile.birthDate).toISOString().split('T')[0] : "",
        birthTime: profile.birthTime || "",
        birthLocation: profile.birthLocation || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    const fetchCities = async () => {
      if (searchValue.length < 3) {
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
                <Input placeholder="John Doe" disabled value="Default User" />
                <p className="text-xs text-muted-foreground">Name is linked to your account.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Date of Birth</Label>
                  <Input 
                    type="date" 
                    value={formData.birthDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Clock className="h-4 w-4" /> Time of Birth</Label>
                  <Input 
                    type="time" 
                    value={formData.birthTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, birthTime: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Place of Birth</Label>
                <div className="relative">
                  <Input
                    placeholder="Type city name (e.g. London, UK)..."
                    value={formData.birthLocation}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, birthLocation: e.target.value }));
                      setSearchValue(e.target.value);
                      if (e.target.value.length >= 3) setOpen(true);
                    }}
                    onFocus={() => {
                      if (formData.birthLocation.length >= 3) setOpen(true);
                    }}
                  />
                  {open && (searchValue.length >= 3) && (
                    <Card className="absolute left-0 right-0 z-[100] mt-1 max-h-[250px] overflow-y-auto shadow-2xl border-primary/30 bg-white ring-1 ring-black/5">
                      <div className="p-1">
                        {isSearching ? (
                          <div className="p-4 text-sm text-center flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            Searching...
                          </div>
                        ) : cities.length === 0 ? (
                          <div className="p-4 text-sm text-center text-muted-foreground">No city found.</div>
                        ) : (
                          cities.map((city) => (
                            <button
                              key={city.value}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-primary/10 rounded-md transition-colors"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, birthLocation: city.label }));
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
