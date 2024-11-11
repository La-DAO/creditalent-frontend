import { useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Button } from "../ui/button";
import { AssetType } from "@/types/creditalent-responses";
import { talentCenterContractFactory } from "./factories/talentCenterContractFactory";
import { toast } from "sonner";
import { erc20ContractFactory } from "./factories/erc20ContractFactory";
import { Loader2 } from "lucide-react";

export default function ApplytoUnderWriteButton({
  assetType,
  amount,
}: {
  assetType?: AssetType;
  amount: number;
}) {
  const { writeContractAsync: applytoUnderWrite } = useWriteContract();
  const { writeContractAsync: approveERC20, data: hash } = useWriteContract();

  const { isLoading: isLoadingApproveTx, isSuccess: isSuccessApproveTx } =
    useWaitForTransactionReceipt({ hash });

  const [isLoading, setIsLoading] = useState(false);

  // Function to handle deposit or withdraw
  const handleApplytoUnderWrite = async () => {
    if (!assetType) {
      console.error("Unknown Asset type: ", assetType);
      return;
    }
    try {
      const talentCenterContract = talentCenterContractFactory(assetType!);
      const erc20Contract = erc20ContractFactory(assetType!);
      const assetAmount = parseFloat(`${amount}`) || 0;
      const amountInWei = BigInt(assetAmount * 1e18);
      console.log("🚀 ~ handleApplytoUnderWrite ~ amountInWei:", amountInWei);

      setIsLoading(true);
      const txERC20 = await approveERC20({
        abi: erc20Contract.abi,
        address: erc20Contract.address,
        functionName: "approve",
        args: [talentCenterContract.address, amountInWei], // Convert amount to 18 decimals
      });

      const txTalentCenter = await applytoUnderWrite({
        abi: talentCenterContract.abi,
        address: talentCenterContract.address,
        functionName: "applyToUnderwrite",
        args: [amountInWei],
      });
      toast.success("Success");
    } catch (err) {
      console.error("Error executing deposit:", err);
      toast.error("Error on applyToUnderwrite ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      <Button
        className="bg-[#ff4405] hover:bg-[#ff4405]/90 text-white"
        disabled={!assetType || !amount || +amount <= 0}
        onClick={() => {
          handleApplytoUnderWrite();
        }}
      >
        {isLoading || isLoadingApproveTx ? (
          <Loader2 className="animate-spin h-5 w-5 mr-2" /> // Display Loader2 while loading
        ) : (
          "Depositar"
        )}
      </Button>
    </div>
  );
}
