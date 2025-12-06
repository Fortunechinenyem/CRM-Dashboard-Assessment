"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Download, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/Button/Button";
import { Dropdown } from "@/components/ui/Dropdown/Dropdown";
import { EmptyState } from "@/components/ui/EmptyState/EmptyState";

interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  stock: number;
  rating: number;
  category: string;
  thumbnail: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://dummyjson.com/products?limit=50");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "stock":
          return b.stock - a.stock;
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [products, searchTerm, categoryFilter, sortBy]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    return [
      { value: "all", label: "All Categories" },
      ...uniqueCategories.map((cat) => ({ value: cat, label: cat })),
    ];
  }, [products]);

  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "price-low", label: "Price (Low to High)" },
    { value: "price-high", label: "Price (High to Low)" },
    { value: "rating", label: "Rating" },
    { value: "stock", label: "Stock" },
  ];

  const handleExport = () => {
    const csvContent = [
      ["Title", "Brand", "Price", "Stock", "Rating", "Category"].join(","),
      ...filteredProducts.map((product) =>
        [
          product.title,
          product.brand,
          product.price,
          product.stock,
          product.rating,
          product.category,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
  };

  return (
    <div className="p-8">
      <PageHeader
        title="Products"
        subtitle={`${filteredProducts.length} products available`}
        search={{
          placeholder: "Search products...",
          value: searchTerm,
          onChange: setSearchTerm,
        }}
        action={
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => router.push("/dashboard/products/new")}
          >
            Add Product
          </Button>
        }
      />

      <div className="bg-white rounded-[30px] shadow-[0px_10px_60px_rgba(226,236,249,0.5)] p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dropdown
              options={categories}
              value={categoryFilter}
              onChange={setCategoryFilter}
              placeholder="Select category"
            />

            <Dropdown
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
            />

            <Button
              variant="outline"
              leftIcon={<Filter className="w-4 h-4" />}
              className="w-full md:w-auto"
            >
              More Filters
            </Button>
          </div>

          <Button
            variant="outline"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={handleExport}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-xl"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-[30px] shadow-[0px_10px_60px_rgba(226,236,249,0.5)] p-8">
          <EmptyState
            title="No products found"
            description="Try adjusting your search or filter to find what you're looking for."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                }}
              >
                Clear filters
              </Button>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-[0px_10px_60px_rgba(226,236,249,0.5)] overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="h-48 bg-gray-100 overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 line-clamp-1">
                    {product.title}
                  </h3>
                  <span className="text-sm font-semibold text-[#5932EA]">
                    ${product.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{product.brand}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">{product.category}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        product.stock > 50
                          ? "bg-green-100 text-green-800"
                          : product.stock > 10
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-700">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length > 0 && (
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {Math.min(filteredProducts.length, 20)} of{" "}
            {filteredProducts.length} products
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button size="sm" className="bg-[#5932EA] text-white">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <span className="px-2">...</span>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
