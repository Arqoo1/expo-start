import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLaptops, useLaptop } from "../../../api/laptops/useLaptops"; 
import { api } from "../../../api/axios"; 

jest.mock("../../../api/axios", () => ({
  api: {
    get: jest.fn(),
  },
}));


const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, 
        gcTime: 0, 
      },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Laptops API Hooks", () => {
  const mockLaptops = [
    { _id: "L1", name: "MacBook Pro", price: 2000 },
    { _id: "L2", name: "Dell XPS", price: 1500 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useLaptops", () => {
    it("successfully fetches the list of laptops", async () => {
      api.get.mockResolvedValue({ data: mockLaptops });

      const { result } = renderHook(() => useLaptops(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(api.get).toHaveBeenCalledWith("/products?type=laptop");
      expect(result.current.data).toEqual(mockLaptops);
    });

    it("handles error state when the API fails", async () => {
      api.get.mockRejectedValue(new Error("API Down"));

      const { result } = renderHook(() => useLaptops(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error.message).toBe("API Down");
    });
  });

  describe("useLaptop (Single)", () => {
    it("filters and returns the correct laptop by ID", async () => {
      api.get.mockResolvedValue({ data: mockLaptops });

      const { result } = renderHook(() => useLaptop("L2"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data.name).toBe("Dell XPS");
      expect(result.current.data._id).toBe("L2");
    });

    it("throws an error if the laptop ID is not in the fetched list", async () => {
      api.get.mockResolvedValue({ data: mockLaptops });

      const { result } = renderHook(() => useLaptop("L999"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error.message).toBe("Laptop not found");
    });

    it("remains idle if no ID is provided (enabled: false)", () => {
      const { result } = renderHook(() => useLaptop(null), {
        wrapper: createWrapper(),
      });

      expect(result.current.fetchStatus).toBe("idle");
      expect(api.get).not.toHaveBeenCalled();
    });
  });
});
