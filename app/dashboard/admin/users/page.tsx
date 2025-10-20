"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  registeredAt: string;
  status: "pending" | "approved" | "rejected";
};

export default function UsersApprovalPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("pending");

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "علی محمدی",
      phone: "09123456789",
      email: "ali@example.com",
      registeredAt: "1403/09/15",
      status: "pending",
    },
    {
      id: "2",
      name: "سارا احمدی",
      phone: "09121234567",
      email: "sara@example.com",
      registeredAt: "1403/09/14",
      status: "pending",
    },
    {
      id: "3",
      name: "محمد رضایی",
      phone: "09131234567",
      email: "mohammad@example.com",
      registeredAt: "1403/09/13",
      status: "approved",
    },
    {
      id: "4",
      name: "فاطمه کریمی",
      phone: "09141234567",
      email: "fatemeh@example.com",
      registeredAt: "1403/09/12",
      status: "pending",
    },
  ]);

  const handleApprove = (userId: string, userName: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "approved" as const } : user
      )
    );
    toast({
      title: "کاربر تایید شد",
      description: `${userName} با موفقیت تایید شد و می‌تواند از سیستم استفاده کند.`,
    });
  };

  const handleReject = (userId: string, userName: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "rejected" as const } : user
      )
    );
    toast({
      title: "کاربر رد شد",
      description: `درخواست ${userName} رد شد.`,
      variant: "destructive",
    });
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.includes(searchQuery) ||
      user.phone.includes(searchQuery) ||
      user.email.includes(searchQuery);
    const matchesFilter =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = users.filter((u) => u.status === "pending").length;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold mb-2">تایید کاربران</h1>
          <p className="text-cream/60">{pendingCount} کاربر در انتظار تایید</p>
        </div>
      </div>

      <Card className="bg-navy/50 border-gold/20">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/40" />
              <Input
                placeholder="جستجو بر اساس نام، شماره تلفن یا ایمیل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 bg-cream/5 border-gold/20 text-cream"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                className={
                  filterStatus === "all"
                    ? "bg-gold text-navy hover:bg-gold/90"
                    : "border-gold/30 text-cream hover:bg-gold/10"
                }
              >
                همه
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                onClick={() => setFilterStatus("pending")}
                className={
                  filterStatus === "pending"
                    ? "bg-gold text-navy hover:bg-gold/90"
                    : "border-gold/30 text-cream hover:bg-gold/10"
                }
              >
                در انتظار
              </Button>
              <Button
                variant={filterStatus === "approved" ? "default" : "outline"}
                onClick={() => setFilterStatus("approved")}
                className={
                  filterStatus === "approved"
                    ? "bg-gold text-navy hover:bg-gold/90"
                    : "border-gold/30 text-cream hover:bg-gold/10"
                }
              >
                تایید شده
              </Button>
              <Button
                variant={filterStatus === "rejected" ? "default" : "outline"}
                onClick={() => setFilterStatus("rejected")}
                className={
                  filterStatus === "rejected"
                    ? "bg-gold text-navy hover:bg-gold/90"
                    : "border-gold/30 text-cream hover:bg-gold/10"
                }
              >
                رد شده
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    نام
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    شماره تلفن
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    ایمیل
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    تاریخ ثبت‌نام
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    وضعیت
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gold/10 hover:bg-cream/5"
                  >
                    <td className="py-4 px-4 text-cream">{user.name}</td>
                    <td className="py-4 px-4 text-cream/80 font-mono">
                      {user.phone}
                    </td>
                    <td className="py-4 px-4 text-cream/80">{user.email}</td>
                    <td className="py-4 px-4 text-cream/80">
                      {user.registeredAt}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          user.status === "pending"
                            ? "bg-gold/10 text-gold"
                            : user.status === "approved"
                            ? "bg-green-400/10 text-green-400"
                            : "bg-red-400/10 text-red-400"
                        }`}
                      >
                        {user.status === "pending"
                          ? "در انتظار"
                          : user.status === "approved"
                          ? "تایید شده"
                          : "رد شده"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {user.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(user.id, user.name)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Check className="h-4 w-4 ml-1" />
                            تایید
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(user.id, user.name)}
                            className="border-red-400/30 text-red-400 hover:bg-red-400/10"
                          >
                            <X className="h-4 w-4 ml-1" />
                            رد
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
