import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/Layout";

// Pages
import Dashboard from "@/pages/dashboard";
import Flights from "@/pages/flights";
import Transport from "@/pages/transport";
import Accommodation from "@/pages/accommodation";
import Safety from "@/pages/safety";
import Itinerary from "@/pages/itinerary";
import Culture from "@/pages/culture";
import Diary from "@/pages/diary";
import Register from "@/pages/register";
import Evaluation from "@/pages/evaluation";
import FAQ from "@/pages/faq";
import Staff from "@/pages/staff";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/flights" component={Flights} />
        <Route path="/transport" component={Transport} />
        <Route path="/accommodation" component={Accommodation} />
        <Route path="/safety" component={Safety} />
        <Route path="/itinerary" component={Itinerary} />
        <Route path="/culture" component={Culture} />
        <Route path="/diary" component={Diary} />
        <Route path="/register" component={Register} />
        <Route path="/evaluation" component={Evaluation} />
        <Route path="/faq" component={FAQ} />
        <Route path="/staff" component={Staff} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portal-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;