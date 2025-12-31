import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePhones, usePhone } from "../../../api/phones/usePhones"; // Adjust path
import { api } from "../../../api/axios"; // Adjust path

// 1. Mock Axios
jest.mock("../api/axios", () => ({
  api: {
    get: jest.fn(),
  },
}));

// 2. Setup a fresh QueryClient for every test
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Phones API Hooks", () => {
  const mockPhones = [
    { _id: "1", name: "iPhone 15", price: 999 },
    { _id: "2", name: "Galaxy S24", price: 899 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("usePhones", () => {
    it("fetches all phones successfully", async () => {
      // Arrange: Mock successful response
      api.get.mockResolvedValue({ data: mockPhones });

      // Act
      const { result } = renderHook(() => usePhones(), {
        wrapper: createWrapper(),
      });

      // Assert: Wait for success state
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(api.get).toHaveBeenCalledWith("/products?type=phone");
      expect(result.current.data).toEqual(mockPhones);
    });
  });

  describe("usePhone", () => {
    it("finds and returns a single phone by ID", async () => {
      api.get.mockResolvedValue({ data: mockPhones });

      const { result } = renderHook(() => usePhone("2"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data.name).toBe("Galaxy S24");
      expect(result.current.data._id).toBe("2");
    });

    it("throws an error if phone ID does not exist in list", async () => {
      api.get.mockResolvedValue({ data: mockPhones });

      const { result } = renderHook(() => usePhone("999"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error.message).toBe("Phone not found");
    });

    it("does not run if ID is missing (enabled check)", () => {
        const { result } = renderHook(() => usePhone(null), {
          wrapper: createWrapper(),
        });
  
        // Should stay in 'pending' status because 'enabled' is false
        expect(result.current.fetchStatus).toBe("idle");
        expect(api.get).not.toHaveBeenCalled();
      });
  });
});