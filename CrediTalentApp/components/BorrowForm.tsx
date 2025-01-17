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
import { useMorpho } from "./onchain/hooks/useMorpho"

interface BorrowFormProps {
  creditInfo?: CreditInfoType;
  isLoading?: boolean;
}

export function BorrowForm({ creditInfo, isLoading: isLoadingData }: BorrowFormProps) {
  const [borrowAmount, setBorrowAmount] = useState("")
  const [selectedAsset, setSelectedAsset] = useState<AssetType>(ASSET_TYPES.XOC)
  const { address: userAddress } = useAccount()
  const token = useToken(selectedAsset)
  const { borrow, isLoadingBorrow, isSuccessBorrow } = useMorpho()

  const hasApprovedApplications = creditInfo?.[selectedAsset]?.status === "APPROVED"
  const availableCredit = creditInfo?.[selectedAsset]?.amount || 0

  useEffect(() => {
    if (isSuccessBorrow) {
      const newAmount = (creditInfo?.[selectedAsset]?.amount || 0) - parseFloat(borrowAmount)
      const newBorrowedAmount = (creditInfo?.[selectedAsset]?.borrowedAmount || 0) + parseFloat(borrowAmount)
      borrowedCredit(userAddress as string, selectedAsset, newAmount, newBorrowedAmount)
      toast.success("Borrow successful!")
    }
  }, [isSuccessBorrow, borrowAmount, creditInfo, selectedAsset, userAddress])

  const onBorrow = async () => {
    if (!userAddress) {
      toast.error("Please connect your wallet")
      return
    }

    if (!borrowAmount || parseFloat(borrowAmount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    if (parseFloat(borrowAmount) > availableCredit) {
      toast.error("Amount exceeds your available credit")
      return
    }

    try {
      const borrowAmountInWei = parseUnits(borrowAmount, 18)
      const marketParams = {
        loanToken: token.address,
        collateralToken: CONTRACT_ADDRESSES.CREDIT_POINTS,
        oracle: CONTRACT_ADDRESSES.CREDIT_TALENT_CENTER[selectedAsset],
        irm: CONTRACT_ADDRESSES.IRM,
        lltv: BigInt(980000000000000000),
      }

      await borrow(marketParams, borrowAmountInWei, BigInt(0), userAddress, userAddress)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      toast.error("Error processing loan: " + errorMessage)
      console.error(error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Specify the quantity to borrow
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="$0"
          className="text-lg"
          type="number"
          value={borrowAmount}
          onChange={(e) => {
            const value = e.target.value
            if (value === "" || parseFloat(value) <= availableCredit) {
              setBorrowAmount(value)
            }
          }}
          min={0}
          max={availableCredit}
          step="0.01"
          disabled={!hasApprovedApplications || isLoadingData || isLoadingBorrow}
        />
        <Select
          value={selectedAsset}
          onValueChange={(value: AssetType) => setSelectedAsset(value)}
          disabled={isLoadingData || isLoadingBorrow}
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
        onClick={onBorrow}
        disabled={!hasApprovedApplications || isLoadingData || isLoadingBorrow || !borrowAmount}
        className="w-full bg-[#FF4405] hover:bg-[#FF4405]/90"
      >
        {isLoadingBorrow || isLoadingData ? (
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
        ) : (
          `Borrow ${selectedAsset.toUpperCase()}`
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
