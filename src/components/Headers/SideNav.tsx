import { MdAdd as AddIcon } from "react-icons/md";
import Link from "next/link";
import myRoutes from "@/utils/myRoutes";
import SideNavProjectsList from "@/components/Headers/SideNavProjectsList";

export default function SideNav() {
  return (
    <nav className="side-nav-layout">
      <Link href={myRoutes.appHome.path} className="side-nav-link">
        Today
      </Link>
      <Link href={myRoutes.archives.path} className="side-nav-link">
        Archives
      </Link>
      <div className="flex flex-col gap-y-1 mt-2.5">
        <div className="uppercase font-semibold text-sm text-dimForeground tracking-widest pl-2 mb-0.5">
          Projects
        </div>
        <Link
          href={myRoutes.addProject.path}
          className="side-nav-link flex gap-x-1 items-center"
        >
          <AddIcon /> Add
        </Link>
        <SideNavProjectsList />
      </div>
    </nav>
  );
}
