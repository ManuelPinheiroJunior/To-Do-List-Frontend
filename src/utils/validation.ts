export const validateSignUp = (data: {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}) => {
  const errors: Record<string, string> = {};

  if (!/^[A-Za-zÀ-ÿ ]{2,}$/.test(data.firstName)) {
    errors.firstName = "First name must have at least 2 letters.";
  }

  if (!/^[A-Za-zÀ-ÿ ]{2,}$/.test(data.lastName)) {
    errors.lastName = "Last name must have at least 2 letters.";
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    errors.email = "Enter a valid email.";
  }

  const today = new Date().toISOString().split("T")[0];
  if (!data.dateOfBirth || data.dateOfBirth > today) {
    errors.dateOfBirth = "Invalid birth date.";
  }

  if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(data.password)) {
    errors.password = "Must be 8+ chars, 1 uppercase, 1 number, 1 special.";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return Object.keys(errors).length > 0 ? errors : null;
};
