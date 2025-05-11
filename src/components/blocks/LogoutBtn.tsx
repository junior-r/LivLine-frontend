import { logout } from "@/actions/auth/logout";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

type Props = {
  showIcon?: boolean;
};

function LogoutBtn({ showIcon }: Props) {
  const setUser = useAuthStore((state) => state.setUser);

  const handleEvent = async () => {
    const res = await logout();

    if (res.status === 200) {
      setUser(null);
      return;
    }
    return;
  };

  if (showIcon) {
    return (
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={handleEvent}
        title="Logout"
        className="cursor-pointer"
      >
        <LogOutIcon />
      </Button>
    );
  } else {
    return (
      <Button
        onClick={handleEvent}
        title="Logout"
        size={"sm"}
        className="cursor-pointer w-full flex items-center gap-2"
      >
        <LogOutIcon />
        <span>Cerrar sesión</span>
      </Button>
    );
  }
}

export default LogoutBtn;
