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
import { saveRejectedCreditInfo } from "@/controllers/creditalentApi";
import {
  AssetType,
  LoanApplicationExtended,
} from "@/types/creditalent-responses";
import { talentCenterContractFactory } from "./factories/talentCenterContractFactory";

export function DenyModalButton({
  loanApplication,
  assetType,
}: {
  assetType?: AssetType;
  loanApplication: LoanApplicationExtended;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: hash,
    writeContractAsync: denyApplication,
    isPending: isDenyPending,
  } = useWriteContract();

  const { isLoading: isLoadingDenyTx, isSuccess: isSuccessDenyTx } =
    useWaitForTransactionReceipt({ hash });

  const handleDeny = async () => {
    if (!assetType) {
      console.error("Unknown Asset type: ", assetType);
      return;
    }

    try {
      setIsLoading(true);
      const talentCenterContract = talentCenterContractFactory(assetType!);
      const applicationId = loanApplication?.id as number;

      // Start the transaction
      await denyApplication({
        address: talentCenterContract.address,
        abi: talentCenterContract.abi,
        functionName: "rejectCredit",
        args: [loanApplication.walletId, applicationId, reason],
      });

      // TODO: CRIS - use event for confirm transaction and save on DB
      await saveRejectedCreditInfo(
        applicationId,
        loanApplication.walletId,
        assetType,
        reason
      );
      toast.success("Success elimination");
    } catch (error) {
      console.error("Deny failed:", error);
      toast.error(
        "Hubo un error al denegar la solicitud, por favor intenta de nuevo"
      );
    } finally {
      setIsLoading(false);
      setIsOpen(false);
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
      //   status: 'REJECTED',
      // })

      // if (updatedLoanApp.status === 'REJECTED') {
      //   toast.success('Solicitud rechazada exitosamente')
      // } else {
      //   toast.warning(
      //     'No se ha actualizado la solicitud en la base de datos, contactar al admin',
      //   )
      // }

      setIsLoading(false);
    }

    if (isSuccessDenyTx) {
      updateLoanApp();
    }
  }, [isSuccessDenyTx, loanApplication.id]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-primary hover:bg-primary/60"
        >
          Denegar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[576px] lg:max-w-[768px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Denegar Solicitud
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            ¿Estás seguro que quieres denegar la solicitud de{" "}
            {loanApplication.userName}?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid gap-4">
          {" "}
          {/* Use grid for layout */}
          <div>
            <Label htmlFor="reason">Motivo del Rechazo</Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-4">
            <Button
              variant="destructive"
              onClick={handleDeny}
              disabled={
                isDenyPending || isLoadingDenyTx || !reason || isLoading
              }
            >
              {isDenyPending || isLoadingDenyTx || isLoading ? (
                <span>Rechazando...</span>
              ) : (
                "Rechazar"
              )}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
          </div>
        </div>

        {hash && (
          <div className="flex flex-col items-center pt-4">
            <a
              className="flex items-center gap-x-1.5 text-lg hover:text-primary"
              href={`YOUR_BLOCK_EXPLORER_URL/tx/${hash}`} // Replace with your block explorer
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver en explorador
            </a>
            {isLoadingDenyTx && <p>Firmando rechazo...</p>}
            {isSuccessDenyTx && <p>Rechazo confirmado</p>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
