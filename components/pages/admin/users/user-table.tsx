"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "./types";

interface UserTableProps {
  users: User[];
  onApprove: (userId: string, userName: string) => void;
  onChangeRole: (userId: string, newType: string) => void;
}

export default function UserTable({
  users,
  onApprove,
  onChangeRole,
}: UserTableProps) {
  return (
    <Card className="bg-white border-gold/20">
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="text-right py-3 px-4 text-cream/80 font-medium">
                  شماره تلفن
                </th>
                <th className="text-right py-3 px-4 text-cream/80 font-medium">
                  وضعیت
                </th>
                <th className="text-right py-3 px-4 text-cream/80 font-medium">
                  نقش کاربر
                </th>
                <th className="text-right py-3 px-4 text-cream/80 font-medium">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gold/10 hover:bg-cream/5"
                >
                  {/* Mobile */}
                  <td className="py-4 px-4 text-cream/80 font-mono">
                    {user.mobile}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        user.verify === false
                          ? "bg-gold/10 text-gold"
                          : user.verify === true
                            ? "bg-green-400/10 text-green-400"
                            : "bg-red-400/10 text-red-400"
                      }`}
                    >
                      {user.verify === false
                        ? "در انتظار"
                        : user.verify === true
                          ? "تایید شده"
                          : "رد شده"}
                    </span>
                  </td>

                  {/* Role – Select */}
                  <td className="py-4 px-4">
                    <Select
                      value={user.type}
                      onValueChange={(newType) =>
                        onChangeRole(user.id, newType)
                      }
                    >
                      <SelectTrigger className="w-[140px] h-8 text-sm">
                        <SelectValue placeholder="انتخاب نقش" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">کاربر عمومی</SelectItem>
                        <SelectItem value="PartnerShip">
                          شریک / همکار
                        </SelectItem>
                        {/* Add more roles if your system supports them */}
                        {/* <SelectItem value="Admin">مدیر</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4">
                    {user.verify === false && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => onApprove(user.id, user.mobile)}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <Check className="h-4 w-4 ml-1" />
                          تایید
                        </Button>
                        {/* You can also add a Reject button here if needed */}
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
  );
}
