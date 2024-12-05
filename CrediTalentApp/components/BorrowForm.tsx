import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ASSET_TYPES, AssetType } from "@/lib/constants";
import { toast } from "sonner";
import { CreditInfoType } from "@/types/creditalent-responses";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useWriteContract } from "wagmi";
import { MORPHO_CONTRACT_ADDRESS } from "./onchain/hooks/useMorpho";
import { MorphoABI } from "@/components/onchain/abis";
import { parseUnits } from "viem";
import { useToken } from "./onchain/hooks/useErc20";

interface BorrowFormProps {
  creditInfo?: CreditInfoType;
  isLoading?: boolean;
}

export function BorrowForm({ creditInfo, isLoading: isLoadingData }: BorrowFormProps) {
  const [borrowAmount, setBorrowAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetType>(ASSET_TYPES.XOC);

  const hasApprovedApplications = creditInfo?.[selectedAsset]?.status === "APPROVED";
  const availableCredit = creditInfo?.[selectedAsset]?.amount || 0;

  // BORROW
  const { writeContract: borrowAsync, data: borrowHash } = useWriteContract();
  const { address: userAddress } = useAccount();
  const token = useToken(selectedAsset);

  const { isLoading: isLoadingBorrow, isSuccess: isSuccessBorrow } =
    useWaitForTransactionReceipt({ hash: borrowHash });


  // HANDLE SUCCESS
  useEffect(() => {
    if (isSuccessBorrow) {
      toast.success("¡Préstamo exitoso!");
    }
  }, [isSuccessBorrow]);

  const onBorrow = async () => {
    try {
      setIsLoading(true);

      if (!borrowAmount || parseFloat(borrowAmount) <= 0) {
        toast.error("Por favor ingresa una cantidad válida");
        return;
      }

      if (parseFloat(borrowAmount) > availableCredit) {
        toast.error("La cantidad excede tu crédito disponible");
        return;
      }

      try {

        const borrowAmountInWei = parseUnits(borrowAmount, 18);
        const onBehalf = userAddress;
        const receiver = userAddress;
        const creditTalentCenterAddress = "0xBD03d38828Bf0D56f1d325F96d4d48d4a2fa3549";
        const creditPointsAddress = "0xa3ceD4b017F17Fd4ff5a4f1786b7bBF8F8067B31";

        const marketParams = {
          loanToken: token.address,
          collateralToken: creditPointsAddress,
          oracle: creditTalentCenterAddress,
          irm: "0x46415998764C29aB2a25CbeA6254146D50D22687",
          lltv: BigInt(980000000000000000),
        };
        const payload = { 
          address: MORPHO_CONTRACT_ADDRESS,
          abi: MorphoABI,
          functionName: "borrow",
          args: [marketParams, borrowAmountInWei, BigInt(0), onBehalf, receiver],
        }

        console.log({
          address: payload.address,
          abi: payload.abi,
          functionName: payload.functionName,
          args: payload.args,
        })
        await borrowAsync(payload);
      } catch (e) {
        toast.error("Error: ", e.toString());
      }
    } catch (error) {
      toast.error("Error al procesar el préstamo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Specify the quantity to borrow V11
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="$0"
          className="text-lg"
          type="number"
          value={borrowAmount}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || parseFloat(value) <= availableCredit) {
              setBorrowAmount(value);
            }
          }}
          min={0}
          max={availableCredit}
          step="0.01"
          disabled={!hasApprovedApplications || isLoading || isLoadingData}
        />
        <Select
          value={selectedAsset}
          onValueChange={(value: AssetType) => setSelectedAsset(value)}
          disabled={isLoading || isLoadingData}
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
        disabled={!hasApprovedApplications || isLoading || isLoadingData || !borrowAmount}
        className="w-full bg-[#FF4405] hover:bg-[#FF4405]/90"
      >
        {isLoading || isLoadingBorrow || isLoadingData ? (
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
