"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Newspaper,
  Image as ImageIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import { cn } from "@/lib";

const SIDEBAR_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Events", href: "/dashboard/events", icon: Calendar },
  { label: "Newspaper", href: "/dashboard/newspaper", icon: Newspaper },
  { label: "Gallery", href: "/dashboard/gallery", icon: ImageIcon },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
] as const;

export function DashboardSidebar({
  open,
  onToggle,
  onClose,
  isMobile,
}: {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  isMobile: boolean;
}) {
  const pathname = usePathname();

  const content = (
    <nav className="flex flex-col gap-1 p-3">
      <Link
        href="/"
        title="Back to Site"
        className={cn(
          "flex items-center rounded-lg py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-main hover:text-text-main",
          isMobile ? "gap-3 px-3" : open ? "gap-3 px-3" : "justify-center px-2"
        )}
        onClick={isMobile ? onClose : undefined}
      >
        <Home className="h-5 w-5 shrink-0" />
        {isMobile && <span className="truncate">Back to Site</span>}
        {!isMobile && open && <span className="truncate">Back to Site</span>}
      </Link>
      {SIDEBAR_LINKS.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          title={label}
          onClick={isMobile ? onClose : undefined}
          className={cn(
            "flex items-center rounded-lg py-2.5 text-sm font-medium transition-colors",
            isMobile ? "gap-3 px-3" : open ? "gap-3 px-3" : "justify-center px-2",
            pathname === href || pathname.startsWith(href + "/")
              ? "bg-accent-primary/20 text-accent-primary"
              : "text-text-secondary hover:bg-bg-main hover:text-text-main"
          )}
        >
          <Icon className="h-5 w-5 shrink-0" />
          {(isMobile || open) && <span className="truncate">{label}</span>}
        </Link>
      ))}
    </nav>
  );

  if (isMobile) {
    return (
      <>
        {open && (
          <div
            className="fixed inset-0 z-40 bg-bg-main/80 backdrop-blur-sm md:hidden"
            aria-hidden
            onClick={onClose}
          />
        )}
        <aside
          className={cn(
            "fixed left-0 top-0 z-50 h-full w-64 border-r border-accent-secondary/20 bg-bg-card transition-transform duration-300 ease-out md:hidden",
            open ? "translate-x-0" : "-translate-x-full"
          )}
          role="navigation"
          aria-label="Dashboard menu"
        >
          <div className="flex h-14 items-center justify-between border-b border-accent-secondary/10 px-4">
            <span className="font-semibold text-text-main">Menu</span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-text-secondary hover:bg-bg-main hover:text-text-main"
              aria-label="Close menu"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
          {content}
        </aside>
      </>
    );
  }

  return (
    <aside
      className={cn(
        "relative flex shrink-0 flex-col border-r border-accent-secondary/20 bg-bg-card transition-[width] duration-300 ease-out",
        open ? "w-56" : "w-[4.25rem]"
      )}
      role="navigation"
      aria-label="Dashboard sidebar"
    >
      <div className="flex h-14 items-center justify-end border-b border-accent-secondary/10 px-2">
        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-bg-main hover:text-text-main"
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          {open ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>
      {content}
    </aside>
  );
}
