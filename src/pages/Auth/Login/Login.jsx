import { useState } from "react";
import "./Login.css";
import { Formik, Form } from "formik"; // Importing Formik form library
import { Link, useNavigate } from "react-router-dom"; // Using Link and useNavigate from react-router-dom
import LoginValidationSchema from "../../../validations/LoginValidations"; // Importing validation schema
import InputField from "../../../components/InputField/InputField"; // Custom input field component
import { LoginFun } from "../../../utils/AuthFunctions"; // Function for handling login
import { ScaleLoader } from "react-spinners"; // Loader component
import { UseAuthContext } from "../../../data/Context/UserState"; // Context for user authentication

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [isLoading, setIsLoading] = useState(false); // State for loader display
  const { setUser } = UseAuthContext(); // Getting setUser function from authentication context
  const navigate = useNavigate(); // Hook for navigation

  const initialValues = {
    email: "",
    password: "",
  };

  const hangleSubmit = async (values, resetForm) => {
    setIsLoading(true); // Set loading state to true
    const User = await LoginFun(values); // Calling login function
    console.log(User);
    if (User) {
      await setUser(User); // Set user context if login succeeds
      navigate("/Home"); // Navigate to Home page
    }
    resetForm(); // Reset form fields after submission
    setIsLoading(false); // Set loading state to false
  };

  return (
    <>
      <h1 className="h1">Login</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => hangleSubmit(values, resetForm)}
        validationSchema={LoginValidationSchema} // Applying validation schema to form
      >
        <Form
          id="loginForm"
          className="w-100 d-flex justify-content-center align-items-center flex-column gap-2 rounded-3 p-2"
        >
          {/* Input Fields */}
          <InputField type="email" name="email" label="Email" />
          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
          />

          {/* Show and Hide password functionality */}
          <p className="align-self-start mx-2">
            <input
              type="checkbox"
              name="passwordVisible"
              id="passView"
              style={{ verticalAlign: "center" }}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="passView" className="m-2 form-check-label">
              Show Password
            </label>
          </p>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            {isLoading ? <ScaleLoader color="white" /> : "Sign-Up"}{" "}
          </button>
          {/* Other Fields */}
          <div className="w-100 d-flex justify-content-center align-items-center flex-column gap-2">
            <a href="">Forget Password</a>
            <p>or</p>
            <hr className="border-bottom border-primary w-75" />
            <p>
              Don&lsquo;t have an account?
              <Link to="/Sign-Up" className="px-2">
                Sign-Up
              </Link>
            </p>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
