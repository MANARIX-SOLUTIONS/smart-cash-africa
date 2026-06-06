import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PageSkeleton } from "@/components/ui/Skeleton";
import { lpLinks } from "@/lib/links";

export function HomeRoute() {
  const { user, isOnboarded, isLoading } = useAuth();

  if (isLoading) return <PageSkeleton />;

  if (user && isOnboarded) {
    return <Navigate to="/dashboard" replace />;
  }

  if (user) {
    return <Navigate to="/onboarding" replace />;
  }

  if (lpLinks.isExternal) {
    window.location.replace(lpLinks.home);
    return <PageSkeleton />;
  }

  return <Navigate to="/login" replace />;
}
