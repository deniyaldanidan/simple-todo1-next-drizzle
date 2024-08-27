"use client";

import LoadingInfo from "@/components/utils/LoadingInfo";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import queryKeys from "@/utils/query-keys";
import getUserInfo from "@/utils/queryfns/getUserInfo";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function UserPage() {
  const { authObj } = useAuthContext();
  const { isSuccess, isLoading, data, isError, error } = useQuery({
    queryKey: queryKeys.userInfo,
    queryFn: () =>
      getUserInfo(authObj.auth === true ? authObj.accessToken : ""),
    enabled: authObj.auth === true,
  });

  useEffect(() => {
    if (isError) {
      throw new Error(error.message);
    }
  }, [isError, error]);

  if (isLoading) {
    return <LoadingInfo />;
  }

  return (
    <div className="min-h-screen h-fit px-page-margin-x py-12">
      <section className="pb-5 mb-8 border-b-2 border-b-terBackground">
        <h2 className="text-secForeground text-section-title-font">
          User Info
        </h2>
      </section>
      <section className="max-w-[750px] w-full flex flex-col gap-y-10">
        {isSuccess ? (
          <>
            <div className="flex items-center gap-x-4 w-full mobile-lg:gap-x-3 mobile-md:gap-x-2.5">
              <span className="w-full text-xl text-secForeground capitalize font-bold tablet-sm:text-lg mobile-sm:text-base">
                Firstname
              </span>
              <span className="text-xl font-medium w-full text-foreground capitalize tablet-sm:text-lg mobile-sm:text-base">
                {data.firstname}
              </span>
            </div>
            <div className="flex items-center gap-x-4 w-full mobile-lg:gap-x-3 mobile-md:gap-x-2.5">
              <span className="w-full text-xl text-secForeground capitalize font-bold tablet-sm:text-lg mobile-sm:text-base">
                Lastname
              </span>
              <span className="text-xl font-medium w-full text-foreground capitalize tablet-sm:text-lg mobile-sm:text-base">
                {data.lastname}
              </span>
            </div>
            <div className="flex items-center gap-x-4 w-full mobile-lg:gap-x-3 mobile-md:gap-x-2.5">
              <span className="w-full text-xl text-secForeground capitalize font-bold tablet-sm:text-lg mobile-sm:text-base">
                Username
              </span>
              <span className="text-xl font-medium w-full text-foreground tablet-sm:text-lg mobile-sm:text-base">
                {data.username}
              </span>
            </div>
            <div className="flex items-center gap-x-4 w-full mobile-lg:gap-x-3 mobile-md:gap-x-2.5">
              <span className="w-full text-xl text-secForeground capitalize font-bold tablet-sm:text-lg mobile-sm:text-base">
                Email
              </span>
              <span className="text-xl font-medium w-full text-foreground tablet-sm:text-lg mobile-sm:text-base">
                {data.email}
              </span>
            </div>
          </>
        ) : (
          <div className="text-2xl text-foreground">User info not found</div>
        )}
      </section>
    </div>
  );
}
