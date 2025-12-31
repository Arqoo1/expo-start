import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import Register from "../app/register";
import { useRegister } from "../api/auth/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

// Mocks
jest.mock("../api/auth/useAuth", () => ({ useRegister: jest.fn() }));
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
}));
jest.spyOn(Alert, "alert");
jest.mock("expo-router", () => ({ useRouter: jest.fn() }));

jest.mock("formik", () => ({
  Formik: ({ children, onSubmit }) =>
    children({
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      values: { name: "", surname: "", email: "", phone: "", password: "" },
      errors: {},
      touched: {},
      handleSubmit: () =>
        onSubmit({
          name: "John",
          surname: "Doe",
          email: "john@example.com",
          phone: "1234567890",
          password: "password123",
        }),
    }),
}));

describe("Register Component", () => {
  const mockMutate = jest.fn();
  const mockRouterReplace = jest.fn();

  beforeEach(() => {
    useRegister.mockReturnValue({ mutate: mockMutate, isPending: false });
    useRouter.mockReturnValue({ push: jest.fn(), replace: mockRouterReplace });
  });

  afterEach(() => jest.clearAllMocks());

  it("renders correctly", () => {
    const tree = render(<Register />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls handleRegister on form submit", async () => {
    const { getByTestId } = render(<Register />);
    const registerButton = getByTestId("register-button"); 

    await act(async () => {
      fireEvent.press(registerButton);
    });

    expect(mockMutate).toHaveBeenCalledWith(
      {
        name: "John",
        surname: "Doe",
        email: "john@example.com",
        phone: "1234567890",
        password: "password123",
      },
      expect.any(Object)
    );
  });
});
