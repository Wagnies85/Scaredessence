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
          `https://secure.geonames.org/searchJSON?q=${searchValue}&maxRows=5&username=demo&style=short`
        );
        const data = await response.json();
        const formattedCities = data.geonames?.map((city: any) => ({
          label: `${city.name}${city.adminName1 ? `, ${city.adminName1}` : ""}, ${city.countryName}`,
          value: `${city.name}${city.adminName1 ? `, ${city.adminName1}` : ""}, ${city.countryName}`,
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
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newData,
          userId: "default-user",
          birthDate: newData.birthDate ? new Date(newData.birthDate).toISOString() : null,
        }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      return res.json();
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
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-start font-normal text-muted-foreground"
                    >
                      {formData.birthLocation || "Select city..."}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                    <Command shouldFilter={false}>
                      <CommandInput 
                        placeholder="Type city name (min 3 chars)..." 
                        onValueChange={setSearchValue}
                      />
                      <CommandList>
                        {isSearching ? (
                          <div className="p-4 text-sm text-center">Searching...</div>
                        ) : cities.length === 0 ? (
                          <CommandEmpty>No city found.</CommandEmpty>
                        ) : (
                          <CommandGroup>
                            {cities.map((city) => (
                              <CommandItem
                                key={city.value}
                                value={city.value}
                                onSelect={() => {
                                  setFormData(prev => ({ ...prev, birthLocation: city.label }));
                                  setOpen(false);
                                }}
                              >
                                {city.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
