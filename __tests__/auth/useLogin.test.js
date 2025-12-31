import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLogin } from "../../api/auth/useAuth"; 
import { api } from "../../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("../../api/axios", () => ({
  api: { post: jest.fn() }
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn()
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useLogin Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("trims inputs and saves token/user on successful login", async () => {
    const rawInput = { 
      email: "  user@test.com  ", 
      password: "  secret123  " 
    };
    
    const mockResponse = { 
      token: "fake-jwt-token", 
      user: { id: "1", email: "user@test.com" } 
    };

    api.post.mockResolvedValue({ data: mockResponse });

    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

    result.current.mutate(rawInput);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(api.post).toHaveBeenCalledWith("/auth/login", {
      email: "user@test.com",
      password: "secret123"
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith("token", "fake-jwt-token");
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify(mockResponse.user));
  });

  it("handles login failure", async () => {
    api.post.mockRejectedValue(new Error("Invalid credentials"));

    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

    result.current.mutate({ email: "wrong@test.com", password: "123" });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error.message).toBe("Invalid credentials");
    
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });
});