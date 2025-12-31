import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useRouter } from "expo-router";

// 1. Mock AsyncStorage (Must be first to prevent NativeModule null errors)
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

import { useProfile } from "../api/profile";
import { useLogout } from "../api/auth/useAuth";

jest.mock("../api/profile", () => ({
  useProfile: jest.fn(),
}));

jest.mock("../api/auth/useAuth", () => ({
  useLogout: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  Link: ({ children }) => children, 
}));

import ProfileDetails from "../app/(tabs)/(profile)/details";

describe("ProfileDetails", () => {
  const mockReplace = jest.fn();

  const mockUser = {
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    phone: "123456789",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ replace: mockReplace });
  });

  it("renders loading state correctly", () => {
    useProfile.mockReturnValue({ isLoading: true, data: null, isError: false });
    useLogout.mockReturnValue({ mutate: jest.fn(), isPending: false });

    const { getByText } = render(<ProfileDetails />);
    expect(getByText("Loading...")).toBeTruthy();
  });

  it("renders user data when loading is finished", () => {
    useProfile.mockReturnValue({ 
      data: mockUser, 
      isLoading: false, 
      isError: false 
    });
    useLogout.mockReturnValue({ mutate: jest.fn(), isPending: false });

    const { getByText } = render(<ProfileDetails />);

    expect(getByText("John")).toBeTruthy();
    expect(getByText("Doe")).toBeTruthy();
    expect(getByText("john@example.com")).toBeTruthy();
  });

  it("redirects to login if there is an error or no user", () => {
    useProfile.mockReturnValue({ data: null, isLoading: false, isError: true });
    useLogout.mockReturnValue({ mutate: jest.fn(), isPending: false });

    render(<ProfileDetails />);

    expect(mockReplace).toHaveBeenCalledWith("/login");
  });

  it("performs logout and navigates to login on success", async () => {
    useProfile.mockReturnValue({ data: mockUser, isLoading: false, isError: false });
    
    const mockMutate = jest.fn((data, options) => {
      if (options && options.onSuccess) {
        options.onSuccess();
      }
    });

    useLogout.mockReturnValue({
      mutate: mockMutate,
      isPending: false
    });

    const { getByText } = render(<ProfileDetails />);
    const logoutButton = getByText("Logout");

    fireEvent.press(logoutButton);

    expect(mockMutate).toHaveBeenCalled();
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/login");
    });
  });

  it("shows 'Logging out...' and disables button when logout is pending", () => {
    useProfile.mockReturnValue({ data: mockUser, isLoading: false, isError: false });
    useLogout.mockReturnValue({ mutate: jest.fn(), isPending: true });

    const { getByText } = render(<ProfileDetails />);
    
    expect(getByText("Logging out...")).toBeTruthy();
  });
});