"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

export default function Component() {
  const [amount, setAmount] = useState("");
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

        <TabsContent value="add-balance" className="space-y-4 pt-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Caja</h2>
              <p className="text-sm text-gray-500 mb-6">
                Deposita o retira tus fondos de manera segura.
              </p>

              <div className="flex gap-2 mb-6">
                <Button className="bg-[#ff4405] hover:bg-[#ff4405]/90 text-white">
                  Depositar
                </Button>
                <Button variant="outline">Retirar</Button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Indica la cantidad a depositar:
                  </p>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg"
                    placeholder="0.0"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Balance:</span>
                    <span>0 MAX</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Allowance:</span>
                    <span>0</span>
                  </div>
                </div>

                <Button className="w-full bg-[#ff4405] hover:bg-[#ff4405]/90 text-white">
                  Depositar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approve" className="space-y-4 pt-4">
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
                    <TableHead className="text-center text-white">
                      Asset Type
                    </TableHead>

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
                      <TableCell className="text-center">
                        {" "}
                        {item?.assetType}
                      </TableCell>

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
        </TabsContent>
      </Tabs>
    </div>
  );
}
