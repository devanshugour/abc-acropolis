"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LayoutDashboard, History, Activity, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib";
import { NAV_ITEMS } from "@/types";
import { TickerLine } from "./TickerLine";

const SITE_NAME = "ABC Acropolis";

const USER_MENU_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "History", href: "/dashboard", icon: History },
  { label: "Activities", href: "/dashboard", icon: Activity },
] as const;

export function Header({ className }: { className?: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setUserMenuOpen(false);
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [userMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-accent-secondary/10 bg-bg-main/98 backdrop-blur-md",
          className
        )}
      >
        <div className="page-container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-text-main transition-opacity hover:opacity-90"
          >
            {SITE_NAME}
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-accent-primary/20 text-accent-primary"
                    : "text-text-secondary hover:bg-bg-card hover:text-text-main"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {session ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-text-main transition-colors hover:bg-bg-card focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary/20 text-accent-primary">
                      <User className="h-4 w-4" />
                    </span>
                  )}
                  <ChevronDown
                    className={cn("h-4 w-4 text-text-secondary transition-transform", userMenuOpen && "rotate-180")}
                  />
                </button>
                {userMenuOpen && (
                  <div
                    className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-xl border border-accent-secondary/20 bg-bg-card py-1.5 shadow-xl shadow-black/20"
                    role="menu"
                  >
                    {USER_MENU_ITEMS.map(({ label, href, icon: Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-bg-main hover:text-text-main"
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {label}
                      </Link>
                    ))}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setUserMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-text-secondary transition-colors hover:bg-bg-main hover:text-red-400 focus:outline-none"
                    >
                      <LogOut className="h-4 w-4 shrink-0" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-card hover:text-text-main"
              >
                Sign in
              </Link>
            )}
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text-main md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-accent-secondary/10 bg-bg-main px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium",
                    pathname === item.href
                      ? "bg-accent-primary/20 text-accent-primary"
                      : "text-text-secondary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {session ? (
                <>
                  <button
                    type="button"
                    onClick={() => setMobileUserMenuOpen((o) => !o)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-text-secondary"
                    aria-expanded={mobileUserMenuOpen}
                  >
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-primary/20">
                        <User className="h-3.5 w-3.5 text-accent-primary" />
                      </span>
                    )}
                    <span>Account</span>
                    <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", mobileUserMenuOpen && "rotate-180")} />
                  </button>
                  {mobileUserMenuOpen && (
                    <div className="ml-4 flex flex-col gap-0.5 border-l border-accent-secondary/20 pl-3">
                      {USER_MENU_ITEMS.map(({ label, href, icon: Icon }) => (
                        <Link
                          key={label}
                          href={href}
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileUserMenuOpen(false);
                          }}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary"
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {label}
                        </Link>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileUserMenuOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-text-secondary hover:text-red-400"
                      >
                        <LogOut className="h-4 w-4 shrink-0" />
                        Sign out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary"
                >
                  Sign in
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
      <TickerLine />
    </>
  );
}
