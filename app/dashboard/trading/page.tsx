"use client";

import { useState } from "react";
import PageTitle from "@/components/page-title";
import { TradingDialog } from "@/components/trading-drawer";
import QuickTradeButtons from "@/components/pages/trading/quick-trade-buttons";
import TradeHistoryList from "@/components/pages/trading/trade-history-list";
import { Trade } from "@/components/pages/trading/types";
import { sampleTrades } from "@/components/pages/trading/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductWebSocket } from "@/hooks/use-product-price-websocket";
import { useOneMyUserInfo } from "@/services/user-service";

export default function TradingPage() {
  const [currentPrice] = useState(2500000);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<"buy" | "sell">("buy");
  const [trades, setTrades] = useState<Trade[]>(sampleTrades);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPriceData, setSelectedPriceData] = useState<any | null>(null);
  const { isConnected, product } = useProductWebSocket(); 
  const { data: user,isLoading } = useOneMyUserInfo();
  const pageSize = 10;
  const products = product?.msg?.products ?? [];
  const totalPages =
    products.length > 0 ? Math.ceil(products.length / pageSize) : 0;
  const safePage = totalPages > 0 ? Math.min(currentPage, totalPages - 1) : 0;
  const startIndex = safePage * pageSize;
  const paginatedProducts =
    products.length > 0
      ? products.slice(startIndex, startIndex + pageSize)
      : [];

  const mapProductToPriceData = (p: any) =>
    p?.general
      ? {
          msg: {
            buyMithqal: p.general.buyMithqal,
            buyGerm: p.general.buyGerm,
            sellMithqal: p.general.sellMithqal,
            sellGerm: p.general.sellGerm,
            buyGram: p.general.buyGerm,
            sellGram: p.general.sellGerm,
            productId: p.productId,
            productName: p.productName,
            percentageChange: p.percentageChange,
          },
        }
      : null;

  const handleOpenDrawer = (type: "buy" | "sell", priceData?: any) => {
    setDrawerType(type);
    if (priceData) {
      setSelectedPriceData(priceData);
    }
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleTradeComplete = (newTrade: Trade) => {
    setTrades([newTrade, ...trades]);
  };
 
  if (isLoading) return <Skeleton className="w-full bg-zinc-200 animate-pulse h-52" />;
  if (!user?.verify) return <div className="flex-1">
    <div className="text-center text-zinc-500">
      <p className="text-2xl font-bold">حساب شما تایید نشده است</p>
    </div>
  </div>;
  return (
    <div className="min-h-screen bg-[#F6F5EE] dark:bg-slate-900 flex" dir="rtl">
      <div className="flex-1">
          <main className=" mx-auto px-4 space-y-2">
            {/* Page Header */}
            <PageTitle
              title="معاملات طلا"
              description="خرید و فروش طلا با قیمت لحظه‌ای"
            />
  
            {/* Quick Trade Section */}
            {products.length ? (
              <>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedProducts.map((p: any) => {
                    const priceData = mapProductToPriceData(p);
                    if (!priceData) return null;
                    return (
                      <QuickTradeButtons
                        key={p.productId}
                        currentPrice={currentPrice}
                        onBuyClick={() => handleOpenDrawer("buy", priceData)}
                        onSellClick={() => handleOpenDrawer("sell", priceData)}
                        priceData={priceData}
                      />
                    );
                  })}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <button
                      className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50"
                      disabled={safePage === 0}
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 0))
                      }
                    >
                      قبلی
                    </button>
                    <span className="text-sm text-gray-600">
                      {safePage + 1} از {totalPages}
                    </span>
                    <button
                      className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50"
                      disabled={safePage === totalPages - 1}
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages - 1)
                        )
                      }
                    >
                      بعدی
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-zinc-500">
                <Skeleton className="w-full bg-zinc-200 animate-pulse h-52" />
              </div>
            )}
            {/* Trade History */}
            <TradeHistoryList trades={trades} />
          </main>
        </div>
      
      
    

      {/* Trading Drawer */}
      {selectedPriceData && (
        <TradingDialog
          isOpen={drawerOpen}
          onClose={handleCloseDrawer}
          type={drawerType}
          currentPrice={currentPrice}
          onTradeComplete={handleTradeComplete}
          priceData={selectedPriceData}
        />
      )}
    </div>
  );
}
