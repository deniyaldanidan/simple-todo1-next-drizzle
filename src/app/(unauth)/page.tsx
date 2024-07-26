import myRoutes from "@/utils/myRoutes";
import Image from "next/image";
import Link from "next/link";
import heroImg from "@/assets/hero-img.svg";

export default function Home() {
  return (
    <section className="py-16 px-page-margin-x flex justify-center items-center gap-x-14 min-h-[75vh]">
      {/* Left section */}
      <div className="flex flex-col gap-y-6 max-w-[640px]">
        <div className="flex flex-col gap-y-2.5">
          <h2 className="text-section-title-font font-semibold">
            Simplify Your Workflow, One Task at a Time
          </h2>
          <h3 className="text-section-subtitle-font font-medium leading-relaxed">
            Manage your projects effortlessly with TSKR. Create and organize
            tasks within projects to streamline your productivity. Whether
            you&apos;re handling personal to-dos or managing complex projects,
            TSKR makes it easy to stay on track and achieve your goals. Start
            turning your plans into actions today!
          </h3>
        </div>

        <Link href={myRoutes.signUp.path} className="btn btn-base btn-primary">
          Start Now
        </Link>
      </div>
      {/* Right section */}
      <div>
        <Image
          src={heroImg}
          alt="TSKR - a task management app"
          unoptimized
          priority
          className="w-full max-w-[600px] h-auto object-cover"
        />
      </div>
    </section>
  );
}
