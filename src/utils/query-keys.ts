const queryKeys = {
  userInfo: ["user", "info"],
  projectList: ["project", "list"],
  today: ["project", "today"],
  due: ["project", "due"],
  projectView: (id: number | string) =>
    ["project", { id: `${id}` }, "view"] as const,
  editView: (id: number | string) =>
    ["project", { id: `${id}` }, "edit"] as const,
  archivesList: ["archives", "list"],
  // archivedProject: (id: number | string) => ["archives", { id: `${id}` }],
} as const;

export default queryKeys;
