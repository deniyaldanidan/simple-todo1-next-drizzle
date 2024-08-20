const myRoutes = {
  signIn: {
    path: "/sign-in",
  },
  signUp: {
    path: "/sign-up",
  },
  home: {
    path: "/",
  },
  signUpApi: {
    path: "/api/auth/sign-up",
  },
  signInApi: {
    path: "/api/auth/sign-in",
  },
  /*
  refreshApi: {
    path: "/api/auth/refresh",
  },*/
  appHome: {
    path: "/web",
  },
  todayApi: {
    path: "/api/projects/today",
  },
  archives: {
    path: "/web/archives",
  },
  archivesListApi: {
    path: "/api/projects/archives/list",
  },
  addProject: {
    path: "/web/projects/add",
  },
  projectListApi: {
    path: "/api/projects/list",
  },
  getProjectApi: {
    path: (projectId: number) => `/api/projects/get/${projectId}`,
  },
  getProjectBasicApi: {
    path: (projectId: number) => `/api/projects/get/basic/${projectId}`,
  },
  viewProject: {
    path: (projectId: number) => `/web/projects/view/${projectId}`,
  },
  editProject: {
    path: (projectId: number) => `/web/projects/edit/${projectId}`,
  },
  userInfo: {
    path: "/user",
  },
  userInfoAPI: {
    path: "/api/user/info",
  },
  editUserInfo: {
    path: "/user/edit",
  },
  changePassword: {
    path: "/user/change-password",
  },
  deleteAccount: {
    path: "/user/delete-account",
  },
};

export default myRoutes;
