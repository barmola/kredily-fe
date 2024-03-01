// routes
import { PATH_DASHBOARD } from "src/routes/paths";
// components
import Iconify from "src/components/iconify";

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
        permission: ["emp"],
        children: [
          {
            id: "#1.1",
            title: "Leave History",
            path: PATH_DASHBOARD.emp.root,
            permission: ["emp"],
          },
          {
            id: "#1.1",
            title: "Request Leave",
            path: PATH_DASHBOARD.emp.add,
            permission: ["emp"],
          },
        ],
      },
      {
        title: "Leaves",
        path: PATH_DASHBOARD.hr.root,
        icon: ICONS.leaves,
        permission: ["hr"],
        children: [
          {
            id: "#1.1",
            title: "HR Leave History",
            path: PATH_DASHBOARD.hr.root,
            permission: ["hr"],
          },
        ],
      },
      {
        title: "Leaves",
        path: PATH_DASHBOARD.manager.root,
        icon: ICONS.leaves,
        permission: ["manager"],
        children: [
          {
            id: "#1.1",
            title: "Manager Leave History",
            path: PATH_DASHBOARD.manager.root,
            permission: ["manager"],
          },
        ],
      },
    ],
  },
];

export default navConfig;
