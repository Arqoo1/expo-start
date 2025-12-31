import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import Login from "../app/index";
import { useLogin } from "../api/auth/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

// mocks
jest.mock("../api/auth/useAuth", () => ({ useLogin: jest.fn() }));
jest.mock("@react-native-async-storage/async-storage", () => ({ setItem: jest.fn() }));
jest.spyOn(Alert, "alert");
jest.mock("expo-router", () => ({ useRouter: jest.fn() }));
jest.mock('formik', () => ({
  Formik: ({ children, onSubmit }) => children({
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    values: { email: "", password: "" },
    errors: {},
    touched: {},
    handleSubmit: () => onSubmit({ email: "test@example.com", password: "password123" }),
  }),
}));

describe("Login Component", () => {
  const mockMutate = jest.fn();
  const mockRouterReplace = jest.fn();

  beforeEach(() => {
    useLogin.mockReturnValue({ mutate: mockMutate, isPending: false });
    useRouter.mockReturnValue({ push: jest.fn(), replace: mockRouterReplace });
  });

  afterEach(() => jest.clearAllMocks());

  it("renders correctly", () => {
    const tree = render(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls handleLogin on form submit", async () => {
    const { getByTestId } = render(<Login />);
    const loginButton = getByTestId("login-button"); 

    await act(async () => {
      fireEvent.press(loginButton);
    });

    expect(mockMutate).toHaveBeenCalledWith(
      { email: "test@example.com", password: "password123" },
      expect.any(Object)
    );
  });
});
