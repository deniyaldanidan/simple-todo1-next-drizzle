import myRoutes from "@/utils/myRoutes";
import Link from "next/link";

export default function SideUserNav() {
  return (
    <nav className="side-nav-layout">
      <Link href={myRoutes.userInfo.path} className="side-nav-link">
        User Info
      </Link>
      <Link href={myRoutes.editUserInfo.path} className="side-nav-link">
        Edit User Info
      </Link>
      <Link href={myRoutes.changePassword.path} className="side-nav-link">
        Change Password
      </Link>
      <Link href={myRoutes.deleteAccount.path} className="side-nav-link">
        Delete Account
      </Link>
    </nav>
  );
}
