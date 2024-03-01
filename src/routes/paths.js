// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
};
export const PATH_PAGE = {
  page404: "/404",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  emp: {
    root: path(ROOTS_DASHBOARD, `/emp-dashboard/leave/list`),
    add: path(ROOTS_DASHBOARD, `/emp-dashboard/leave/add`),
    edit: (leaveId) => path(ROOTS_DASHBOARD, `/emp-dashboard/leave/edit/${leaveId}`),
  },
  hr: {
    root: path(ROOTS_DASHBOARD, `/hr-dashboard/leave/list`),
  },
  manager: {
    root: path(ROOTS_DASHBOARD, `/manager-dashboard/leave/list`),
  },
};
