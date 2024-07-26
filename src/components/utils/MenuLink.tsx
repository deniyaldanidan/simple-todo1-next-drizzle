"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function MenuLink({
  path,
  label,
}: {
  path: string;
  label: string;
}) {
  const pathName = usePathname();

  return (
    <Link
      href={path}
      className={clsx("menu-link", {
        active: pathName === path,
      })}
    >
      {label}
    </Link>
  );
}
