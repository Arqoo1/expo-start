import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useProfile, useUpdateProfile } from "../../api/profile";
import EditProfile from "../../app/(tabs)/(profile)/edit";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("../../api/profile", () => ({
  useProfile: jest.fn(),
  useUpdateProfile: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQueryClient: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("EditProfile Component", () => {
  const mockBack = jest.fn();
  const mockRefetchQueries = jest.fn();
  const mockMutate = jest.fn();

  const mockUser = {
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    phone: "123456789",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ back: mockBack });
    useQueryClient.mockReturnValue({ refetchQueries: mockRefetchQueries });
    useProfile.mockReturnValue({ data: mockUser, isLoading: false });
    useUpdateProfile.mockReturnValue({ mutate: mockMutate, isPending: false });
  });

  it("submits the form and navigates back on success", async () => {
    mockMutate.mockImplementation((values, options) => {
      options.onSuccess();
    });

    const { getByPlaceholderText, getByText } = render(<EditProfile />);
    const nameInput = getByPlaceholderText("Name");
    const saveButton = getByText("Save");

    await act(async () => {
      fireEvent.changeText(nameInput, "Jane");
    });

    await act(async () => {
      fireEvent.press(saveButton);
    });

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
      expect(mockRefetchQueries).toHaveBeenCalledWith({ queryKey: ["profile"] });
      expect(mockBack).toHaveBeenCalled();
    });
  });

it("shows 'Saving...' and disables button during pending state", () => {
    useUpdateProfile.mockReturnValue({ mutate: mockMutate, isPending: true });

    const { getByText } = render(<EditProfile />);
    
    const buttonText = getByText("Saving...");
    expect(buttonText).toBeTruthy();


    const button = buttonText.parent; 

    const isDisabled = 
      button.props.disabled === true || 
      button.props.accessibilityState?.disabled === true;

    expect(isDisabled).toBe(true);
  });
});