"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import {
  LayoutDashboard,
  Calendar,
  Newspaper,
  Image as ImageIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  Plus,
  List,
  LayoutGrid,
  FileText,
  ImagePlus,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib";

type DropdownKey = "events" | "newspaper" | "gallery" | "settings" | null;

const DROPDOWN_ITEMS: Record<
  Exclude<DropdownKey, null>,
  { label: string; href: string; icon: typeof List }[]
> = {
  events: [
    { label: "Create event", href: "/dashboard/events/create", icon: Plus },
    { label: "View all (list)", href: "/dashboard/events", icon: List },
    { label: "View all (grid)", href: "/dashboard/events?view=grid", icon: LayoutGrid },
  ],
  newspaper: [
    { label: "Create article", href: "/dashboard/newspaper/create", icon: Plus },
    { label: "View all (list)", href: "/dashboard/newspaper", icon: List },
    { label: "View all (grid)", href: "/dashboard/newspaper?view=grid", icon: LayoutGrid },
  ],
  gallery: [
    { label: "Manage images", href: "/dashboard/gallery", icon: ImagePlus },
    { label: "View (list)", href: "/dashboard/gallery?view=list", icon: List },
    { label: "View (grid)", href: "/dashboard/gallery?view=grid", icon: LayoutGrid },
  ],
  settings: [
    { label: "General", href: "/dashboard/settings", icon: Sliders },
    { label: "Profile", href: "/dashboard/settings/profile", icon: FileText },
  ],
};

const SIDEBAR_SECTIONS: { key: DropdownKey; label: string; href: string; icon: typeof Calendar }[] = [
  { key: null, label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "events", label: "Events", href: "/dashboard/events", icon: Calendar },
  { key: "newspaper", label: "Newspaper", href: "/dashboard/newspaper", icon: Newspaper },
  { key: "gallery", label: "Gallery", href: "/dashboard/gallery", icon: ImageIcon },
  { key: "settings", label: "Settings", href: "/dashboard/settings", icon: Settings },
];

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
  const [expanded, setExpanded] = useState<DropdownKey>(null);

  const expandedByPath = useMemo(() => {
    if (pathname.startsWith("/dashboard/events")) return "events";
    if (pathname.startsWith("/dashboard/newspaper")) return "newspaper";
    if (pathname.startsWith("/dashboard/gallery")) return "gallery";
    if (pathname.startsWith("/dashboard/settings")) return "settings";
    return null;
  }, [pathname]);

  const effectiveExpanded = expanded ?? expandedByPath;
  const showLabels = isMobile || open;

  const content = (
    <nav className="flex flex-col gap-0.5 p-3">
      <Link
        href="/"
        title="Back to Site"
        className={cn(
          "flex items-center rounded-lg py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-main hover:text-text-main",
          showLabels ? "gap-3 px-3" : "justify-center px-2"
        )}
        onClick={isMobile ? onClose : undefined}
      >
        <Home className="h-5 w-5 shrink-0" />
        {showLabels && <span className="truncate">Back to Site</span>}
      </Link>

      {SIDEBAR_SECTIONS.map(({ key, label, href, icon: Icon }) => {
        const isActive = key === null ? pathname === "/dashboard" : pathname === href || pathname.startsWith(href + "/");
        const isExpanded = key !== null && effectiveExpanded === key;
        const hasDropdown = key !== null && DROPDOWN_ITEMS[key];

        if (hasDropdown) {
          return (
            <div key={key}>
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : key)}
                className={cn(
                  "flex w-full items-center rounded-lg py-2.5 text-sm font-medium transition-colors",
                  showLabels ? "gap-3 px-3" : "justify-center px-2",
                  isActive ? "bg-accent-primary/20 text-accent-primary" : "text-text-secondary hover:bg-bg-main hover:text-text-main"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {showLabels && (
                  <>
                    <span className="truncate flex-1 text-left">{label}</span>
                    <ChevronRight
                      className={cn("h-4 w-4 shrink-0 transition-transform", isExpanded && "rotate-90")}
                    />
                  </>
                )}
              </button>
              {showLabels && isExpanded && DROPDOWN_ITEMS[key] && (
                <div className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l border-accent-secondary/20 pl-3">
                  {DROPDOWN_ITEMS[key].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={isMobile ? onClose : undefined}
                      className={cn(
                        "flex items-center gap-2 rounded-lg py-2 pl-2 text-xs font-medium transition-colors",
                        pathname === item.href || (item.href.includes("?") && pathname === item.href.split("?")[0])
                          ? "text-accent-primary"
                          : "text-text-secondary hover:text-text-main"
                      )}
                    >
                      <item.icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={href}
            href={href}
            onClick={isMobile ? onClose : undefined}
            className={cn(
              "flex items-center rounded-lg py-2.5 text-sm font-medium transition-colors",
              showLabels ? "gap-3 px-3" : "justify-center px-2",
              isActive ? "bg-accent-primary/20 text-accent-primary" : "text-text-secondary hover:bg-bg-main hover:text-text-main"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {showLabels && <span className="truncate">{label}</span>}
          </Link>
        );
      })}
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
            "fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-accent-secondary/20 bg-bg-card transition-transform duration-300 ease-out md:hidden",
            open ? "translate-x-0" : "-translate-x-full"
          )}
          role="navigation"
          aria-label="Dashboard menu"
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-accent-secondary/10 px-4">
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
          <div className="min-h-0 flex-1 overflow-y-auto">{content}</div>
        </aside>
      </>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen w-[15.5rem] flex-col border-r border-accent-secondary/20 bg-bg-card transition-[width] duration-300 ease-out",
        open ? "w-[15.5rem]" : "w-[4.25rem]"
      )}
      role="navigation"
      aria-label="Dashboard sidebar"
    >
      <div className="flex h-14 shrink-0 items-center justify-end border-b border-accent-secondary/10 px-2">
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
      <div className="min-h-0 flex-1 overflow-y-auto">{content}</div>
    </aside>
  );
}
