import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import SignUp from "../pages/Auth/Signup/Signup";
import Login from "../pages/Auth/Login/Login";
import Home from "../pages/Home/Home";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/Sign-Up",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "/Home",
      element: <ProtectedRoute Element={<Home />} />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
