import axios from "axios";
import myRoutes from "../myRoutes";

type AxiosRtnTyp = {
  projectId: number;
  projectName: string;
  projectColorCode: string;
  createdAt: string;
  archived: true;
  archivedAt: string;
}[];

const getArchivedProjectList = (token: string) =>
  axios
    .get<AxiosRtnTyp>(myRoutes.archivesListApi.path, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export default getArchivedProjectList;
