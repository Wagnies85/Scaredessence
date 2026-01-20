import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Astrology from "@/pages/astrology";
import Numerology from "@/pages/numerology";
import HumanDesign from "@/pages/human-design";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/astrology" component={Astrology} />
      <Route path="/numerology" component={Numerology} />
      <Route path="/human-design" component={HumanDesign} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
