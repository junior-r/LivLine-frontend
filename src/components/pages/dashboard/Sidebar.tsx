import type { User } from "@/types/auth/user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ArrowLeftIcon, UsersIcon, SettingsIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import LogoutBtn from "@/components/blocks/LogoutBtn";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  user: User | null;
};

type MenuItem = {
  name: string;
  icon: ReactNode;
  asLink: boolean;
  path: string;
  callBack?: () => void;
};

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <SettingsIcon />,
    asLink: true,
  },
  {
    name: "Usuarios",
    path: "/dashboard/users",
    icon: <UsersIcon />,
    asLink: true,
  },
];

function AppSidebar({ user }: Props) {
  const location = useLocation();
  const isActive = (currentPath: string, itemPath: string) => {
    return currentPath === itemPath;
  };
  const activeClassName = "font-bold text-blue-500";

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuButton asChild className={`flex items-center gap-2`}>
              <Link to="/">
                <ArrowLeftIcon />
                <span>Inicio</span>
              </Link>
            </SidebarMenuButton>
            <Separator />
            {menuItems.map((item, idx) => (
              <SidebarMenuItem key={idx}>
                {item.asLink ? (
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center gap-2 ${
                      isActive(location.pathname, item.path)
                        ? activeClassName
                        : ""
                    }`}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter className="flex-row items-center justify-between gap-4">
        <Link
          to={"/account/profile"}
          className="flex-1 flex gap-2 justify-center items-center transition rounded-lg hover:bg-white dark:hover:bg-gray-700/50"
        >
          <Avatar title={user?.name}>
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
          <small className="py-2 px-4 w-full block text-center">
            {user?.name}
          </small>
        </Link>
        <LogoutBtn showIcon={true} />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
