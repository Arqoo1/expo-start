import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useVerify } from "../../api/auth/useAuth";
import { api } from "../../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("../api/axios", () => ({ api: { get: jest.fn() } }));
jest.mock("@react-native-async-storage/async-storage", () => ({ getItem: jest.fn() }));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe("useVerify Hook", () => {
  it("throws error if no token is found", async () => {
    AsyncStorage.getItem.mockResolvedValue(null);

    const { result } = renderHook(() => useVerify(), { wrapper: createWrapper() });
    
    // Manually trigger refetch since enabled is false
    result.current.refetch();

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error.message).toBe("No token");
  });

  it("calls verify API if token exists", async () => {
    AsyncStorage.getItem.mockResolvedValue("valid-token");
    api.get.mockResolvedValue({ data: { user: { id: 1 } } });

    const { result } = renderHook(() => useVerify(), { wrapper: createWrapper() });
    result.current.refetch();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(api.get).toHaveBeenCalledWith("/auth/verify");
    expect(result.current.data.user.id).toBe(1);
  });
});