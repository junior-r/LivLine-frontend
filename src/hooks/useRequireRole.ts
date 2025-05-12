import { useAuthStore } from "@/store/auth/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useRequireRole() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const isAllowed = user?.role === "admin";

  useEffect(() => {
    if (!isAllowed) {
      navigate("/");
    }
  }, [navigate, isAllowed]);
}
