"use client";

import Image from "next/image";
import signInImg from "@/assets/sign-in.svg";
import { ReactEventHandler, useState } from "react";
import InputGRP from "@/components/InputGRP/InputGRP";
import myRoutes from "@/utils/myRoutes";
import Link from "next/link";
import { signInPageInputParser } from "@/utils/zod-valids";
import { ZodError } from "zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import useAuthContext from "@/contexts/Auth/useAuthContext";

export default function SignInPage() {
  const router = useRouter();
  const { signInUser } = useAuthContext();
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rootErr, setRootErr] = useState<string>("");

  const submitFN: ReactEventHandler = async (e) => {
    e.preventDefault();
    setRootErr("");
    try {
      const parsedData = await signInPageInputParser.parseAsync({
        usernameOrEmail,
        password,
      });
      const res = await axios.post<{ success: true; token: string }>(
        myRoutes.signInApi.path,
        parsedData
      );
      signInUser(res.data.token);
      router.replace(myRoutes.appHome.path);
    } catch (error) {
      if (error instanceof ZodError) {
        return setRootErr("Please fill out all fields");
      }
      if (error instanceof AxiosError) {
        const errMSG =
          error.response?.data?.error ?? "Error happened, Try Again.";
        return setRootErr(errMSG);
      }
      console.log(error);
    }
  };

  // FIXME Got below verbose from chrome-console: (Try to solve it & this may help https://www.chromium.org/developers/design-documents/create-amazing-password-forms/)
  // -  Input elements should have autocomplete attributes (suggested: "current-password")

  return (
    <section>
      <section className="px-page-margin-x py-14 flex justify-center items-center gap-x-12">
        <Image
          src={signInImg}
          alt="Welcome back to TSKR"
          className="w-full max-w-[550px] h-full"
          unoptimized
          priority
        />
        <form
          onSubmit={submitFN}
          className="w-full max-w-[500px] flex flex-col gap-y-10"
        >
          <div>
            <h2 className="text-section-title-font font-semibold text-center">
              Welcome back to TSKR!
            </h2>
            <p className="text-base text-center min-h-6 font-medium text-red-500">
              {rootErr}
            </p>
          </div>

          <InputGRP
            label="Username Or Email"
            inputId="user-name-or-email-signin-input"
            errorMsg=""
            placeholder="Your username or email comes here"
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
          <InputGRP
            label="Password"
            inputId="password-signin-input"
            errorMsg=""
            placeholder="Your password comes here"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-full mt-2">
            Sign In
          </button>
          <p className="mt-3 text-center text-lg">
            Don&apos;t have an account yet?{" "}
            <Link
              href={myRoutes.signUp.path}
              className="font-bold underline underline-offset-2 hover:text-accent"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </section>
  );
}
