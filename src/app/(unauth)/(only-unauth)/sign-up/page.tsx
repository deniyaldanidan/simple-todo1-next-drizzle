"use client";

import Image from "next/image";
import signUpImg from "@/assets/sign-up.svg";
import InputGRP from "@/components/InputGRP/InputGRP";
import { FormEventHandler, useState } from "react";
import {
  SignUpPageinputsError,
  signUpPageinputsParser,
} from "@/utils/zod-valids";
import { ZodError } from "zod";
import Link from "next/link";
import myRoutes from "@/utils/myRoutes";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import useAuthContext from "@/contexts/Auth/useAuthContext";

export default function SignUpPage() {
  const router = useRouter();
  const { signInUser } = useAuthContext();
  // * inputstates
  const [firstnameVal, setFirstnameVal] = useState<string>("");
  const [lastnameVal, setLastnameVal] = useState<string>("");
  const [usernameVal, setUsernameVal] = useState<string>("");
  const [emailVal, setEmailVal] = useState<string>("");
  const [pwdVal, setPwdVal] = useState<string>("");
  const [confirmVal, setConfirmVal] = useState<string>("");
  // * error states
  const [formErrors, setFormErrors] = useState<SignUpPageinputsError>();
  const [confirmErr, setConfirmErr] = useState<string>("");
  const [rootErr, setRootErr] = useState<string>("");

  const submitFN: FormEventHandler = async (e) => {
    e.preventDefault();
    setRootErr("");
    setConfirmErr("");
    setFormErrors({});
    if (pwdVal !== confirmVal) {
      return setConfirmErr("Doesn't match entered password");
    }
    try {
      const parsedvals = await signUpPageinputsParser.parseAsync({
        firstname: firstnameVal,
        lastName: lastnameVal,
        userName: usernameVal,
        email: emailVal,
        password: pwdVal,
      });
      const res = await axios.post<{ success: true; token: string }>(
        myRoutes.signUpApi.path,
        parsedvals
      );
      signInUser(res.data.token);
      router.replace(myRoutes.appHome.path);
    } catch (error) {
      if (error instanceof ZodError) {
        const parsedformErrors: SignUpPageinputsError =
          error.flatten().fieldErrors;
        setFormErrors(parsedformErrors);
        return;
      }
      if (error instanceof AxiosError) {
        const errMSG =
          error.response?.data?.error ?? "Error happened, Try Again.";
        return setRootErr(errMSG);
      }
      console.log(error);
    }
  };

  return (
    <section className="px-page-margin-x py-14 flex justify-center items-center gap-x-8 laptop:flex-col laptop:gap-y-7">
      <Image
        src={signUpImg}
        alt="Welcome to TSKR"
        className="w-full max-w-[475px] h-auto laptop:max-w-[325px]"
        unoptimized
        priority
      />
      <form
        onSubmit={submitFN}
        className="w-full max-w-[750px] flex flex-col gap-y-7"
      >
        <div>
          <h2 className="text-section-title-font font-semibold text-center">
            Welcome to TSKR!
          </h2>
          <p className="text-base text-center min-h-6 font-medium text-red-500">
            {rootErr}
          </p>
        </div>
        <div className="flex gap-x-8 tablet:flex-col tablet:gap-y-7">
          <InputGRP
            label="First Name"
            inputId="first-name-signup-input"
            errorMsg={formErrors?.firstname ?? ""}
            placeholder="Enter your first name here"
            type="text"
            value={firstnameVal}
            onChange={(e) => setFirstnameVal(e.target.value)}
          />
          <InputGRP
            label="Last Name"
            inputId="last-name-signup-input"
            errorMsg={formErrors?.lastName ?? ""}
            placeholder="Enter your last name here"
            type="text"
            value={lastnameVal}
            onChange={(e) => setLastnameVal(e.target.value)}
          />
        </div>
        <div className="flex gap-x-8 tablet:flex-col tablet:gap-y-7">
          <InputGRP
            label="Username"
            inputId="user-name-signup-input"
            errorMsg={formErrors?.userName ?? ""}
            placeholder="Enter your Username here"
            type="text"
            value={usernameVal}
            onChange={(e) => setUsernameVal(e.target.value)}
          />
          <InputGRP
            label="Email"
            inputId="email-signup-input"
            errorMsg={formErrors?.email ?? ""}
            placeholder="Enter your email here"
            type="text"
            value={emailVal}
            onChange={(e) => setEmailVal(e.target.value)}
          />
        </div>
        <div className="flex gap-x-8 tablet:flex-col tablet:gap-y-7">
          <InputGRP
            label="Password"
            inputId="password-signup-input"
            errorMsg={formErrors?.password ?? ""}
            placeholder="Enter your password here"
            type="password"
            value={pwdVal}
            onChange={(e) => setPwdVal(e.target.value)}
          />
          <InputGRP
            label="ReType Password"
            inputId="confirm-signup-input"
            errorMsg={confirmErr}
            placeholder="Retype your password here"
            type="password"
            value={confirmVal}
            onChange={(e) => setConfirmVal(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-full mt-2">
          Sign Up
        </button>
        <p className="mt-3 text-center text-lg">
          Already have an account?{" "}
          <Link
            href={myRoutes.signIn.path}
            className="text-nowrap font-bold underline underline-offset-2 hover:text-accent"
          >
            Sign In
          </Link>
        </p>
      </form>
    </section>
  );
}
