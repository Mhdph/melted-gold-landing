"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const generateChartData = () => {
  const data = [];
  const basePrice = 2800000;
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const randomVariation = (Math.random() - 0.5) * 100000;
    data.push({
      date: date.toLocaleDateString("fa-IR", {
        month: "short",
        day: "numeric",
      }),
      price: basePrice + randomVariation + i * 1000,
    });
  }
  return data;
};

export function PriceChart() {
  const data = generateChartData();

  return (
    <Card className="bg-[#fdf4e0]  border border-[#dcd3bc]">
      <CardHeader>
        <CardTitle className="text-gold text-xl">
          نمودار قیمت طلا (۳۰ روز اخیر)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            price: {
              label: "قیمت",
              color: "#D4AF37",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#BFA67A20" />
              <XAxis
                dataKey="date"
                stroke="#FAF7F0"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="#FAF7F0"
                style={{ fontSize: "12px" }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: number) => [
                  `${value.toLocaleString("fa-IR")} تومان`,
                  "قیمت",
                ]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#D4AF37"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
