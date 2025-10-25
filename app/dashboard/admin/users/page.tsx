"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import UserFilters from "@/components/pages/admin/users/user-filters";
import UserTable from "@/components/pages/admin/users/user-table";
import { User, FilterStatus } from "@/components/pages/admin/users/types";
import { sampleUsers } from "@/components/pages/admin/users/utils";
import { useGetUsers } from "@/services/user-service";

export default function UsersApprovalPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("pending");
  const { data: usersData, isLoading, isError, error } = useGetUsers();

  const handleApprove = (userId: string, userName: string) => {
    // setUsers(
    //   users.map((user) =>
    //     user.id === userId ? { ...user, status: "approved" as const } : user
    //   )
    // );
    toast({
      title: "کاربر تایید شد",
      description: `${userName} با موفقیت تایید شد و می‌تواند از سیستم استفاده کند.`,
    });
  };

  const handleReject = (userId: string, userName: string) => {
    // setUsers(
    //   users.map((user) =>
    //     user.id === userId ? { ...user, status: "rejected" as const } : user
    //   )
    // );
    toast({
      title: "کاربر رد شد",
      description: `درخواست ${userName} رد شد.`,
      variant: "destructive",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!usersData) return <div>No users found</div>;
  const pendingCount = usersData.data.filter((u) => u.verify === false).length;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold mb-2">تایید کاربران</h1>
          <p className="text-cream/60">{pendingCount} کاربر در انتظار تایید</p>
        </div>
      </div>

      {/* Filters */}
      {/* <UserFilters
        searchQuery={searchQuery}
        filterStatus={filterStatus}
        onSearchChange={setSearchQuery}
        onFilterChange={setFilterStatus}
      /> */}

      {/* User Table */}
      <UserTable
        users={usersData.data}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
