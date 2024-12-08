"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getCreditInfo } from "../controllers/creditalentApi";
import { BorrowForm } from "./BorrowForm";
import CreditStatus from './CreditStatus';

export default function BorrowAvailableCredit() {
  const { address: userAddress } = useAccount();

  const { data: creditInfoData, isLoading } = useQuery({
    queryKey: ["creditInfoKey", userAddress],
    queryFn: () => getCreditInfo(userAddress as string),
    enabled: Boolean(userAddress),
  });

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-medium">
          Available Credit
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-gray-50 p-6 space-y-4">
          <div className="space-y-3 text-sm">
            {/* XOC Credit Info */}
            <div className="flex flex-col gap-2">
              <CreditStatus status={creditInfoData?.xoc?.status} />
              <div className="flex justify-between items-center">
                <span>XOC Available:</span>
                <span>{creditInfoData?.xoc?.amount || 0} XOC</span>
              </div>
            </div>

            {/* TALENT Credit Info */}
            <CreditStatus status={creditInfoData?.talent?.status} />

            <div className="flex justify-between">
              <span>Talent Available:</span>
              <span>{creditInfoData?.talent?.amount || 0} Talent</span>
            </div>

            {/* USDC Credit Info */}
            <CreditStatus status={creditInfoData?.usdc?.status} />
            <div className="flex justify-between">
              <span>USDC Available:</span>
              <span>{creditInfoData?.usdc?.amount || 0} USDC</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="borrow" className="w-full">
          <TabsList className="grid w-full grid-cols-2 p-1">
            <TabsTrigger
              value="borrow"
              className="data-[state=active]:bg-[#FF4405] data-[state=active]:text-white"
            >
              Borrow
            </TabsTrigger>
            <TabsTrigger
              value="repay"
              className="data-[state=active]:bg-[#FF4405] data-[state=active]:text-white"
            >
              Repay
            </TabsTrigger>
          </TabsList>
          <TabsContent value="borrow" className="space-y-4 pt-4">
            <BorrowForm 
              creditInfo={creditInfoData}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
