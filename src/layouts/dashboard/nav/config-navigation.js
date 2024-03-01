// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const icon = (name) => <Iconify icon={name} width={22} height={22} />;

const ICONS = {
  leaves: icon("solar:battery-full-minimalistic-bold-duotone"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "Leaves",
        path: PATH_DASHBOARD.emp.root,
        icon: ICONS.leaves,
        roles: ["emp"],
        children: [
          {
            id: "#1.1",
            title: "Leave History",
            path: PATH_DASHBOARD.emp.root,
            roles: ["emp"],
          },
          {
            id: "#1.1",
            title: "Request Leave",
            path: PATH_DASHBOARD.emp.add,
            roles: ["emp"],
          },
        ],
      },
      {
        title: "Leaves",
        path: PATH_DASHBOARD.hr.root,
        icon: ICONS.leaves,
        roles: ["hr"],
        children: [
          {
            id: "#1.1",
            title: "HR Leave History",
            path: PATH_DASHBOARD.hr.root,
            roles: ["hr"],
          },
        ],
      },
      {
        title: "Leaves",
        path: PATH_DASHBOARD.manager.root,
        icon: ICONS.leaves,
        roles: ["manager"],
        children: [
          {
            id: "#1.1",
            title: "Manager Leave History",
            path: PATH_DASHBOARD.manager.root,
            roles: ["manager"],
          },
        ],
      },
    ],
  },
];

export default navConfig;
