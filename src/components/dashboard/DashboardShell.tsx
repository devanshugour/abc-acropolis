"use client";

import { useState, useCallback } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardFooter } from "./DashboardFooter";

export function DashboardShell({
  children,
  title = "Dashboard",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);
  const openMobileMenu = useCallback(() => setMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Desktop: fixed full-height sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar
          open={sidebarOpen}
          onToggle={toggleSidebar}
          onClose={() => {}}
          isMobile={false}
        />
      </div>
      {/* Mobile: overlay drawer */}
      <DashboardSidebar
        open={mobileMenuOpen}
        onToggle={() => {}}
        onClose={closeMobileMenu}
        isMobile
      />
      {/* Main content column: full height, offset by sidebar on desktop */}
      <div
        className={`flex min-h-screen flex-1 flex-col transition-[margin-left] duration-300 ${sidebarOpen ? "md:ml-[15.5rem]" : "md:ml-[4.25rem]"}`}
      >
        <DashboardHeader title={title} onMenuClick={openMobileMenu} />
        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {children}
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
}
