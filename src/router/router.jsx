import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { UseAuthContext } from "../data/Context/UserState";
import { lazy, Suspense } from "react";

// Lazy-loaded components using React.lazy
const Auth = lazy(() => import("../pages/Auth/Auth"));
const Login = lazy(() => import("../pages/Auth/Login/Login"));
const SignUp = lazy(() => import("../pages/Auth/Signup/Signup"));
const Home = lazy(() => import("../pages/Home/Home"));
const Loader = lazy(() => import("../components/Loader/Loader"));

const Router = () => {
  const { UserAuth } = UseAuthContext();

  // Create a BrowserRouter with an array of route objects
  const router = createBrowserRouter([
    // If the user is authenticated, show the ProtectedRoute with Home component
    UserAuth
      ? {
          path: "/",
          element: (
            <Suspense fallback={<Loader />}>
              <ProtectedRoute Element={<Home />} />
            </Suspense>
          ),
        }
      : // If the user is not authenticated, show the Auth component with Login and SignUp as children
        {
          path: "/",
          element: (
            <Suspense fallback={<Loader />}>
              <Auth />
            </Suspense>
          ),
          children: [
            {
              path: "/",
              element: (
                <Suspense fallback={<Loader />}>
                  <Login />
                </Suspense>
              ),
            },
            {
              path: "/Sign-Up",
              element: (
                <Suspense fallback={<Loader />}>
                  <SignUp />
                </Suspense>
              ),
            },
          ],
        },
  ]);

  // Wrap the BrowserRouter with the RouterProvider and return the JSX
  return <RouterProvider router={router} />;
};

export default Router;
