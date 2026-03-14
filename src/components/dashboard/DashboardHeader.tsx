"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { User } from "lucide-react";

export function DashboardHeader({
  onMenuClick,
  title = "Dashboard",
}: {
  onMenuClick: () => void;
  title?: string;
}) {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-accent-secondary/10 bg-bg-main/95 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-text-main transition-colors hover:bg-bg-card md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-text-main">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-card hover:text-text-main"
        >
          View Site
        </Link>
        {session?.user && (
          <span className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-text-secondary">
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
            <span className="hidden truncate max-w-[120px] sm:inline">
              {session.user.name ?? session.user.email}
            </span>
          </span>
        )}
      </div>
    </header>
  );
}
