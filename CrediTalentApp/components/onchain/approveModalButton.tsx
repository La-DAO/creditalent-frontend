"use client";

import React, {  useState } from "react";
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
import { saveApproveCreditInfo } from "@/controllers/creditalentApi";

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
      setIsLoading(true);
      const talentCenterContract = talentCenterContractFactory(assetType!);
      const assetAmount = parseFloat(amount) || 0;
      const amountInWei = BigInt(assetAmount * 1e18);
      const maxUint256BigNumber = BigInt(
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      );
      const applicationId = loanApplication?.id as number
      const txTalentCenter = await approveCredit({
        address: talentCenterContract.address,
        abi: talentCenterContract.abi,
        functionName: "approveCredit",
        args: [
          loanApplication.walletId,
          +(loanApplication?.applicantId),
          amountInWei,
          maxUint256BigNumber,
        ],
      });
      
      // TODO: CRIS - use event for confirm transaction and save on DB
      console.log('🚀 ~ handleApprove ~ txTalentCenter:', txTalentCenter)
      console.log('🚀 ~ isSuccessApproveTx:', isSuccessApproveTx)
      // if (isSuccessApproveTx) {
      await saveApproveCreditInfo(applicationId, loanApplication.walletId, assetType, +amount)
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-secondary hover:bg-secondary/60"
        >
          Approve
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[576px] lg:max-w-[768px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Approve Credit Request
          </DialogTitle>{" "}
          {/* Changed title */}
          <DialogDescription className="text-center text-base">
            Are you sure you want to approve this? {" "}
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
                "Approve"
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
