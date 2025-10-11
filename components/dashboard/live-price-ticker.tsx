"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export function LivePriceTicker() {
  const [price, setPrice] = useState(2850000);
  const [change, setChange] = useState(0);
  const [isPositive, setIsPositive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomChange = (Math.random() - 0.5) * 10000;
      setPrice((prev) => {
        const newPrice = prev + randomChange;
        const changePercent = (randomChange / prev) * 100;
        setChange(changePercent);
        setIsPositive(randomChange >= 0);
        return newPrice;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="  border border-[#dcd3bc] py-3 bg-[#faeed4]">
      <div className="container mx-auto px-4 flex items-center justify-center gap-6 text-sm">
        <span className="text-cream/70">قیمت لحظه‌ای طلا (هر گرم):</span>
        <span className="text-2xl font-bold text-gold">
          {price.toLocaleString("fa-IR")} تومان
        </span>
        <span
          className={`flex items-center gap-1 ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          {Math.abs(change).toFixed(2)}%
        </span>
      </div>
    </div>
  );
}
