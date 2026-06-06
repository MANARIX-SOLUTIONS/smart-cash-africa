import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PageSkeleton } from "@/components/ui/Skeleton";

export function PublicRoute() {
  const { user, isOnboarded, isLoading } = useAuth();

  if (isLoading) return <PageSkeleton />;

  if (user && isOnboarded) {
    return <Navigate to="/dashboard" replace />;
  }

  if (user && !isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}
