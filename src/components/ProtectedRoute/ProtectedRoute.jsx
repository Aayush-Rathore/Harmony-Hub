import { Navigate } from "react-router-dom";
import { UseAuthContext } from "../../data/Context/UserState";

// This component is used to protect routes based on user authentication status
// It receives an Element prop which represents the component to render if the user is authenticated
// If the user is not authenticated, it redirects to the '/' route
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ Element }) => {
  const { UserAuth } = UseAuthContext(); // Accessing user authentication state from context

  // If the user is not authenticated, redirect to the '/' route using the Navigate component
  if (!UserAuth) return <Navigate to="/" />;

  // If the user is authenticated, render the provided Element (component)
  return Element;
};

export default ProtectedRoute;
