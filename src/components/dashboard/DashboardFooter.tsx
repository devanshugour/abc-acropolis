import Link from "next/link";

const SITE_NAME = "ABC Acropolis";

export function DashboardFooter() {
  return (
    <footer className="mt-auto border-t border-accent-secondary/10 bg-bg-card py-4">
      <div className="page-container flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="text-sm text-text-secondary">
          © {new Date().getFullYear()} {SITE_NAME} · Dashboard
        </p>
        <div className="flex gap-4 text-sm">
          <Link
            href="/privacy-policy"
            className="text-text-secondary transition-colors hover:text-accent-primary"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-text-secondary transition-colors hover:text-accent-primary"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="text-text-secondary transition-colors hover:text-accent-primary"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
