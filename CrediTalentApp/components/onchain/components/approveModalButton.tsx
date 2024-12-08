"use client";

import React, { useEffect, useState } from "react";
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
import { LoanApplicationExtended } from "@/types/creditalent-responses";
import { Loader2 } from "lucide-react";
import { AssetType } from "@/lib/constants";
import { useCreditTalentCenter } from "../hooks/useCreditTalentCenter";
import { Address } from "viem";
import { approveLoanApplication } from "@/controllers/creditalentApi";

const MAX_UINT256 = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

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
    approveCredit,
    isLoadingApproveCredit,
    isSuccessApproveCredit,
  } = useCreditTalentCenter(assetType!);

  // Monitorear éxito de la transacción
  useEffect(() => {
    if (isSuccessApproveCredit) {
      toast.success("¡Solicitud aprobada exitosamente!");
      setIsOpen(false);
      setIsLoading(false);
    }
  }, [isSuccessApproveCredit]);

  const handleApprove = async () => {
    if (!assetType || !amount) {
      toast.error("Por favor, ingresa un monto válido");
      return;
    }

    try {
      setIsLoading(true);
      const applicationId = BigInt(loanApplication?.applicantId);
      
      // Usar el hook para aprobar el crédito
      await approveCredit(
        loanApplication.walletId as Address,
        applicationId,
        amount,
        BigInt(MAX_UINT256)
      );

      // La llamada a la API se mantiene
      await approveLoanApplication(
        loanApplication.id as number, 
        loanApplication.walletId, 
        assetType, 
        +amount
      );

    } catch (err) {
      console.error('Error en approveCredit:', err);
      toast.error("Error al procesar la aprobación");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#FF4405] hover:bg-[#FF4405]/90 text-white"
        >
          Aprobar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[576px] lg:max-w-[768px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Aprobar Solicitud
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            ¿Estás seguro que quieres aprobar la solicitud de{" "}
            {loanApplication.applicant?.name}?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid gap-4">
          <div>
            <Label htmlFor="amount">Cantidad a Aprobar (ETH)</Label>
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
              disabled={isLoadingApproveCredit || !amount || isLoading}
            >
              {isLoadingApproveCredit || isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>Procesando...</span>
                </div>
              ) : (
                "Aprobar"
              )}
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
