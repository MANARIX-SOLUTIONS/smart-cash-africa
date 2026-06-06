import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  to: string;
  label: string;
}

export function BackLink({ to, label }: BackLinkProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}
