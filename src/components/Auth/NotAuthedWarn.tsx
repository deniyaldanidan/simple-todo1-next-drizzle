import myRoutes from "@/utils/myRoutes";
import Link from "next/link";

export default function NotAuthedWarn() {
  return (
    <section className="min-h-screen h-fit flex flex-col gap-y-7 items-center justify-center">
      <h2 className="text-danger text-2xl font-semibold">
        You need to Sign In to view this page
      </h2>
      <Link
        href={myRoutes.signIn.path}
        replace
        className="btn btn-lg btn-primary"
      >
        Go to Sign In
      </Link>
    </section>
  );
}
