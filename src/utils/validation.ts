export const checkEmailFormat = (value: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
};

export const checkPasswordFormat = (password: string) => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("비밀번호는 최소 8자 이상이어야 합니다.");
  }

  if (!/[A-Za-z]/.test(password)) {
    errors.push("비밀번호에 최소 한 개 이상의 영문자가 포함되어야 합니다.");
  }

  if (!/\d/.test(password)) {
    errors.push("비밀번호에 최소 한 개 이상의 숫자가 포함되어야 합니다.");
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("비밀번호에 최소 한 개 이상의 특수문자(!@#$%^&*)가 포함되어야 합니다.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
