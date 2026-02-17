"use client";

import UserTable from "@/components/pages/admin/users/user-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";
import {
  useApproveUser,
  useChangeUserRole,
  useGetUsers,
} from "@/services/user-service";
import { useState } from "react";

export default function UsersApprovalPage() {
  const { toast } = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useGetUsers(currentPage, pageSize);

  const { mutate: approveUser, isPending: isApproving } = useApproveUser();
  const { mutate: changeRole, isPending: isChangingRole } = useChangeUserRole();

  const handleApprove = (userId: string, userName: string) => {
    approveUser(userId, {
      onSuccess: () => {
        toast({
          title: "کاربر تایید شد",
          description: `${userName} با موفقیت تایید شد و می‌تواند از سیستم استفاده کند.`,
        });
      },
      onError: (err) => {
        toast({
          title: "خطا در تایید کاربر",
          description: err.message,
          variant: "destructive",
        });
      },
    });
  };

  const handleChangeRole = (userId: string, newType: string) => {
    changeRole(
      { userId, type: newType },
      {
        onSuccess: () => {
          // toast already handled in mutation
        },
      },
    );
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = usersData?.meta
    ? Math.ceil(usersData.meta.itemCount / pageSize)
    : 1;

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
          <p className="text-cream/60">
            {usersData?.data.filter((u) => u.verify === false).length ?? 0}{" "}
            کاربر در انتظار تایید
          </p>
        </div>
      </div>

      {/* Table – now with role change */}
      <UserTable
        users={usersData?.data ?? []}
        onApprove={handleApprove}
        onChangeRole={handleChangeRole}
      />

      {/* Pagination ... */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      handlePageChange(currentPage - 1);
                    }
                  }}
                  className={
                    currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                  className={
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
