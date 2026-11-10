import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PageNotFound } from '@/components/data-states';
import { SiteShell } from '@/components/site-shell';
import { FloatingInvitationControls } from '@/components/floating-invitation-controls';
import Home from '@/pages/home';
import GalleryPage from '@/pages/gallery';
import ResponsesPage from '@/pages/responses';
import RsvpPage from '@/pages/rsvp';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const hasGuestInvitation = Boolean(
    searchParams.get('guestId') ?? searchParams.get('invite') ?? searchParams.get('Uid'),
  );

  return (
    <>
      <RoutedErrorBoundary>
        <SiteShell>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/gallery" component={GalleryPage} />
            <Route path="/rsvp" component={RsvpPage} />
            <Route path="/responses" component={ResponsesPage} />
            <Route component={PageNotFound} />
          </Switch>
        </SiteShell>
      </RoutedErrorBoundary>
      {location === '/rsvp' && hasGuestInvitation && <FloatingInvitationControls />}
    </>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
