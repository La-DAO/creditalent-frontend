/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Ecosistema from "./Ecosistema";
import AboutPool from "./AboutPool";
import { useQuery } from "@tanstack/react-query";
import { fetchTalentPassport } from "../controllers/talentProtocolApi";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { CREDIT_ALLOWANCE_BY_SCORE } from "../lib/constants";
import { BuilderScoreChart } from "./builder-score-chart";
import NoPassportCard from "./noPassportCard";
import { ExternalLink, LoaderCircle } from "lucide-react";
import { createLoanApplication } from "../controllers/creditalentApi";
import { CreateLoanApplicationData } from "@/types/creditalent-responses";
import { TalentPassportType } from "@/types/talent-protocol-responses";
import { NewCreditRequestModal } from "./onchain/newCreditRequestModalButton";
import BorrowAvailableCredit from "./BorrowAvailableCredit";

export default function Component() {
  // const [isAboutOpen, setIsAboutOpen] = useState(false)

  const [creditAllowed, setCreditAllowed] = useState(0);
  const { address: userAddress } = useAccount();

  const { data: talentPassportData, status: talentPassportQueryStatus } =
    useQuery({
      queryKey: ["talentPassportKey"],
      queryFn: () => fetchTalentPassport(userAddress as string),
      enabled: Boolean(userAddress),
    });

  function getCreditAllowance(score: number) {
    let creditAllowed = 0;

    for (const [key, value] of Object.entries(CREDIT_ALLOWANCE_BY_SCORE)) {
      if (score >= parseInt(key)) {
        creditAllowed = value;
      }
    }

    return creditAllowed;
  }



  useEffect(() => {
    console.log(talentPassportData);
    if (talentPassportData) {
      const calculatedCreditAllowed = getCreditAllowance(
        talentPassportData.score
      );
      setCreditAllowed(calculatedCreditAllowed);
    }
  }, [talentPassportData]);

  return (
    <main className="mx-auto max-w-[1400px] space-y-8 p-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <BorrowAvailableCredit/>
        {/* <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              Available Credit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-gray-50 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                <span className="text-sm">Haven&apos;t started</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>1. Talent Available:</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between">
                  <span>2. USDC Available:</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between">
                  <span>2. XOC Available:</span>
                  <span>0</span>
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
              No Approved Loan Applications
            </div>
          </CardContent>
        </Card> */}

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              Loans Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {[
              { label: "Total $TALENT Borrowed", amount: "$0", apy: "7.5%" },
              { label: "Total $USDC Borrowed", amount: "$0", apy: "7.5%" },
              { label: "Total $XOC Borrowed", amount: "$0", apy: "7.5%" },
            ].map((loan) => (
              <div key={loan.label} className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  {loan.label}
                </div>
                <div className="flex justify-between">
                  <div>
                    {loan.amount}{" "}
                    <span className="text-muted-foreground">XOC</span>
                  </div>
                  <div className="text-sm">
                    APY <span className="font-medium">{loan.apy}</span>
                  </div>
                </div>
              </div>
            ))}
            <NewCreditRequestModal talentPassportData={talentPassportData} creditAllowed={creditAllowed}  />
          
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              Your Risk Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative mx-auto">
              {talentPassportQueryStatus === "pending" && (
                <>
                  <div className="flex flex-col items-center justify-center min-h-[192px]">
                    <LoaderCircle className="h-16 w-16 animate-spin text-[#FF4405]" />
                    <h4>Calculando tu Reputación Onchain...</h4>
                  </div>
                </>
              )}

              {talentPassportQueryStatus === "success" &&
                (talentPassportData ? (
                  <BuilderScoreChart
                    builderScore={talentPassportData?.score ?? 0}
                  />
                ) : (
                  <NoPassportCard />
                ))}
            </div>
            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                With {talentPassportData?.score ?? 0} points you are a competent
                Builder and someone we can trust making the right choices with
                investor&apos;s money.
              </p>
              <p>
                Request a new credit line of up to $1,500 USDC&apos;s worth of
                tokens.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <AboutPool />

      <Ecosistema />
    </main>
  );
}
