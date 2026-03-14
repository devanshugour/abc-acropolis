"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

const KEY = "abc_acropolis_activity_logged";

export function SessionActivityTracker() {
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;
    const isNewLogin = typeof sessionStorage !== "undefined" && !sessionStorage.getItem(KEY);
    if (isNewLogin && typeof sessionStorage !== "undefined") sessionStorage.setItem(KEY, "1");
    fetch("/api/session/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isNewLogin }),
    }).catch(() => {});
  }, [status]);

  return null;
}
