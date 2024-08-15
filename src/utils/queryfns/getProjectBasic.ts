import axios from "axios";
import myRoutes from "../myRoutes";
import { intParser } from "../zod-valids";

type AxiosRtnTyp = {
  project: {
    id: number;
    name: string;
    desc: string | null;
    note: string | null;
    colorCode: string;
  };
};

type QueryArgs = {
  token: string;
  projectId: string;
};

const getProjectBasic = ({ token, projectId }: QueryArgs) => {
  const parsedId = intParser.parse(projectId);
  return axios
    .get<AxiosRtnTyp>(myRoutes.getProjectBasicApi.path(parsedId), {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export default getProjectBasic;
