"use client";
import { useRef } from "react";
import MobileSideNavContainer from "@/components/Headers/MobileNavContainer";
import MobileNavLink from "@/components/utils/MobileNavLink";
import myRoutes from "@/utils/myRoutes";

export default function UserMobileSideNav() {
  const ref = useRef<HTMLDialogElement>(null);

  const closeFN = () => {
    ref.current?.close();
  };

  return (
    <MobileSideNavContainer
      ref={ref}
      closeFN={closeFN}
      showModal={() => ref.current?.showModal()}
    >
      <MobileNavLink
        path={myRoutes.userInfo.path}
        linkText="User Info"
        closeFN={closeFN}
      />
      <MobileNavLink
        path={myRoutes.editUserInfo.path}
        linkText="Edit User Info"
        closeFN={closeFN}
      />
      <MobileNavLink
        path={myRoutes.changePassword.path}
        linkText="Change Password"
        closeFN={closeFN}
      />
      <MobileNavLink
        path={myRoutes.deleteAccount.path}
        linkText="Delete Account"
        closeFN={closeFN}
      />
    </MobileSideNavContainer>
  );
}
