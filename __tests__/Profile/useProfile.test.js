import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProfile } from "../../api/profile"; // Adjust path
import { api } from "../../api/axios";

jest.mock("../../api/axios", () => ({
  api: { get: jest.fn() }
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useProfile Hook", () => {
  it("fetches the user profile successfully", async () => {
    const mockProfile = { name: "John", email: "john@test.com" };
    api.get.mockResolvedValue({ data: mockProfile });

    const { result } = renderHook(() => useProfile(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(api.get).toHaveBeenCalledWith("/profile");
    expect(result.current.data).toEqual(mockProfile);
  });
});