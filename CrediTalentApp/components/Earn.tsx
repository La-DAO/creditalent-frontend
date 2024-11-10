"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchLoanApplications } from "@/controllers/creditalentApi";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Avatar } from "@coinbase/onchainkit/identity";
import { LoanApplicationExtended } from "@/types/creditalent-responses";
import { AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Component() {
  const [amount, setAmount] = React.useState("");
  const { data: loanApplicationsData } = useQuery({
    queryKey: ["loanApplicationsKey"],
    queryFn: () => fetchLoanApplications(),
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs defaultValue="add-balance" className="w-full">
        <TabsList className="w-full max-w-md">
          <TabsTrigger
            value="add-balance"
            className="flex-1 data-[state=active]:text-[#ff4405] data-[state=active]:border-b-[#ff4405]"
          >
            Add/Balance Funds
          </TabsTrigger>
          <TabsTrigger value="approve" className="flex-1">
            Approve Applications
          </TabsTrigger>
        </TabsList>

        <div className="grid md:grid-cols-1 gap-6 mt-6">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <Table className="w-full border-collapse hover:bg-transparent">
              <TableHeader className="bg-[#ff4405] text-white">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-center text-white">
                    Nombre
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Humano
                  </TableHead>

                  <TableHead className="text-center text-white">
                    Cantidad
                  </TableHead>
                  <TableHead className="text-center text-white">Asset Type</TableHead>

                  <TableHead className="text-center text-white">
                    Puntuación
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Nominaciones
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Seguidores
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(
                  loanApplicationsData as unknown as LoanApplicationExtended[]
                )?.map((item) => (
                  <TableRow key={item?.id}>
                    <TableCell>
                      <div className="flex items-center gap-x-2 py-1 text-left">
                        <Avatar>
                          <AvatarImage
                            src={item.applicant?.profilePictureUrl}
                          />
                          <AvatarFallback>
                            {item.applicant?.name}
                          </AvatarFallback>
                        </Avatar>
                        {item?.applicant?.name}
                      </div>
                    </TableCell>
                    <TableCell className="">
                      {item?.humanCheck ? (
                        <p className="text-xl font-bold text-green-700">✅</p>
                      ) : (
                        <p className="text-xl font-bold text-red-700">❌</p>
                      )}
                    </TableCell>

                    <TableCell className="text-left">{`$${item?.amount?.toFixed(
                      2
                    )}`}</TableCell>
                    <TableCell className="text-center">100 XOC</TableCell>

                    <TableCell className="text-center">
                      {item?.builderScore}
                    </TableCell>
                    <TableCell className="text-center">
                      {item?.nominationsReceived}
                    </TableCell>
                    <TableCell className="text-center">
                      {item?.followers}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        {/* <ApproveModalButton loanApplication={item} />
                        <DenyModalButton loanApplication={item} /> */}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
