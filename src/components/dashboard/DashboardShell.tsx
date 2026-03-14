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
    <div className="flex min-h-screen bg-bg-main">
      {/* Desktop sidebar: in flow, collapsible */}
      <div className="hidden shrink-0 md:block">
        <DashboardSidebar
          open={sidebarOpen}
          onToggle={toggleSidebar}
          onClose={() => {}}
          isMobile={false}
        />
      </div>
      {/* Mobile sidebar: overlay drawer */}
      <DashboardSidebar
        open={mobileMenuOpen}
        onToggle={() => {}}
        onClose={closeMobileMenu}
        isMobile
      />
      {/* Main content column */}
      <div className="flex min-h-screen flex-1 flex-col overflow-x-hidden">
        <DashboardHeader title={title} onMenuClick={openMobileMenu} />
        <main className="relative flex-1 px-4 py-6 sm:px-6">
          {children}
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
}
