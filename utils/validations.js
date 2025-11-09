import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have 8+ chars, 1 uppercase, 1 number"
    )
    .required("Password is required"),
});

export const RegisterSchema = Yup.object({
  name: Yup.string().max(30, "Name is too long").required("Name is required"),
  surname: Yup.string()
    .max(30, "Surname is too long")
    .required("Surname is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9 ]{8,20}$/, "Phone number must be 8-20 characters")
    .required("Phone is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have 8+ chars, 1 uppercase, 1 number"
    )
    .required("Password is required"),
});

export const EditProfileSchema = Yup.object({
  name: Yup.string().max(30, "Name is too long").required("Name is required"),
  surname: Yup.string()
    .max(30, "Surname is too long")
    .required("Surname is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(
      /^\+?[0-9 ]{8,20}$/,
      "Phone must be 8-20 digits and may include spaces"
    )
    .required("Phone is required"),
});
