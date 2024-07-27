"use client";
import MenuLink from "@/components/utils/MenuLink";
import myRoutes from "@/utils/myRoutes";

export default function BasicHeader() {
  return (
    <header className="px-page-margin-x py-3.5 bg-secBackground flex justify-between items-center border-b-2 border-b-terBackground">
      <h1 className="text-logo-font font-semibold tracking-wider">TSKR</h1>
      <nav className="flex gap-x-10 items-center">
        <MenuLink path={myRoutes.home.path} label="Home" />
        <MenuLink path={myRoutes.signIn.path} label="Sign In" />
        <MenuLink path={myRoutes.signUp.path} label="Sign Up" />
      </nav>
    </header>
  );
}
