import React from "react";

export default function MainHeaderContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <header className="px-page-margin-x py-3.5 bg-secBackground flex justify-between items-center gap-x-5 border-b-2 border-b-terBackground">
      <h1 className="text-logo-font font-semibold tracking-wider">TSKR</h1>
      <nav className="flex gap-x-10 items-center tablet-sm:gap-x-8 mobile:gap-x-5 mobile-md:gap-x-4 mobile-sm:gap-x-3.5">
        {children}
      </nav>
    </header>
  );
}
