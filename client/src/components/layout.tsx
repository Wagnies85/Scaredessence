import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Sparkles, Moon, Sun, Fingerprint, Star, Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Dashboard", icon: Sparkles },
    { href: "/astrology", label: "Vedic Astrology", icon: Moon },
    { href: "/numerology", label: "Numerology", icon: Star },
    { href: "/human-design", label: "Human Design", icon: Fingerprint },
  ];

  const NavContent = () => (
    <nav className="space-y-2 p-4">
      {navItems.map((item) => {
        const isActive = location === item.href;
        return (
          <Link key={item.href} href={item.href}>
            <a
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium",
                isActive
                  ? "bg-primary/10 text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
              {item.label}
            </a>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans selection:bg-primary/20">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r bg-white/50 backdrop-blur-xl h-screen sticky top-0 z-40">
        <div className="p-8 pb-4">
          <h1 className="font-serif text-3xl text-primary font-medium tracking-tight">Sacred Essence</h1>
          <p className="text-xs text-muted-foreground mt-1 tracking-wider uppercase opacity-70">Spiritual Guidance</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <NavContent />
        </div>
        <div className="p-6 border-t border-border/40">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-4 text-center">
            <Sun className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Daily Wisdom</p>
            <p className="text-xs text-muted-foreground mt-1">"The universe whispers to those who listen."</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="font-serif text-xl text-primary">Sacred Essence</h1>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-white/95 backdrop-blur-xl w-72">
            <div className="p-8 pb-4">
              <h1 className="font-serif text-2xl text-primary">Sacred Essence</h1>
            </div>
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-x-hidden">
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10 animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
