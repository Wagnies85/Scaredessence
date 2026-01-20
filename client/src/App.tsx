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
import AuthPage from "@/pages/auth-page";
import Profile from "@/pages/profile";
import Compatibility from "@/pages/compatibility";
import Subscription from "@/pages/subscription";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/profile" component={Profile} />
      <Route path="/compatibility" component={Compatibility} />
      <Route path="/subscription" component={Subscription} />
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
