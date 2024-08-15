import axios from "axios";
import myRoutes from "../myRoutes";

type axiosRtnTyp = {
  projectId: number;
  projectName: string;
  projectColorCode: string;
}[];

const getProjectList = (token: string) =>
  axios
    .get<axiosRtnTyp>(myRoutes.projectListApi.path, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export default getProjectList;
