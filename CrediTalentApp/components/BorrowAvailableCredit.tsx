"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getCreditInfo } from "../controllers/creditalentApi";
import { CreditInfoType } from "@/types/creditalent-responses";
import { fetchTalentPassport } from "../controllers/talentProtocolApi";
import { TalentPassportType } from "@/types/talent-protocol-responses";
import { NewCreditRequestModal } from "./onchain/newCreditRequestModalButton";
import { CREDIT_STATUS_LABEL, DEFAULT_CREDIT_STATUS_LABEL } from "@/lib/constants";

export default function Component() {
  const { address: userAddress } = useAccount();


  const { data: creditInfoData, status: creditInfoQueryStatus } = useQuery({
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
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                <span className="text-sm">{CREDIT_STATUS_LABEL[creditInfoData?.talent?.status] ?? DEFAULT_CREDIT_STATUS_LABEL}</span>
              </div>
                <div className="flex justify-between">
                  <span>1. Talent Available:</span>
                  <span>{creditInfoData?.talent?.amount || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                <span className="text-sm">{CREDIT_STATUS_LABEL[creditInfoData?.usdc?.status]?? DEFAULT_CREDIT_STATUS_LABEL}</span>
                </div>
                <div className="flex justify-between">
                  <span>2. USDC Available:</span>
                  <span>{creditInfoData?.usdc?.amount || 0}</span>
                </div>
                <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                <span className="text-sm">{CREDIT_STATUS_LABEL[creditInfoData?.xoc?.status] ?? DEFAULT_CREDIT_STATUS_LABEL}</span>
                </div>
                <div className="flex justify-between">
                  <span>2. XOC Available:</span>
                  <span>{creditInfoData?.xoc?.amount || 0}</span>
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
                <div className="text-sm text-muted-foreground">
                  Specify the quantity to borrow
                </div>
                <div className="flex items-center gap-4">
                  <Input placeholder="$0" className="text-lg" />
                  <div className="flex h-10 min-w-[80px] items-center justify-center rounded-md border bg-gray-50 px-3">
                    XOC
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center text-sm text-blue-600">
              {creditInfoQueryStatus === "success" &&
                (creditInfoData?.approvedLoanApplications?.length > 0 ? (
                  "No Approved Loan Applications"
                ) : (
                  <div>
                    No Approved Loan Applications yet, use "Request a new Credit
                    Line" to access your credit
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
  );
}
