"use client";

import useAuthContext from "@/contexts/Auth/useAuthContext";
import SignOutBtn from "./SignOutBtn";
import MenuLink from "../utils/MenuLink";
import { capitalize } from "@/utils/helpers";
import myRoutes from "@/utils/myRoutes";

export default function AuthedHeader() {
  const { authObj } = useAuthContext();

  return (
    <header className="px-page-margin-x py-3.5 bg-secBackground flex justify-between items-center border-b-2 border-b-terBackground">
      <h1 className="text-logo-font font-semibold tracking-wider">TSKR</h1>
      <nav className="flex gap-x-10 items-center">
        {authObj.auth === true ? (
          <>
            <MenuLink label="Home" path={myRoutes.appHome.path} />
            <MenuLink
              label={`Hi, ${capitalize(
                authObj.userInfo.firstname
              )} ${capitalize(authObj.userInfo.lastname)}`}
              path={myRoutes.userInfo.path}
            />
            <SignOutBtn />
          </>
        ) : (
          ""
        )}
      </nav>
    </header>
  );
}
