import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { ASSET_TYPES, AssetType, CONTRACT_ADDRESSES } from "@/lib/constants"
import { toast } from "sonner"
import { CreditInfoType } from "@/types/creditalent-responses"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAccount } from "wagmi"
import { parseUnits } from "viem"
import { useToken } from "./onchain/hooks/useErc20"
import { borrowedCredit } from "@/controllers/creditalentApi"
import { useMorpho, MORPHO_CONTRACT_ADDRESS } from "./onchain/hooks/useMorpho"

interface RepayFormProps {
  creditInfo?: CreditInfoType;
  isLoading?: boolean;
}

export function RepayForm({ creditInfo, isLoading: isLoadingData }: RepayFormProps) {
  const [repayAmount, setRepayAmount] = useState("")
  const [selectedAsset, setSelectedAsset] = useState<AssetType>(ASSET_TYPES.XOC)
  const { address: userAddress } = useAccount()
  const token = useToken(selectedAsset)
  const { repay, isLoadingRepay, isSuccessRepay } = useMorpho()

  const hasApprovedApplications = creditInfo?.[selectedAsset]?.status === "APPROVED"
  const borrowedAmount = creditInfo?.[selectedAsset]?.borrowedAmount || 0

  useEffect(() => {
    if (isSuccessRepay) {
      const newBorrowedAmount = (creditInfo?.[selectedAsset]?.borrowedAmount || 0) - parseFloat(repayAmount)
      const newAmount = (creditInfo?.[selectedAsset]?.amount || 0) + parseFloat(repayAmount)
      borrowedCredit(userAddress as string, selectedAsset, newAmount, newBorrowedAmount)
      toast.success("Repayment successful!")
    }
  }, [isSuccessRepay, repayAmount, creditInfo, selectedAsset, userAddress])

  const onRepay = async () => {
    if (!userAddress) {
      toast.error("Please connect your wallet")
      return
    }

    if (!repayAmount || parseFloat(repayAmount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    if (parseFloat(repayAmount) > borrowedAmount) {
      toast.error("Amount exceeds your borrowed amount")
      return
    }

    try {
      const repayAmountInWei = parseUnits(repayAmount, 18)
      
      // Primero aprobar el token
      console.log("Approving token...")
      try {
        await token.approve(MORPHO_CONTRACT_ADDRESS, repayAmountInWei.toString())
        console.log("Token approved successfully")
      } catch (error) {
        console.error("Token approval failed:", error)
        toast.error("Token approval failed")
        return
      }

      // Configurar los parámetros del mercado
      const marketParams = {
        loanToken: token.address,
        collateralToken: CONTRACT_ADDRESSES.CREDIT_POINTS,
        oracle: CONTRACT_ADDRESSES.CREDIT_TALENT_CENTER[selectedAsset],
        irm: CONTRACT_ADDRESSES.IRM,
        lltv: BigInt(980000000000000000),
      }

      console.log("Executing repay with params:", {
        marketParams,
        amount: repayAmountInWei.toString(),
        userAddress
      })
      
      try {
        await repay(marketParams, repayAmountInWei, userAddress)
        console.log("Repay transaction submitted successfully")
        toast.success("Repay transaction submitted. Please wait for confirmation.")
      } catch (error) {
        console.error("Repay transaction failed:", error)
        toast.error("Failed to submit repay transaction. Please try again.")
        throw error
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      toast.error("Error processing repayment: " + errorMessage)
      console.error(error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Specify the quantity to repay
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="$0"
          className="text-lg"
          type="number"
          value={repayAmount}
          onChange={(e) => {
            const value = e.target.value
            if (value === "" || parseFloat(value) <= borrowedAmount) {
              setRepayAmount(value)
            }
          }}
          min={0}
          max={borrowedAmount}
          step="0.01"
          disabled={!hasApprovedApplications || isLoadingData || isLoadingRepay}
        />
        <Select
          value={selectedAsset}
          onValueChange={(value: AssetType) => setSelectedAsset(value)}
          disabled={isLoadingData || isLoadingRepay}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Select asset" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ASSET_TYPES).map((asset) => (
              <SelectItem key={asset} value={asset} className="uppercase">
                {asset}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={onRepay}
        disabled={!hasApprovedApplications || isLoadingData || isLoadingRepay || !repayAmount}
        className="w-full bg-[#FF4405] hover:bg-[#FF4405]/90"
      >
        {isLoadingRepay || isLoadingData ? (
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
        ) : (
          `Repay ${selectedAsset.toUpperCase()}`
        )}
      </Button>

      {!hasApprovedApplications && (
        <div className="text-center text-sm text-blue-600">
          No Approved Loan Applications yet, use &ldquo;Request a new CreditLine&rdquo; to
          access your credit
        </div>
      )}
    </div>
  );
}
