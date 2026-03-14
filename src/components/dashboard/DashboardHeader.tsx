"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ExternalLink, LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { User } from "lucide-react";

const BREADCRUMB: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/events": "Events",
  "/dashboard/events/create": "Create event",
  "/dashboard/newspaper": "Newspaper",
  "/dashboard/newspaper/create": "Create article",
  "/dashboard/gallery": "Gallery",
  "/dashboard/settings": "Settings",
  "/dashboard/settings/profile": "Profile",
};

function getBreadcrumb(pathname: string): string {
  if (BREADCRUMB[pathname]) return BREADCRUMB[pathname];
  if (pathname.startsWith("/dashboard/events/") && pathname.includes("/participants"))
    return "Participants";
  if (pathname.startsWith("/dashboard/events/")) return "Event";
  return "Dashboard";
}

export function DashboardHeader({
  onMenuClick,
  title = "Dashboard",
}: {
  onMenuClick: () => void;
  title?: string;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const breadcrumb = getBreadcrumb(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-accent-secondary/10 bg-bg-main/95 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-text-main transition-colors hover:bg-bg-card md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex min-w-0 items-center gap-2">
          <LayoutDashboard className="hidden h-5 w-5 shrink-0 text-accent-primary sm:block" />
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-text-main">{title}</h1>
            <p className="hidden truncate text-xs text-text-secondary sm:block">
              {breadcrumb}
            </p>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-card hover:text-text-main sm:inline-flex"
        >
          <ExternalLink className="h-4 w-4" />
          View site
        </Link>
        {session?.user && (
          <div className="flex items-center gap-2 rounded-lg border border-accent-secondary/10 bg-bg-card/50 px-2 py-1.5">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-primary/20 text-accent-primary">
                <User className="h-3.5 w-3.5" />
              </span>
            )}
            <span className="hidden max-w-[140px] truncate text-sm text-text-main sm:inline">
              {session.user.name ?? session.user.email}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
