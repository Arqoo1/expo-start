import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRegister } from "../../api/auth/useAuth";
import { api } from "../../api/axios";

// Mock the API
jest.mock("../api/axios", () => ({
  api: { post: jest.fn() },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useRegister Hook", () => {
  it("submits the correct registration data to the server", async () => {
    const newUser = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    // Mock a successful response
    api.post.mockResolvedValue({ data: { message: "User created" } });

    const { result } = renderHook(() => useRegister(), {
      wrapper: createWrapper(),
    });

    // Trigger the mutation
    result.current.mutate(newUser);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verify the API call
    expect(api.post).toHaveBeenCalledWith("/auth/register", newUser);
    expect(result.current.data.message).toBe("User created");
  });
});
