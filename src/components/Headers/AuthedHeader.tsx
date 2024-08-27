"use client";

import useAuthContext from "@/contexts/Auth/useAuthContext";
import SignOutBtn from "./SignOutBtn";
import MenuLink from "../utils/MenuLink";
import { capitalize } from "@/utils/helpers";
import myRoutes from "@/utils/myRoutes";
import MainHeaderContainer from "./MainHeaderContainer";

export default function AuthedHeader() {
  const { authObj } = useAuthContext();

  return (
    <MainHeaderContainer>
      {authObj.auth === true ? (
        <>
          <MenuLink label="App" path={myRoutes.appHome.path} />
          <MenuLink
            label={
              <>
                <span>Hi,</span>
                <span>{capitalize(authObj.userInfo.firstname)}</span>
              </>
            }
            path={myRoutes.userInfo.path}
          />
          <SignOutBtn />
        </>
      ) : (
        ""
      )}
    </MainHeaderContainer>
  );
}
