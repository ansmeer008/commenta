import { useState } from "react";

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  // 값 직접 업데이트 (object나 number 등 input 이벤트 아닌 경우 사용)
  const setFieldValue = <K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const reset = () => setValues(initialValues);

  return {
    values,
    setFieldValue, // 새로 추가
    reset,
  };
};
