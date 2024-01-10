import { Outlet } from "react-router-dom";

// The Auth component acts as a layout or container for other routes/components.
const Auth = () => {
  return (
    // A container with flexbox styles to center its contents vertically and horizontally
    <div className="d-flex justify-content-center align-items-center">
      {/* A container to hold forms or components related to authentication */}
      <div className="container formContainer w-100 d-flex justify-content-center align-items-center flex-column gap-3">
        {/* Outlet component provided by React Router to render child routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
