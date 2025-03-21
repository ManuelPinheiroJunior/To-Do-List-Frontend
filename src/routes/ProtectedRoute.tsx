import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children : any  }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
