import myRoutes from "@/utils/myRoutes";
import Link from "next/link";

export default function AuthedInfo() {
  return (
    <section className="min-h-screen h-fit flex flex-col gap-y-7 items-center justify-center">
      <h2 className="text-2xl font-semibold">
        Please wait we&apos;re redirecting you to app
      </h2>
      <Link
        href={myRoutes.appHome.path}
        replace
        className="btn btn-lg btn-primary"
      >
        Go to App
      </Link>
    </section>
  );
}
