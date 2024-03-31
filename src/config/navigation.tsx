import { MdPerson, MdSettings, MdSpaceDashboard } from "react-icons/md";
import { FaDumpster, FaTruck } from "react-icons/fa";

export const categoryOfMenu = {
  SYSTEM_ADMIN: "admin",
  STS_MANAGER: "sts",
  LANDFILL_MANAGER: "landfill",
} as const;

export type menuCategory = (typeof categoryOfMenu)[keyof typeof categoryOfMenu];

export type NavigationItem = {
  id: string;
  title: string;
  url: string;
  icon: React.JSX.Element;
  menu: menuCategory;
};

export const navigationOptions: NavigationItem[] = [
  {
    id: "ecosyn-admin-analytics",
    title: "Analytics",
    url: "/dashboard/",
    icon: <MdSpaceDashboard />,
    menu: "admin",
  },
  {
    id: "ecosyn-admin-user-list",
    title: "User List",
    url: "/dashboard/userlist",
    icon: <MdPerson />,
    menu: "admin",
  },
  {
    id: "ecosyn-admin-vehicle-list",
    title: "Vehicle List",
    url: "/dashboard/admin-vehicle-list",
    icon: <FaTruck />,
    menu: "admin",
  },
  {
    id: "ecosyn-admin-sts-list",
    title: "STS List",
    url: "/dashboard/admin-sts-list",
    icon: <FaDumpster />,
    menu: "admin",
  },
  {
    id: "ecosyn-admin-profile-settings",
    title: "Profile Settings",
    url: "/dashboard/admin-profile-settings",
    icon: <MdSettings />,
    menu: "admin",
  },
];
