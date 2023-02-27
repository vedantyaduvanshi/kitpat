import React from "react";
import { ErrorMessage, useField } from "formik";
export default function LoginInputs({ placeholder, ...props }) {
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
      <div id="errorMessageLoginMail">
        {
             meta.touched && meta.error && <ErrorMessage name={field.name}/>
        }
      </div>
    </div>
  );
}
