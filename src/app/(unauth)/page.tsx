import myRoutes from "@/utils/myRoutes";
import Image from "next/image";
import Link from "next/link";
import heroImg from "@/assets/hero-img.svg";

export default function Home() {
  return (
    <section className="pt-16 pb-20 px-page-margin-x flex justify-center items-center gap-x-14 min-h-[75vh] laptop-sm:flex-col laptop-sm:gap-y-12">
      {/* Left section */}
      <div className="flex flex-col gap-y-6 w-full max-w-[640px] laptop-sm:items-center laptop-sm:max-w-[610px] mobile-lg:items-start">
        <div className="flex flex-col gap-y-2.5 laptop-sm:items-center mobile-lg:items-start">
          <h2 className="text-section-title-font font-semibold flex flex-wrap gap-x-1.5 laptop-sm:justify-center laptop-sm:text-center mobile-lg:justify-start mobile-lg:text-left">
            <span>Simplify Your Workflow,</span>
            <span>One Task at a Time</span>
          </h2>
          <h3 className="text-secForeground text-section-subtitle-font font-medium leading-relaxed laptop-sm:text-center mobile-lg:text-left">
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

      <Image
        src={heroImg}
        alt="TSKR - a task management app"
        unoptimized
        priority
        className="w-full max-w-[550px] h-auto object-cover laptop:max-w-[475px] laptop-md:max-w-[400px] laptop-sm:max-w-[550px]"
      />
    </section>
  );
}
