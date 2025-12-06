"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { CustomerTable } from "@/components/ui/CustomerTable/CustomerTable";
import {
  Users,
  UserCheck,
  Monitor,
  TrendingUp,
  TrendingDown,
} from "@/components/ui/Icons";

interface Customer {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status: "Active" | "Inactive";
}

const stats = [
  {
    icon: Users,
    title: "Total Customers",
    value: "5,423",
    change: "+16%",
    isPositive: true,
    color: "from-[#D3FFE7] to-[#EFFFF6]",
    iconColor: "#00AC4F",
  },
  {
    icon: UserCheck,
    title: "Members",
    value: "1,893",
    change: "-1%",
    isPositive: false,
    color: "from-[#D3FFE7] to-[#EFFFF6]",
    iconColor: "#00AC4F",
  },
  {
    icon: Monitor,
    title: "Active Now",
    value: "189",
    color: "from-[#D3FFE7] to-[#EFFFF6]",
    iconColor: "#00AC4F",
    avatars: [
      "/images/evano.png",
      "/images/evano.png",
      "/images/evano.png",
      "/images/evano.png",
      "/images/evano.png",
    ],
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Newest");
  const [isLoading, setIsLoading] = useState(true);

  const mockCustomers: Customer[] = [
    {
      id: 1,
      name: "Jane Cooper",
      company: "Microsoft",
      phone: "(225) 555-0118",
      email: "jane@microsoft.com",
      country: "United States",
      status: "Active",
    },
    {
      id: 2,
      name: "Floyd Miles",
      company: "Yahoo",
      phone: "(205) 555-0100",
      email: "floyd@yahoo.com",
      country: "Kiribati",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Ronald Richards",
      company: "Adobe",
      phone: "(302) 555-0107",
      email: "ronald@adobe.com",
      country: "Israel",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Marvin McKinney",
      company: "Tesla",
      phone: "(252) 555-0126",
      email: "marvin@tesla.com",
      country: "Iran",
      status: "Active",
    },
    {
      id: 5,
      name: "Jerome Bell",
      company: "Google",
      phone: "(629) 555-0129",
      email: "jerome@google.com",
      country: "Réunion",
      status: "Active",
    },
    {
      id: 6,
      name: "Kathryn Murphy",
      company: "Microsoft",
      phone: "(406) 555-0120",
      email: "kathryn@microsoft.com",
      country: "Curaçao",
      status: "Active",
    },
    {
      id: 7,
      name: "Jacob Jones",
      company: "Yahoo",
      phone: "(208) 555-0112",
      email: "jacob@yahoo.com",
      country: "Brazil",
      status: "Active",
    },
    {
      id: 8,
      name: "Kristin Watson",
      company: "Facebook",
      phone: "(704) 555-0127",
      email: "kristin@facebook.com",
      country: "Åland Islands",
      status: "Inactive",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCustomers(mockCustomers);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers;

    const term = searchTerm.toLowerCase();
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term) ||
        customer.company.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        customer.country.toLowerCase().includes(term)
    );
  }, [customers, searchTerm]);

  const itemsPerPage = 8;
  const totalPages = 40;
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  const activeCustomers = customers.filter((c) => c.status === "Active").length;

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = e.currentTarget;
    img.style.display = "none";
    const fallbackDiv = document.createElement("div");
    fallbackDiv.className =
      "w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-600";
    fallbackDiv.textContent = "E";
    img.parentElement?.appendChild(fallbackDiv);
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-[30px] shadow-[0px_10px_60px_rgba(226,236,249,0.5)] p-8"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-8 h-8" color={stat.iconColor} />
              </div>

              <div className="text-right">
                <h3 className="text-sm font-normal leading-[21px] tracking-[-0.01em] text-[#ACACAC]">
                  {stat.title}
                </h3>
                <p className="text-[32px] font-semibold leading-[32px] tracking-[-0.01em] text-[#333333] mt-1">
                  {stat.value}
                </p>

                {stat.change && (
                  <div
                    className={`flex items-center gap-1 mt-2 ${
                      stat.isPositive ? "text-[#00AC4F]" : "text-[#D0004B]"
                    }`}
                  >
                    {stat.isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-xs font-bold leading-[18px] tracking-[-0.01em]">
                      {stat.change} this month
                    </span>
                  </div>
                )}

                {stat.avatars && (
                  <div className="flex -space-x-3 mt-3">
                    {stat.avatars.map((avatarSrc, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative"
                      >
                        <img
                          src={avatarSrc}
                          alt={`Avatar ${i + 1}`}
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-[30px] shadow-[0px_10px_60px_rgba(226,236,249,0.5)] p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h2 className="text-[22px] font-semibold leading-[33px] tracking-[-0.01em] text-black">
              All Customers
            </h2>
            <p className="text-sm font-normal leading-[21px] tracking-[-0.01em] text-[#16C098]">
              Active Members
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-[#7E7E7E]" />
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full lg:w-[216px] h-[38px] pl-11 pr-4
                  bg-[#F9FBFF] rounded-lg
                  text-sm font-normal leading-[18px] tracking-[-0.01em]
                  text-[#B5B7C0] placeholder:text-[#B5B7C0]
                  focus:outline-none focus:ring-2 focus:ring-[#5932EA]/20
                "
              />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="
                  w-full lg:w-[154px] h-[38px] pl-4 pr-10
                  bg-[#F9FBFF] rounded-lg appearance-none
                  text-sm font-normal leading-[18px] tracking-[-0.01em]
                  text-[#7E7E7E] focus:outline-none focus:ring-2 focus:ring-[#5932EA]/20
                "
              >
                <option value="Newest">Short by: Newest</option>
                <option value="Oldest">Short by: Oldest</option>
                <option value="Name">Short by: Name</option>
                <option value="Status">Short by: Status</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-[#3D3C42]" />
              </div>
            </div>
          </div>
        </div>

        <CustomerTable customers={paginatedCustomers} isLoading={isLoading} />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-8 pt-6 border-t border-[#EEEEEE]">
          <p className="text-sm font-normal leading-[21px] tracking-[-0.01em] text-[#B5B7C0] mb-4 lg:mb-0">
            Showing data {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, 256000)} of 256K entries
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="
                w-[26px] h-[24px] flex items-center justify-center
                bg-[#F5F5F5] border border-[#EEEEEE] rounded
                text-xs font-medium leading-[12px] tracking-[-0.01em] text-[#404B52]
                hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <ChevronLeft className="w-3 h-3" />
            </button>

            {[1, 2, 3, 4, 40].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`
                  ${
                    pageNum === 40
                      ? "w-[26px]"
                      : pageNum === 1
                      ? "w-[25px]"
                      : pageNum === 3
                      ? "w-[24px]"
                      : "w-[25px]"
                  } 
                  h-[24px] flex items-center justify-center rounded
                  text-xs font-medium leading-[12px] tracking-[-0.01em]
                  ${
                    currentPage === pageNum
                      ? "bg-[#5932EA] text-white border border-[#5932EA]"
                      : "bg-[#F5F5F5] text-[#404B52] border border-[#EEEEEE] hover:bg-gray-100"
                  }
                `}
              >
                {pageNum}
              </button>
            ))}

            <span className="px-2 text-xs font-medium text-black">...</span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="
                w-[26px] h-[24px] flex items-center justify-center
                bg-[#F5F5F5] border border-[#EEEEEE] rounded
                text-xs font-medium leading-[12px] tracking-[-0.01em] text-[#404B52]
                hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
