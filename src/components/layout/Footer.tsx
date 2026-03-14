import Link from "next/link";
import { NAV_ITEMS } from "@/types";
import { cn } from "@/lib";

const SITE_NAME = "ABC Acropolis";

const FOOTER_NAV = NAV_ITEMS.filter((n) => n.href !== "/");

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
] as const;

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "border-t border-accent-secondary/20 bg-bg-card py-14",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-text-main">{SITE_NAME}</h3>
            <p className="mt-3 max-w-sm text-sm text-text-secondary">
              Your College Cloud — events, gallery, newspaper, team, and community. 
              Part of Acropolis Group of Institutions. Stay connected, participate, and grow.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Explore
            </h4>
            <ul className="mt-3 space-y-2">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary transition-colors hover:text-accent-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Get involved
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/join-club" className="hover:text-accent-primary">
                  Join Club
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Legal
            </h4>
            <ul className="mt-3 space-y-2">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-text-secondary transition-colors hover:text-accent-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-accent-secondary/20 pt-8">
          <p className="text-center text-sm text-text-secondary">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
