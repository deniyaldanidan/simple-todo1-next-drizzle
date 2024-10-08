import Link from "next/link";

type props = {
  message: string;
  path: string;
  btnText: string;
};

export default function NotFoundInfo({ message, path, btnText }: props) {
  return (
    <section className="w-full min-h-screen h-fit flex flex-col items-center justify-center gap-y-5 px-2">
      <h2 className="text-2xl text-danger text-center font-bold laptop-md:text-xl">
        {message}
      </h2>
      <Link href={path} className="btn btn-lg btn-primary">
        {btnText}
      </Link>
    </section>
  );
}
