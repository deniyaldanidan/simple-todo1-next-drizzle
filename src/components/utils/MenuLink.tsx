"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import React from "react";

export default function MenuLink({
  path,
  label,
}: {
  path: string;
  label: string | React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <Link
      href={path}
      className={clsx(
        typeof label === "string" ? "menu-link" : "menu-flex-link",
        {
          active: pathName === path,
        }
      )}
    >
      {label}
    </Link>
  );
}
