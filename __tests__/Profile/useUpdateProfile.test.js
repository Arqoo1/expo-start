import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUpdateProfile } from "../../api/profile"; // Adjust path
import { api } from "../../api/axios";

jest.mock("../api/axios", () => ({
  api: { put: jest.fn() }
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useUpdateProfile Hook", () => {
  it("sends a PUT request with updated profile data", async () => {
    const updatedData = {
      name: "Jane",
      surname: "Doe",
      email: "jane@test.com",
      phone: "123456789"
    };

    api.put.mockResolvedValue({ data: { success: true } });

    const { result } = renderHook(() => useUpdateProfile(), { wrapper: createWrapper() });

    // Trigger the update
    result.current.mutate(updatedData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verify the PUT call structure matches your hook's request logic
    expect(api.put).toHaveBeenCalledWith("/profile", {
      name: "Jane",
      surname: "Doe",
      email: "jane@test.com",
      phone: "123456789",
    });
  });
});