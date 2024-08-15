"use client";

import ArchivedCard from "@/components/Projects/ArchivedCard";
import LoadingInfo from "@/components/utils/LoadingInfo";
import useAuthContext from "@/contexts/Auth/useAuthContext";
import queryKeys from "@/utils/query-keys";
import getArchivedProjectList from "@/utils/queryfns/getArchivedProjectList";
import { useQuery } from "@tanstack/react-query";

export default function ArchivesPage() {
  const { authObj } = useAuthContext();
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: queryKeys.archivesList,
    queryFn: () =>
      getArchivedProjectList(authObj.auth === true ? authObj.accessToken : ""),
    enabled: authObj.auth === true,
  });

  if (isLoading) {
    return <LoadingInfo />;
  }

  return isSuccess ? (
    <div className="min-h-screen h-fit px-page-margin-x py-12">
      <section className="pb-5 mb-7 border-b-2 border-b-terBackground">
        <h2 className="text-secForeground text-section-title-font">
          Archived Projects
        </h2>
        <h3 className="text-dimForeground text-section-subtitle-font mt-4">
          Browse through archived projects, maintaining a record of completed
          and inactive work.
        </h3>
      </section>
      <section className="flex flex-wrap items-center gap-x-6 gap-y-7 max-w-[1300px] mx-auto">
        {data.length ? (
          data.map((arch) => (
            <ArchivedCard key={arch.projectId} archProjInfo={arch} />
          ))
        ) : (
          <h4 className="text-lg font-semibold text-secForeground">
            Currently, there are no archived projects. Once you archive a
            project, it will appear here
          </h4>
        )}
      </section>
    </div>
  ) : (
    ""
  );
}
