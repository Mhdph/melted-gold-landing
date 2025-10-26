import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Transfer } from "@/services/remittance.service";

interface TransferTableProps {
  transfers: Transfer[];
}

export default function TransferTable({ transfers }: TransferTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatValue = (value: number, valueType: "gold" | "mony") => {
    if (valueType === "gold") {
      return `${value} گرم`;
    }
    return `${value} تومان`;
  };

  return (
    <Card className="bg-white border-gold/20">
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="text-right py-3 px-4 text-cream/80 font-medium">
                  گیرنده
                </th>
                <th className="text-right py-3 px-4 text-cream/80 font-medium">
                  نوع انتقال
                </th>
                <th className="text-right py-3 px-4 text-cream/80 font-medium">
                  مقدار
                </th>
                <th className="text-right py-3 px-4 text-cream/80 font-medium">
                  تاریخ
                </th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr
                  key={transfer.id}
                  className="border-b border-gold/10 hover:bg-cream/5"
                >
                  <td className="py-4 px-4 text-cream/80">
                    {transfer.receiver}
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      variant="outline"
                      className={
                        transfer.valueType === "gold"
                          ? "bg-yellow-100/10 text-yellow-400 border-yellow-400/30"
                          : "bg-green-100/10 text-green-400 border-green-400/30"
                      }
                    >
                      {transfer.valueType === "gold" ? "طلا" : "پول"}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-cream/80 font-medium">
                    {formatValue(transfer.value, transfer.valueType)}
                  </td>
                  <td className="py-4 px-4 text-cream/60 text-sm">
                    {formatDate(transfer.createdAt)}
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
