import NotFoundInfo from "@/components/utils/NotFoundInfo";
import myRoutes from "@/utils/myRoutes";

export default function NotFoundPage() {
  return (
    <NotFoundInfo
      path={myRoutes.appHome.path}
      message="Requested project is not found"
      btnText="Go Home"
    />
  );
}
