import axios from "axios";
import myRoutes from "../myRoutes";

type axiosReturnType = {
  tasks: {
    taskInfo: {
      id: number;
      name: string;
      note: string | null;
      done: boolean;
      createdAt: number;
      due: string | null;
    };
    projectId: number;
    projectName: string;
    colorCode: string;
  }[];
};

const getDue = (token: string) => {
  return axios
    .get<axiosReturnType>(myRoutes.dueApi.path, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export default getDue;
