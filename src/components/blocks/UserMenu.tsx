import type { User } from "@/types/auth/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router";
import LogoutBtn from "./LogoutBtn";
import { SettingsIcon, UserIcon } from "lucide-react";

type Props = {
  user: User;
};

const navItems = [
  {
    name: "Perfil",
    link: "/account/profile",
    icon: <UserIcon />,
  },
];

export default function UserMenu({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar title={user.name}>
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navItems.map((item, idx) => (
          <DropdownMenuItem key={idx}>
            <Link to={item.link} className="flex gap-2 items-center">
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        {user.role === "admin" && (
          <DropdownMenuItem>
            <Link to="/dashboard" className="flex gap-2 items-center">
              <SettingsIcon />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
