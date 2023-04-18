import { useState } from "react";

const useForm = (initialValues, validationFunction, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validationFunction(values);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values, setErrors);
      setValues(initialValues);
    } else {
      setErrors(validationErrors);
    }
  };
  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
