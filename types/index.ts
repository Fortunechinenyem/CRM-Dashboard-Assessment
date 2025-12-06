export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
  status: "active" | "inactive";
  role: "admin" | "user";
  lastLogin: string;
}

export interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  stock: number;
  rating: number;
  category: string;
  thumbnail: string;
  description: string;
}

export interface Customer {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status: "Active" | "Inactive";
}

export interface AuthUser {
  email: string;
  name: string;
  role?: string;
  lastLogin?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: Pagination;
  error?: string;
}
