import axios from "axios";
import myRoutes from "../myRoutes";

type AxiosRtnTyp = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
};

const getUserInfo = (token: string) =>
  axios
    .get<AxiosRtnTyp>(myRoutes.userInfoAPI.path, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export default getUserInfo;
