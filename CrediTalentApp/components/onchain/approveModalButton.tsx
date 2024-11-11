"use client";

import React, { useEffect, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  AssetType,
  LoanApplicationExtended,
} from "@/types/creditalent-responses";
import { Loader2 } from "lucide-react"; // Import Loader2 from lucide-react
import { talentCenterContractFactory } from "./factories/talentCenterContractFactory";
// import { ERC20ABI } from '@/components/onchain/abis/erc20'
// import { parseUnits, parseEther, maxInt256 } from 'viem' // Import parseEther

export function ApproveModalButton({
  loanApplication,
  assetType,
}: {
  assetType?: AssetType;
  loanApplication: LoanApplicationExtended;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(loanApplication?.amount?.toString());
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: approveCreditHash,
    writeContractAsync: approveCredit,
    isPending: isApproveCreditPending,
  } = useWriteContract();

  const { isLoading: isLoadingApproveTx, isSuccess: isSuccessApproveTx } =
    useWaitForTransactionReceipt({ hash: approveCreditHash });

  const handleApprove = async () => {
    if (!assetType) {
      console.error("Unknown Asset type: ", assetType);
      return;
    }
    try {
      const talentCenterContract = talentCenterContractFactory(assetType!);
      const assetAmount = parseFloat(amount) || 0;
      const amountInWei = BigInt(assetAmount * 1e18);
      const maxUint256BigNumber = BigInt(
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      );

      const args = [
        loanApplication.walletId,
        +loanApplication?.applicantId!,
        amountInWei,
        maxUint256BigNumber,
      ];
      console.log('🚀 ~ handleApprove ~ args:', args)
      setIsLoading(true);
      // const txTalentCenter = await approveCredit({
      //   address: talentCenterContract.address,
      //   abi: talentCenterContract.abi,
      //   functionName: "approveCredit",
      //   args: [
      //     loanApplication.walletId,
      //     +(loanApplication?.applicantId!),
      //     amountInWei,
      //     maxUint256BigNumber,
      //   ],
      // });
      // console.log('🚀 ~ handleApprove ~ txTalentCenter:', txTalentCenter)
      // console.log('🚀 ~ handleApprove ~ txTalentCenter:', txTalentCenter)
      // TODO: update DB
      toast.success("Solicitud de aprobación enviada!"); // Success message
      setIsOpen(false);
    } catch (error) {
      console.error("Approve failed:", error);
      toast.error(
        "Hubo un error al aprobar la solicitud. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function updateLoanApp() {
      if (!loanApplication.id) {
        return toast.error(
          "No existe id para esta solicitud, contactar al admin"
        );
      }
      // TODO: CRIS
      // const updatedLoanApp = await updateLoanApplication({
      //   id: loanApplication.id,
      //   status: 'APPROVED',
      // })

      // if (updatedLoanApp.status === 'APPROVED') {
      //   toast.success('Solicitud aprobada exitosamente')
      // } else {
      //   toast.warning(
      //     'No se ha actualizado la solicitud en la base de datos, contactar al admin',
      //   )
      // }

      setIsLoading(false);
    }

    if (isSuccessApproveTx) {
      updateLoanApp();
    }
  }, [isSuccessApproveTx, loanApplication.id]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-secondary hover:bg-secondary/60"
        >
          Aprobar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[576px] lg:max-w-[768px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Aprobar Solicitud
          </DialogTitle>{" "}
          {/* Changed title */}
          <DialogDescription className="text-center text-base">
            ¿Estás seguro que quieres aprobar la solicitud de{" "}
            {loanApplication.applicant?.name}? {/* Added applicant name */}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid gap-4">
          <div>
            <Label htmlFor="amount">Cantidad a Aprobar (ETH)</Label>{" "}
            {/* Clearer label */}
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-4">
            <Button
              className="bg-[#ff4405] hover:bg-[#ff4405]/90 text-white"
              onClick={handleApprove}
              disabled={isApproveCreditPending || !amount || isLoading}
            >
              {" "}
              {/* Changed variant */}
              {isLoadingApproveTx || isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 mr-2" /> // Display Loader2 while loading
              ) : (
                "Aprobar"
              )}{" "}
              {/* Changed text */}
            </Button>
            <Button
              variant="outline"
              className="border-secondary hover:bg-secondary/60"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
