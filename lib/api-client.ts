type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

interface ApiError {
  message: string;
  status: number;
  data?: any;
}

class ApiClient {
  private baseUrls: Record<string, string> = {
    jsonplaceholder: "https://jsonplaceholder.typicode.com",
    dummyjson: "https://dummyjson.com",
  };

  private async request<T>(
    baseUrlKey: keyof typeof this.baseUrls,
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { method = "GET", headers = {}, body, timeout = 10000 } = options;

    const url = `${this.baseUrls[baseUrlKey]}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw {
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          data: errorData,
        } as ApiError;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof DOMException && error.name === "AbortError") {
        throw {
          message: "Request timeout",
          status: 408,
        } as ApiError;
      }

      throw error as ApiError;
    }
  }

  // Users API (jsonplaceholder)
  users = {
    getAll: (params?: { page?: number; limit?: number; search?: string }) => {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.set("_page", params.page.toString());
      if (params?.limit) queryParams.set("_limit", params.limit.toString());
      if (params?.search) queryParams.set("q", params.search);

      const queryString = queryParams.toString();
      return this.request<any[]>(
        "jsonplaceholder",
        `/users${queryString ? `?${queryString}` : ""}`
      );
    },

    getById: (id: number) => {
      return this.request<any>("jsonplaceholder", `/users/${id}`);
    },
  };

  // Products API (dummyjson)
  products = {
    getAll: (params?: {
      page?: number;
      limit?: number;
      category?: string;
      search?: string;
      sortBy?: "price" | "rating" | "title";
      order?: "asc" | "desc";
    }) => {
      const queryParams = new URLSearchParams();

      if (params?.limit) queryParams.set("limit", params.limit.toString());

      // Handle pagination
      if (params?.page && params?.limit) {
        const skip = (params.page - 1) * params.limit;
        queryParams.set("skip", skip.toString());
      }

      if (params?.category) queryParams.set("category", params.category);
      if (params?.search) queryParams.set("q", params.search);
      if (params?.sortBy) queryParams.set("sortBy", params.sortBy);
      if (params?.order) queryParams.set("order", params.order);

      const queryString = queryParams.toString();
      return this.request<any>(
        "dummyjson",
        `/products${queryString ? `?${queryString}` : ""}`
      );
    },

    getById: (id: number) => {
      return this.request<any>("dummyjson", `/products/${id}`);
    },

    getCategories: () => {
      return this.request<string[]>("dummyjson", "/products/categories");
    },

    search: (query: string, limit = 20) => {
      const queryParams = new URLSearchParams();
      queryParams.set("q", query);
      queryParams.set("limit", limit.toString());

      return this.request<any>("dummyjson", `/products/search?${queryParams}`);
    },

    getByCategory: (category: string, limit = 10) => {
      return this.request<any>(
        "dummyjson",
        `/products/category/${category}?limit=${limit}`
      );
    },
  };
}

export const apiClient = new ApiClient();
