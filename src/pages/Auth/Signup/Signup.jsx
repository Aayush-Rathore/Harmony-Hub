// Importing necessary dependencies and styles
import "./Signup.css";
import { Formik, Form } from "formik"; // Formik library for form handling
import { Link } from "react-router-dom"; // React Router's Link component for navigation
import SignUpValidationSchema from "../../../validations/SignUpValidations"; // Validation schema for Sign-Up form
import InputField from "../../../components/InputField/InputField"; // Custom InputField component
import { SignUpFun } from "../../../utils/AuthFunctions"; // Function for handling Sign-Up logic
import { useState } from "react"; // React's useState hook for managing state
import { ScaleLoader } from "react-spinners"; // Loading spinner component

// SignUp component
const SignUp = () => {
  // State variables using useState hook
  const [isLoading, setIsLoading] = useState(false); // To manage loading state
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Function to handle form submission
  const hangleSubmit = async (values, resetForm) => {
    setIsLoading(true); // Set loading state to true
    await SignUpFun(values); // Call function for Sign-Up logic
    resetForm(); // Reset form fields after submission
    setIsLoading(false); // Set loading state back to false after submission
  };

  return (
    <>
      {/* Sign-Up Form */}
      <h1 className="h1">Sign-Up</h1>
      <div className="bg-dark"></div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => hangleSubmit(values, resetForm)}
        validationSchema={SignUpValidationSchema} // Validation schema for form fields
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
          <InputField
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            label="Confirm Password"
          />

          {/* Show and Hide password functionality */}
          <p className="align-self-start mx-2">
            <input
              type="checkbox"
              name="passwordVisible"
              id="passView"
              style={{ verticalAlign: "center" }}
              onChange={() => setShowPassword(!showPassword)} // Toggle password visibility
            />
            <label htmlFor="passView" className="m-2 form-check-label">
              Show Password
            </label>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ width: "50px" }}
          >
            {isLoading ? <ScaleLoader color="white" /> : "Sign-Up"}{" "}
            {/* Conditional rendering of button content based on loading state */}
          </button>

          {/* Other Fields */}
          <div className="w-100 d-flex justify-content-center align-items-center flex-column gap-1">
            <p>or</p>
            {/* Link to login page */}
            <p>
              Already have an account
              <Link to="/" className="px-2">
                Login
              </Link>
            </p>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default SignUp; // Exporting SignUp component
