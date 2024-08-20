"use client";

import useSignOut from "@/hooks/useSignOut";

export default function SignOutBtn() {
  const signOutFN = useSignOut();

  return (
    <button type="button" className="menu-link" onClick={signOutFN}>
      Sign Out
    </button>
  );
}
