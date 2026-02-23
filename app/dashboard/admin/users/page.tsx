"use client";

import UserTable from "@/components/pages/admin/users/user-table";
import { PaginationList } from "@/components/ui/pagination-list";
import { columns } from "@/features/user/ui/user-columns";
import UserHeader from "@/features/user/ui/user-page-header";
import { useGetUsers } from "@/services/user-service";
import { useState } from "react";

export default function UsersApprovalPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useGetUsers(currentPage, pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = usersData?.meta
    ? Math.ceil(usersData.meta.itemCount / pageSize)
    : 1;

  if (isLoading)
    return (
      <div className="flex justify-center items-center">در حال بارگذاری</div>
    );
  if (isError) return <div>Error: {error?.message}</div>;
  if (!usersData) return <div>No users found</div>;
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <UserHeader usersData={usersData} />

      {/* Table – now with role change */}

      <div className="bg-white dark:bg-slate-800  py-8 px-4 rounded-lg">
        {" "}
        <UserTable data={usersData?.data ?? []} columns={columns} />
        <PaginationList
          onPageChange={handlePageChange}
          page={currentPage}
          perPage={pageSize}
          total={totalPages}
        />
      </div>
    </div>
  );
}
