'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchLoanApplications } from '@/controllers/creditalentApi';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Avatar } from '@coinbase/onchainkit/identity';
import {
  LoanApplicationExtended,
} from '@/types/creditalent-responses';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import ApplytoUnderWriteButton from './onchain/components/applyToUnderwriteButton';
import { ApproveModalButton } from './onchain/components/approveModalButton';
import { DenyModalButton } from './onchain/components/denyModalButton';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import { AssetType } from '@/lib/constants';
import { Address } from 'viem';
import { CreditTalentCenterABI } from '@/components/onchain/abis';

// Utility function to format amounts
function formatAmount(amount: number, decimals: number = 18): string {
  const adjustedAmount = amount / Math.pow(10, decimals); // Adjust for token decimals
  return adjustedAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function Earn({
  selectedAssetType,
}: {
  selectedAssetType?: AssetType;
}) {
  const [amount, setAmount] = useState('');

  // Fetch the connected user's wallet address
  const { address: walletAddress } = useAccount();

  // Map asset types to token addresses
  const assetTypeToAddress: Record<AssetType, `0x${string}`> = {
    xoc: '0x4eE906B7135bDBdfC83FE40b8f2156C99FCB64c2',
    usdc: '0x03e5f3a1ae8faea9d8ec56a3ed1e708cfede1970',
    talent: '0xaAE22ccff30E636BDa436D54E5efea72227B2868',
  };

  const creditTalentCenters: Record<AssetType, `0x${string}`> = {
    xoc: "0xBD03d38828Bf0D56f1d325F96d4d48d4a2fa3549",
    usdc: "0x9A41029a07Ca57873CAd637384671349Fc9e8D9C",
    talent: "0x465d5decA1A8d4c93e7D6a97018F0EFfCe56D247",
  };
  const contractAddress = selectedAssetType ? creditTalentCenters[selectedAssetType] : undefined;

  const assetTypeDecimals: Record<AssetType, number> = {
    xoc: 18,
    usdc: 6,
    talent: 18,
  };

  const tokenAddress = selectedAssetType
    ? assetTypeToAddress[selectedAssetType.toLowerCase() as AssetType]
    : undefined;

    console.log('Token Address:', tokenAddress);

  // Use the `useBalance` hook
  const {
    data: balanceData,
    isError,
    isLoading,
  } = useBalance({
    address: walletAddress,
    token: tokenAddress,
    chainId: 84532, // Base Sepolia chain
  });

  const decimals = selectedAssetType
    ? assetTypeDecimals[selectedAssetType.toLowerCase() as AssetType] || 18
    : 18;

  console.log('Wallet Address:', walletAddress);

  const {
    data: underwriterData,
    isError: isUnderwriterError,
    isLoading: isUnderwriterLoading,
  } = useReadContract({
    abi: CreditTalentCenterABI,
    address: contractAddress as Address,
    functionName: 'underwriters',
    args: [walletAddress],
  });

  console.log('Raw underwriterData:', underwriterData);
  console.log('Type of underwriterData:', typeof underwriterData);

  // Extract approvalAmount from underwriterData
  const approvalAmount =
    underwriterData && Array.isArray(underwriterData)
      ? BigInt(underwriterData[1])
      : BigInt(0);
  console.log('Approval Amount (BigInt):', approvalAmount);
  console.log('Approval Amount (String):', approvalAmount.toString());

  // Convert BigInt to string for formatting
  const formattedApprovalAmount = formatAmount(
    Number(approvalAmount),
    decimals
  );

  console.log('Formatted Approval Amount:', formattedApprovalAmount);

  // Fetch loan applications
  const { data: loanApplicationsData } = useQuery({
    queryKey: ['loanApplicationsKey'],
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
                    <span className="text-gray-500">Balance in Wallet:</span>
                    <span>
                      {isLoading
                        ? 'Cargando...'
                        : isError
                        ? 'Error'
                        : `${formatAmount(
                            Number(balanceData?.value || 0),
                            decimals
                          )} ${selectedAssetType?.toUpperCase()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Balance in Contract:
                    </span>
                    <span>
                      {isUnderwriterLoading
                        ? 'Cargando...'
                        : isUnderwriterError
                        ? 'Error'
                        : `${formattedApprovalAmount} ${selectedAssetType?.toUpperCase()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Allowance:</span>
                    <span>0</span>
                  </div>
                </div>
                {/* DEPOSITAR */}
                <ApplytoUnderWriteButton
                  assetType={selectedAssetType}
                  amount={+(amount ?? 0)}
                />
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
                            <AvatarImage src={item.userPictureUrl ?? ''} />
                            <AvatarFallback>{item.userName}</AvatarFallback>
                          </Avatar>
                          {item?.userName}
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
                        {' '}
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
                          <ApproveModalButton
                            loanApplication={item}
                            assetType={selectedAssetType}
                          />
                          <DenyModalButton
                            loanApplication={item}
                            assetType={selectedAssetType}
                          />
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
