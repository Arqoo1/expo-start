import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLogout } from "../../api/auth/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  multiRemove: jest.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useLogout Hook", () => {
  it("clears storage and query cache on logout", async () => {
    const clearSpy = jest.spyOn(queryClient, "clear");

    const { result } = renderHook(() => useLogout(), { wrapper });
    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(AsyncStorage.multiRemove).toHaveBeenCalledWith(["token", "user"]);
    
    expect(clearSpy).toHaveBeenCalled();
  });
});