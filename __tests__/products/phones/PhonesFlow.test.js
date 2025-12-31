import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { usePhones, usePhone } from "../../../api/phones/usePhones";

jest.mock("../../../api/phones/usePhones", () => ({
  usePhones: jest.fn(),
  usePhone: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(),
  Stack: {
    Screen: () => null,
  },
}));

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaProvider: ({ children }) => <>{children}</>,
  SafeAreaView: ({ children }) => <>{children}</>,
}));

jest.mock("../../../constants/Dimensions", () => ({
  width: 400,
  height: 800,
}));
jest.mock("../../../components/Card", () => "Card");
jest.mock("../../../components/Loading", () => "Loading");

import Phones from "../../../app/(tabs)/(products)/phones";
import PhoneDetails from "../../../app/(tabs)/(products)/phoneDetails/[id]";

describe("Phones Flow", () => {
  const mockRouter = { back: jest.fn() };
  const mockPhones = [
    {
      _id: "1",
      name: "iPhone 15",
      price: 999,
      description: "Latest Apple phone",
    },
    {
      _id: "2",
      name: "Galaxy S24",
      price: 899,
      description: "Latest Samsung phone",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);
  });

  // --- Tests for Phones List ---
  describe("Phones List Screen", () => {
    it("renders loading state", () => {
      usePhones.mockReturnValue({ isLoading: true });
      const { getByTestId } = render(<Phones />);
      expect(render(<Phones />).toJSON().type).toBe("Loading");
    });

    it("renders a list of phones", () => {
      usePhones.mockReturnValue({
        data: mockPhones,
        isLoading: false,
        error: null,
        isFetching: false,
        refetch: jest.fn(),
      });

      const { getByText } = render(<Phones />);

      expect(usePhones).toHaveBeenCalled();
    });
  });

  // --- Tests for Phone Details ---
  describe("Phone Details Screen", () => {
    it("renders error state when product is not found", () => {
      useLocalSearchParams.mockReturnValue({ id: "999" });
      usePhone.mockReturnValue({ data: null, isLoading: false, error: true });

      const { getByText } = render(<PhoneDetails />);
      expect(getByText("Product not found")).toBeTruthy();
    });

    it("renders phone details correctly", () => {
      useLocalSearchParams.mockReturnValue({ id: "1" });
      usePhone.mockReturnValue({
        data: mockPhones[0],
        isLoading: false,
        error: null,
      });

      const { getByText } = render(<PhoneDetails />);

      expect(getByText("iPhone 15")).toBeTruthy();
      expect(getByText("$999")).toBeTruthy();
      expect(getByText("Latest Apple phone")).toBeTruthy();
    });

    it("navigates back when 'Go Back' is pressed", () => {
      useLocalSearchParams.mockReturnValue({ id: "1" });
      usePhone.mockReturnValue({
        data: mockPhones[0],
        isLoading: false,
        error: null,
      });

      const { getByText } = render(<PhoneDetails />);
      const backButton = getByText("Go Back");

      fireEvent.press(backButton);
      expect(mockRouter.back).toHaveBeenCalled();
    });
  });
});
