import axios from "axios";
import myRoutes from "../myRoutes";

export type GetProjectListReturn = {
  projectId: number;
  projectName: string;
  projectColorCode: string;
}[];

const getProjectList = (token: string) =>
  axios
    .get<GetProjectListReturn>(myRoutes.projectListApi.path, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export default getProjectList;
