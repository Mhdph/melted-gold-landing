"use client";

import UserTable from "@/components/pages/admin/users/user-table";
import { PaginationList } from "@/components/ui/pagination-list";
import { CreateUserDialog } from "@/features/user/ui/admin-create-user";
import { columns } from "@/features/user/ui/user-columns";
import UserHeader from "@/features/user/ui/user-page-header";
import { useGetUsers } from "@/services/user-service";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AnnouncementDialog from "@/features/user/ui/announcement-dialog";

export default function UsersApprovalPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(50);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useGetUsers(currentPage, pageSize);

  const handleSelectUser = (id: string, selected: boolean) => {
    setSelectedUserIds((prev) =>
      selected ? [...prev, id] : prev.filter((uid) => uid !== id),
    );
  };

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
      <div className="flex justify-between items-center">
        <UserHeader usersData={usersData} />
        <div className="flex gap-2">
          <Button
            onClick={() => setOpenDialog(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            ارسال اعلان
          </Button>
          <CreateUserDialog />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 py-8 px-4 rounded-lg">
        <UserTable
          data={
            usersData.data.map((u: any) => ({
              ...u,
              isSelected: selectedUserIds.includes(u.id),
            })) ?? []
          }
          columns={columns(handleSelectUser)}
        />
        <PaginationList
          onPageChange={handlePageChange}
          page={currentPage}
          perPage={pageSize}
          total={totalPages}
        />
      </div>

      {/* Announcement Dialog */}
      <AnnouncementDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        selectedUserIds={selectedUserIds}
      />
    </div>
  );
}
