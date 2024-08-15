import axios from "axios";
import myRoutes from "../myRoutes";
import { intParser } from "../zod-valids";

type taskType = {
  id: number;
  name: string;
  note: string | null;
  done: boolean;
  createdAt: number;
  due: string | null;
};

type AxiosRtnTyp = {
  project: {
    id: number;
    name: string;
    desc: string | null;
    note: string | null;
    colorCode: string;
    createdAt: number;
  };
  tasks: Array<taskType>;
};

type QueryArgs = {
  token: string;
  projectId: string;
};

const getProject = ({ token, projectId }: QueryArgs) => {
  const parsedId = intParser.parse(projectId);
  return axios
    .get<AxiosRtnTyp>(myRoutes.getProjectApi.path(parsedId), {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export default getProject;
