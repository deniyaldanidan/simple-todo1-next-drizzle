"use client";

import Link from "next/link";
import React from "react";

type props = {
  closeFN: Function;
  path: string;
  linkText: string | React.ReactNode;
};

export default function MobileNavLink({ closeFN, path, linkText }: props) {
  return (
    <Link
      href={path}
      onClick={() => closeFN()}
      className="flex items-center gap-x-1.5 px-5 py-2 text-lg font-semibold capitalize border-b-2 border-b-slate-700 duration-200 hover:bg-primary hover:text-dimBackground"
    >
      {linkText}
    </Link>
  );
}
