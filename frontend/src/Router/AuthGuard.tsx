import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const signedIn = false;

  if (!signedIn && isPrivate) {
    // redirect to login
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    // redirect to home
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
