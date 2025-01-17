import { useReadContract, useAccount } from "wagmi";
import { AssetType } from "@/lib/constants";
import CreditTalentHelperABI from "@/components/onchain/abis/UICreditTalentHelper";
import { useCreditTalentCenter } from "./useCreditTalentCenter";

const CREDIT_HELPER_ADDRESS = '0xb99737fbf4252a521389d47256e4938e0f030ed1'

type UserCreditInfo = {
  availableCreditLine: bigint;
  currentDebtBalance: bigint;
  borrowInterestRatePerSecond: bigint;
};

export const useUICreditTalentHelper = (assetType: AssetType) => {
  const { address } = useAccount();
  const creditalentCenter = useCreditTalentCenter(assetType)

  // Get user credit information
  const { data: rawCreditData } = useReadContract({
    address: CREDIT_HELPER_ADDRESS,
    abi: CreditTalentHelperABI,
    functionName: "getUserLoanInfo",
    args: [creditalentCenter.address, address],
    query: {
      enabled: !!address,
    },
  }) as { data: [bigint, bigint, bigint] | undefined };

  // Transform the raw blockchain data into a structured format
  const formattedCreditInfo = rawCreditData ? {
    availableCreditLine: rawCreditData[0],
    currentDebtBalance: rawCreditData[1],
    borrowInterestRatePerSecond: rawCreditData[2]
  } : undefined;

  return {
    address: CREDIT_HELPER_ADDRESS,
    loanInfo: formattedCreditInfo as UserCreditInfo | undefined,
  };
};
