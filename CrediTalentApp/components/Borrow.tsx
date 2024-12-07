/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Ecosistema from "./Ecosistema";
import AboutPool from "./AboutPool";
import { useQuery } from "@tanstack/react-query";
import { fetchTalentPassport } from "../controllers/talentProtocolApi";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { CREDIT_ALLOWANCE_BY_SCORE } from "../lib/constants";
import { BuilderScoreChart } from "./builder-score-chart";
import NoPassportCard from "./noPassportCard";
import { LoaderCircle } from "lucide-react";
import { NewCreditRequestModal } from "./onchain/components/newCreditRequestModalButton";
import BorrowAvailableCredit from "./BorrowAvailableCredit";
import { getCreditInfo } from "@/controllers/creditalentApi";

export default function Component() {
  // const [isAboutOpen, setIsAboutOpen] = useState(false)

  const [creditAllowed, setCreditAllowed] = useState(0);
  const { address: userAddress } = useAccount();
  const { data: creditInfoData, isLoading } = useQuery({
    queryKey: ["creditInfoKey", userAddress],
    queryFn: () => getCreditInfo(userAddress as string),
    enabled: Boolean(userAddress),
  });


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

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              Loans Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {[
              { label: "Total $TALENT Borrowed", amount: creditInfoData?.talent?.borrowAmount || "$0", apy: "7.5%" },
              { label: "Total $USDC Borrowed", amount: creditInfoData?.usdc?.borrowAmount || "$0", apy: "7.5%" },
              { label: "Total $XOC Borrowed", amount: creditInfoData?.xoc?.borrowAmount || "$0", apy: "7.5%" }, // DEMO1
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
