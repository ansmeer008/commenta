import { useState } from "react";

type FormFields = Record<string, string>;

export const useForm = <T extends FormFields>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => setValues(initialValues);

  return {
    values,
    handleChange,
    reset,
  };
};
