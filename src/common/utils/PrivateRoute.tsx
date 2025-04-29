import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const { user, loading } = useAutt();

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
