'use client'

import React, { useEffect, useState } from 'react'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { CreditTalentCenterABI } from '@/components/onchain/abis/xoc/CreditTalentCenter'
import { LoanApplicationExtended } from '@/types/creditalent-responses'
// import { ERC20ABI } from '@/components/onchain/abis/erc20'
// import { parseUnits, parseEther, maxInt256 } from 'viem' // Import parseEther

export function ApproveModalButton({
  loanApplication,
}: {
  loanApplication: LoanApplicationExtended
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState(loanApplication?.amount?.toString())
  const [isLoading, setIsLoading] = useState(false)

  // TALENT CENTER
  const {
    data: applyToUnderwriteHash,
    writeContractAsync: applyToUnderwrite,
    isPending: isApplyToUnderwritePending,
  } = useWriteContract()

  const {
    data: approveCreditHash,
    writeContractAsync: approveCredit,
    isPending: isApproveCreditPending,
  } = useWriteContract()

  const {
    isLoading: isLoadingApplyToUnderwriteTx,
    // isSuccess: isApplyToUnderwriteConfirmed,
  } = useWaitForTransactionReceipt({ hash: applyToUnderwriteHash })
  const { isLoading: isLoadingApproveTx, isSuccess: isSuccessApproveTx } =
    useWaitForTransactionReceipt({ hash: approveCreditHash })

  const handleApprove = async () => {
    const assetAmount = parseFloat(amount) || 0
    const amountInWei = BigInt(assetAmount * 1e18)
    const maxUint256BigNumber = BigInt(
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    )
    const CREDIT_TALENT_CENTER_CONTRACT =
      '0x0E44B48406b5E7Bba4E6d089542719Cb2577d444'
    try {
      await applyToUnderwrite({
        address: CREDIT_TALENT_CENTER_CONTRACT,
        abi: CreditTalentCenterABI,
        functionName: 'applyToUnderwrite',
        args: [amountInWei],
      })

      await approveCredit({
        address: CREDIT_TALENT_CENTER_CONTRACT,
        abi: CreditTalentCenterABI,
        functionName: 'approveCredit',
        args: [
          loanApplication.walletId,
          loanApplication.id,
          amountInWei,
          maxUint256BigNumber,
        ],
      })

      // TODO: update DB

      toast.success('Solicitud de aprobación enviada!') // Success message
      setIsOpen(false)
    } catch (error) {
      console.error('Approve failed:', error)
      toast.error(
        'Hubo un error al aprobar la solicitud. Por favor, inténtalo de nuevo.',
      )
    }
  }

  useEffect(() => {
    async function updateLoanApp() {
      if (!loanApplication.id) {
        return toast.error(
          'No existe id para esta solicitud, contactar al admin',
        )
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

      setIsLoading(false)
    }

    if (isSuccessApproveTx) {
      updateLoanApp()
    }
  }, [isSuccessApproveTx, loanApplication.id])

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
          </DialogTitle>{' '}
          {/* Changed title */}
          <DialogDescription className="text-center text-base">
            ¿Estás seguro que quieres aprobar la solicitud de{' '}
            {loanApplication.applicant?.name}? {/* Added applicant name */}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid gap-4">
          <div>
            <Label htmlFor="amount">Cantidad a Aprobar (ETH)</Label>{' '}
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
              className="border-secondary bg-secondary hover:bg-secondary/60"
              onClick={handleApprove}
              disabled={
                isApplyToUnderwritePending ||
                isApproveCreditPending ||
                !amount ||
                isLoading
              }
            >
              {' '}
              {/* Changed variant */}
              {isLoadingApplyToUnderwriteTx ||
              isLoadingApproveTx ||
              isLoading ? (
                <span>Aprobando...</span>
              ) : (
                'Aprobar'
              )}{' '}
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
  )
}
