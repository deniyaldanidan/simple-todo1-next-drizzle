"use client";
import MenuLink from "@/components/utils/MenuLink";
import myRoutes from "@/utils/myRoutes";
import MainHeaderContainer from "./MainHeaderContainer";

export default function BasicHeader() {
  return (
    <MainHeaderContainer>
      <MenuLink path={myRoutes.home.path} label="Home" />
      <MenuLink path={myRoutes.signIn.path} label="Sign In" />
      <MenuLink path={myRoutes.signUp.path} label="Sign Up" />
    </MainHeaderContainer>
  );
}
