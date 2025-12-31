import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { useLaptops, useLaptop } from "../../../api/laptops/useLaptops";
jest.mock("../../../api/laptops/useLaptops", () => ({
  useLaptops: jest.fn(),
  useLaptop: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(),
  Stack: {
    Screen: jest.fn(() => null),
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
import Laptops from "../../../app/(tabs)/(products)/laptops";
import LaptopDetails from "../../../app/(tabs)/(products)/laptopDetails/[id]";

describe("Laptops Flow", () => {
  const mockPush = jest.fn();
  const mockBack = jest.fn();
  const mockRefetch = jest.fn();

  const mockLaptopData = [
    {
      _id: "101",
      name: "MacBook Pro",
      price: 1999,
      description: "M3 Chip",
      image: "img1",
    },
    {
      _id: "102",
      name: "Dell XPS",
      price: 1499,
      description: "Infinity Edge",
      image: "img2",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockPush, back: mockBack });
  });

  // --- Laptops List Tests ---
  describe("Laptops Screen", () => {
    it("renders loading state", () => {
      useLaptops.mockReturnValue({ isLoading: true });
      const { getByType } = render(<Laptops />);
      expect(render(<Laptops />).toJSON().type).toBe("Loading");
    });

    it("renders error state with a retry button", () => {
      useLaptops.mockReturnValue({
        isLoading: false,
        error: true,
        refetch: mockRefetch,
      });
      const { getByText } = render(<Laptops />);

      const errorBtn = getByText("Error loading laptops");
      fireEvent.press(errorBtn);
      expect(mockRefetch).toHaveBeenCalled();
    });

    it("renders laptop list and handles navigation to phones", () => {
      useLaptops.mockReturnValue({
        data: mockLaptopData,
        isLoading: false,
        error: null,
        isFetching: false,
        refetch: mockRefetch,
      });

      const { getByText } = render(<Laptops />);

      const navBtn = getByText("Check our phones too");
      fireEvent.press(navBtn);
      expect(mockPush).toHaveBeenCalledWith("/(products)/phones");
    });
  });

  // --- Laptop Details Tests ---
  describe("LaptopDetails Screen", () => {
    it("shows 'Product not found' on error", () => {
      useLocalSearchParams.mockReturnValue({ id: "999" });
      useLaptop.mockReturnValue({ data: null, isLoading: false, error: true });

      const { getByText } = render(<LaptopDetails />);
      expect(getByText("Product not found")).toBeTruthy();
    });

    it("displays laptop details and navigates back", () => {
      useLocalSearchParams.mockReturnValue({ id: "101" });
      useLaptop.mockReturnValue({
        data: mockLaptopData[0],
        isLoading: false,
        error: null,
      });

      const { getByText } = render(<LaptopDetails />);

      expect(getByText("MacBook Pro")).toBeTruthy();
      expect(getByText("$1999")).toBeTruthy();
      expect(getByText("M3 Chip")).toBeTruthy();

      const backBtn = getByText("Go Back");
      fireEvent.press(backBtn);
      expect(mockBack).toHaveBeenCalled();
    });
  });
});
