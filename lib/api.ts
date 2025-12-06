const API_BASE = "https://jsonplaceholder.typicode.com";
const PRODUCTS_API = "https://dummyjson.com";

interface UsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface ProductsParams {
  page?: number;
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
  sortBy?: "price" | "rating" | "title";
  order?: "asc" | "desc";
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

class ApiService {
  private async fetchWithTimeout<T>(
    url: string,
    options: RequestInit = {},
    timeout = 10000
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        return {
          error: `HTTP error! status: ${response.status}`,
          status: response.status,
        };
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      return {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        status: 0,
      };
    }
  }

  async getUsers(params?: UsersParams) {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.set("_page", params.page.toString());
    if (params?.limit) queryParams.set("_limit", params.limit.toString());
    if (params?.search) queryParams.set("q", params.search);

    const url = `${API_BASE}/users${
      queryParams.toString() ? `?${queryParams}` : ""
    }`;
    return this.fetchWithTimeout(url);
  }

  async getUser(id: number) {
    return this.fetchWithTimeout(`${API_BASE}/users/${id}`);
  }

  async getProducts(params?: ProductsParams) {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.set("limit", params.limit.toString());

    // Handle pagination
    if (params?.page && params?.limit) {
      const skip = (params.page - 1) * params.limit;
      queryParams.set("skip", skip.toString());
    } else if (params?.skip !== undefined) {
      queryParams.set("skip", params.skip.toString());
    }

    if (params?.category) queryParams.set("category", params.category);
    if (params?.search) queryParams.set("q", params.search);
    if (params?.sortBy) queryParams.set("sortBy", params.sortBy);
    if (params?.order) queryParams.set("order", params.order);

    const url = `${PRODUCTS_API}/products${
      queryParams.toString() ? `?${queryParams}` : ""
    }`;
    return this.fetchWithTimeout(url);
  }

  async getProduct(id: number) {
    return this.fetchWithTimeout(`${PRODUCTS_API}/products/${id}`);
  }

  async getProductCategories() {
    return this.fetchWithTimeout<string[]>(
      `${PRODUCTS_API}/products/categories`
    );
  }

  async searchProducts(query: string, limit = 20) {
    const queryParams = new URLSearchParams();
    queryParams.set("q", query);
    queryParams.set("limit", limit.toString());

    const url = `${PRODUCTS_API}/products/search?${queryParams}`;
    return this.fetchWithTimeout(url);
  }

  async getProductsByCategory(category: string, limit = 10) {
    const url = `${PRODUCTS_API}/products/category/${category}?limit=${limit}`;
    return this.fetchWithTimeout(url);
  }
}

export const apiService = new ApiService();
