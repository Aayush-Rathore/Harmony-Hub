/* eslint-disable react/prop-types */ // Disables warnings related to prop-types for this component
import { useField, ErrorMessage } from "formik"; // Imports required hooks and components from Formik

const InputField = ({ label, as, children, ...props }) => {
  const [field, meta] = useField(props); // Retrieves Field and Meta props from Formik using useField

  // Defines the input component based on the 'as' prop (either input or select)
  const inputComponent =
    as === "select" ? (
      <select
        {...field}
        {...props}
        name={props.name}
        className={`form-select ${
          meta.touched && meta.error ? "is-invalid" : ""
        }`}
      >
        {children}
      </select>
    ) : (
      <input
        {...field}
        {...props}
        className={`form-control ${
          meta.touched && meta.error ? "is-invalid" : ""
        }`}
        name={props.name}
        placeholder={props.name}
      />
    );

  // Renders a form field with a label and error message if any
  return (
    <div className="form-floating m-2 w-100">
      {inputComponent}
      <label htmlFor="floatingInput">{label}</label>
      <ErrorMessage
        name={props.name}
        component="div"
        className="invalid-feedback"
      />
    </div>
  );
};

export default InputField; // Exports the InputField component for use in other parts of the application
