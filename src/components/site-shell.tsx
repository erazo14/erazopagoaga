import { Heart, LocateFixed, Menu, X } from 'lucide-react';
import { WeddingLoader } from '@/components/wedding-loader';
import { type ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useI18n } from '@/lib/i18n';

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const { language, setLanguage, t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const hasGuestInvitation = Boolean(
    searchParams.get('guestId') ?? searchParams.get('invite') ?? searchParams.get('Uid'),
  );
  const waitForInvitationOpen = location === '/rsvp' && hasGuestInvitation;

  const closeMenu = () => setMenuOpen(false);


  if (loading) {
    return (
      <WeddingLoader
        onComplete={() => setLoading(false)}
        waitForOpen={waitForInvitationOpen}
        onOpenInvitation={() => {
          window.dispatchEvent(new Event('wedding:open-invitation'));
        }}
      />
    );
  }

  return (
    <div className="paper-grain min-h-[100dvh] overflow-x-hidden bg-background text-foreground">
      <header className="relative z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-[4.75rem] max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-3"
            data-testid="link-home-logo"
          >
            <span className="grid h-9 w-9 place-items-center text-primary transition-transform duration-300 group-hover:rotate-[-12deg]">
              {/* <Heart size={15} strokeWidth={1.5} fill="currentColor" /> */}
              <img src="/favicon.png" alt="" />
            </span>
            <span className="display-font text-[1.35rem] font-semibold tracking-[-.02em]">
              Grecia & Fernando
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <Link
              href="/"
              className={`eyebrow transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}
              data-testid="link-invitation"
            >
              Save the Date
            </Link>
            {/* <Link
              href="/rsvp"
              className={`eyebrow transition-colors hover:text-primary ${location === '/rsvp' ? 'text-primary' : 'text-muted-foreground'}`}
              data-testid="link-rsvp"
            >
              RSVP
            </Link> */}
            {/* <Link
              href="/responses"
              className={`eyebrow transition-colors hover:text-primary ${location === '/responses' ? 'text-primary' : 'text-muted-foreground'}`}
              data-testid="link-responses"
            >
              For the couple
            </Link> */}
          </nav>

          {/* <button
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
            data-testid="button-toggle-navigation"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button> */}
        </div>

        {/* {menuOpen && (
          <div className="border-t border-border/70 bg-card px-5 py-5 md:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1" aria-label="Mobile navigation">
              <Link href="/" onClick={closeMenu} className="rounded-md px-3 py-3 text-sm font-semibold hover:bg-secondary" data-testid="link-mobile-invitation">
                Invitation
              </Link>
              <Link href="/rsvp" onClick={closeMenu} className="rounded-md px-3 py-3 text-sm font-semibold hover:bg-secondary" data-testid="link-mobile-rsvp">
                RSVP
              </Link>
              <Link href="/responses" onClick={closeMenu} className="rounded-md px-3 py-3 text-sm font-semibold hover:bg-secondary" data-testid="link-mobile-responses">
                Response notes
              </Link>
            </nav>
          </div>
        )} */}
      </header>

      <main>
         <div className="absolute top-7 right-10 bg-secondary/70 rounded-md z-99" >
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className='mx-3'
          >
              {language === 'en' ? 'ES' : 'EN'}
          </button>
        </div>
        {children}
      </main>

      <footer className="border-t border-border/70 bg-secondary/45">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-left">
          <p className="display-font text-xl font-semibold">{t('footer.signature')}</p>
          {/* <p className="text-xs tracking-[.08em] text-muted-foreground">Please reply when you can · We cannot wait to see you</p> */}
        </div>
      </footer>
    </div>
  );
}