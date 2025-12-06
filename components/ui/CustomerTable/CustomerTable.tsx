"use client";

import { StatusBadge } from "../StatusBadge/StatusBadge";

interface Customer {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  status: "Active" | "Inactive";
}

interface CustomerTableProps {
  customers: Customer[];
  isLoading?: boolean;
}

export function CustomerTable({ customers, isLoading }: CustomerTableProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-[60px] border-b border-[#EEEEEE]">
            <div className="h-full grid grid-cols-7 gap-4 items-center">
              {[...Array(7)].map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 rounded ml-6"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="h-[480px] flex items-center justify-center">
        <p className="text-gray-500">No customers found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#EEEEEE]">
            <th className="text-left py-4">
              <span className="ml-6 text-sm font-medium leading-[21px] tracking-[-0.01em] text-[#B5B7C0]">
                Customer Name
              </span>
            </th>
            <th className="text-left py-4">
              <span className="text-sm font-medium leading-[21px] tracking-[-0.01em] text-[#B5B7C0]">
                Company
              </span>
            </th>
            <th className="text-left py-4">
              <span className="text-sm font-medium leading-[21px] tracking-[-0.01em] text-[#B5B7C0]">
                Phone Number
              </span>
            </th>
            <th className="text-left py-4">
              <span className="text-sm font-medium leading-[21px] tracking-[-0.01em] text-[#B5B7C0]">
                Email
              </span>
            </th>
            <th className="text-left py-4">
              <span className="text-sm font-medium leading-[21px] tracking-[-0.01em] text-[#B5B7C0]">
                Country
              </span>
            </th>
            <th className="text-center py-4">
              <span className="text-sm font-medium leading-[21px] tracking-[-0.01em] text-[#B5B7C0]">
                Status
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-b border-[#EEEEEE] hover:bg-gray-50/50"
            >
              <td className="py-5">
                <div className="ml-6">
                  <p className="text-sm font-medium leading-[21px] tracking-[-0.01em] text-[#292D32]">
                    {customer.name}
                  </p>
                </div>
              </td>
              <td className="py-5">
                <p className="text-sm font-medium leading-[21px] tracking-[-0.01em] text-[#292D32]">
                  {customer.company}
                </p>
              </td>
              <td className="py-5">
                <p className="text-sm font-medium leading-[21px] tracking-[-0.01em] text-[#292D32]">
                  {customer.phone}
                </p>
              </td>
              <td className="py-5">
                <p className="text-sm font-medium leading-[21px] tracking-[-0.01em] text-[#292D32]">
                  {customer.email}
                </p>
              </td>
              <td className="py-5">
                <p className="text-sm font-medium leading-[21px] tracking-[-0.01em] text-[#292D32]">
                  {customer.country}
                </p>
              </td>
              <td className="py-5 text-center">
                <div className="flex justify-center">
                  <StatusBadge status={customer.status} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
