import React from "react";
import { ErrorMessage, useField } from "formik";
export default function SignUpInput({ placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div>
      <input
        type={field.type}
        name={field.name}
        required
        autoComplete="off"
        placeholder={placeholder}
        {...field}
        {...props}
      />
      <div id="errorMessageSignUpMail">
        {
             meta.touched && meta.error && <ErrorMessage name={field.name}/>
        }
      </div>
    </div>
  );
}
