import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLogout } from "../../api/auth/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  multiRemove: jest.fn(),
}));

// We need a real QueryClient to verify it gets cleared
const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useLogout Hook", () => {
  it("clears storage and query cache on logout", async () => {
    // Spy on the clear method
    const clearSpy = jest.spyOn(queryClient, "clear");

    const { result } = renderHook(() => useLogout(), { wrapper });
    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verify storage removal
    expect(AsyncStorage.multiRemove).toHaveBeenCalledWith(["token", "user"]);
    
    // Verify cache clearing
    expect(clearSpy).toHaveBeenCalled();
  });
});