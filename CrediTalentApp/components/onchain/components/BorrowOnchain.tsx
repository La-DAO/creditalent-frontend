import { toast } from "sonner";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useMorpho } from "../hooks/useMorpho";
import { useToken } from "../hooks/useErc20";
import { AssetType } from "@/lib/constants";
import { useEffect } from "react";

interface BorrowOnchainProps {
  selectedAsset: AssetType;
  borrowAmount: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function BorrowOnchain({
  selectedAsset,
  borrowAmount,
  onSuccess,
  onError,
}: BorrowOnchainProps) {
  const { address: userAddress } = useAccount();
  const { borrow, isLoadingBorrow, isSuccessBorrow } = useMorpho();
  const token = useToken(selectedAsset);

  // HANDLE SUCCESS
  useEffect(() => {
    if (isSuccessBorrow) {
      toast.success("¡Préstamo exitoso!");
      onSuccess?.();
    }
  }, [isSuccessBorrow]);

  const handleBorrow = async () => {
    try {
      const borrowAmountInWei = parseUnits(borrowAmount, 18);
      const onBehalf = userAddress;
      const receiver = userAddress;
      const xocAddress = "0xBD03d38828Bf0D56f1d325F96d4d48d4a2fa3549";
      const creditTalentCenterAddress = "0xBD03d38828Bf0D56f1d325F96d4d48d4a2fa3549";
      const creditPointsAddress = "0xa3ceD4b017F17Fd4ff5a4f1786b7bBF8F8067B31";
      
      console.log('=== Borrow Parameters ===');
      console.log('Selected Asset:', selectedAsset);
      console.log('Token Address:', token.address);
      console.log('Amount Wei:', borrowAmountInWei.toString());
      console.log('On Behalf:', onBehalf);
      console.log('Receiver:', receiver);

      const marketParams = {
        loanToken: token.address,
        collateralToken: creditPointsAddress,
        oracle: creditTalentCenterAddress,
        irm: "0x46415998764C29aB2a25CbeA6254146D50D22687",
        lltv: BigInt(980000000000000000),
      };


      await borrow(
        marketParams,
        borrowAmountInWei,
        BigInt(0),
        onBehalf!,
        receiver!
      );
    } catch (error) {
      console.error("Error en el préstamo:", error);
      toast.error("Error al procesar el préstamo");
      onError?.(error as Error);
    }
  };

  return { handleBorrow, isLoadingBorrow };
}
