import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import * as RootLayoutModule from "../app/_layout"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVerify } from "../api/auth/useAuth";
import { useRouter } from "expo-router";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock("../api/auth/useAuth", () => ({
  useVerify: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  Stack: Object.assign(({ children }) => <>{children}</>, {
    Screen: () => null,
  }),
}));

jest.mock("../interceptors/base.interceptor", () => () => null);

describe("RootLayout", () => {
  const mockReplace = jest.fn();
  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    if (RootLayoutModule.resetAuthFlag) {
      RootLayoutModule.resetAuthFlag();
    }
    
    useRouter.mockReturnValue({ replace: mockReplace });
    useVerify.mockReturnValue({ refetch: mockRefetch });
  });

  it("redirects to tabs if token is valid", async () => {
    AsyncStorage.getItem.mockResolvedValue("valid-token");
    mockRefetch.mockResolvedValue({ 
      data: { user: { id: 1, name: "Test User" } } 
    });

    const RootLayout = RootLayoutModule.default;
    render(<RootLayout />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/(tabs)");
    });
  });

  it("removes token if user verification fails", async () => {
    AsyncStorage.getItem.mockResolvedValue("bad-token");
    mockRefetch.mockResolvedValue({ data: null });

    const RootLayout = RootLayoutModule.default;
    render(<RootLayout />);

    await waitFor(() => {
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith("token");
    });
  });
});