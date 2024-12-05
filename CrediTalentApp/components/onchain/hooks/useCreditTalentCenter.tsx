import {
  useReadContract,
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
  useClient,
} from "wagmi";
import { parseEther, Address } from "viem";
import { useState } from "react";
import { CreditTalentCenterABI } from "@/components/onchain/abis";
import { ASSET_TYPES, AssetType } from "@/lib/constants";
import { ApplicationInfo, ApplicationStatus } from "@/types/contracts/CreditalentCenter";
import { readContract } from "viem/actions";

const CONTRACT_ADDRESSES: Record<AssetType, Address> = {
  [ASSET_TYPES.XOC]: "0xBD03d38828Bf0D56f1d325F96d4d48d4a2fa3549",
  [ASSET_TYPES.USDC]: "0x9A41029a07Ca57873CAd637384671349Fc9e8D9C",
  [ASSET_TYPES.TALENT]: "0x465d5decA1A8d4c93e7D6a97018F0EFfCe56D247",
};

export const useCreditTalentCenter = (assetType: AssetType) => {
  const { address } = useAccount();
  const [isPending, setIsPending] = useState(false);
  const client = useClient();

  // Leer aplicación
  const { data: applicationData } = useReadContract({
    address: CONTRACT_ADDRESSES[assetType],
    abi: CreditTalentCenterABI,
    functionName: "applicationInfo",
    args: [address],
    query: {
      enabled: true,
    },
  }) as { data: [bigint, Address, `0x${string}`, Address, ApplicationStatus] };

  const getApplicationInfoAsync = async () => {
    try {
      const data = await readContract(client!, {
        address: CONTRACT_ADDRESSES[assetType],
        abi: CreditTalentCenterABI,
        functionName: "applicationInfo",
        args: [address],
      }) as [bigint, Address, `0x${string}`, Address, ApplicationStatus];

      return data ? {
        id: data[0],
        applicant: data[1],
        dataHash: data[2],
        underwriter: data[3],
        status: data[4]
      } as ApplicationInfo : undefined;
    } catch (error) {
      console.error("Error refreshing application:", error);
    }
  };

  // Leer información de préstamo
  const { data: loanInfo } = useReadContract({
    address: CONTRACT_ADDRESSES[assetType],
    abi: CreditTalentCenterABI,
    functionName: "getUserLoanInfo",
    args: [address],
    query: {
      enabled: true,
    },
  });


  // Verificar rol de underwriter
  const { data: isUnderwriter } = useReadContract({
    address: CONTRACT_ADDRESSES[assetType],
    abi: CreditTalentCenterABI,
    functionName: "hasRole",
    args: [
      "0xf63acc52fa4ad8a2695e14522f3df504db5c225cdd3d3a5acd3569b444572187",
      address,
    ],
  });

  // Aplicar para crédito
  const { writeContract: applyToCreditAsync, data: applyToCreditHash } = useWriteContract();
  const {
    isLoading: isLoadingApplyToCredit,
    isSuccess: isSuccessApplyToCredit,
  } = useWaitForTransactionReceipt({ hash: applyToCreditHash });

  const applyForCredit = async (dataHash: string) => {
    try {
      setIsPending(true);
      await applyToCreditAsync({
        address: CONTRACT_ADDRESSES[assetType],
        abi: CreditTalentCenterABI,
        functionName: "applyToCredit",
        args: [dataHash],
      });
      return applyToCreditHash;
    } finally {
      setIsPending(false);
    }
  };

  // Aplicar para ser underwriter
  const { writeContract: applyToUnderwriteAsync, data: applyToUnderwriteHash } = useWriteContract();
  const {
    isLoading: isLoadingApplyToUnderwrite,
    isSuccess: isSuccessApplyToUnderwrite,
  } = useWaitForTransactionReceipt({ hash: applyToUnderwriteHash });

  const applyForUnderwriting = async (amount: string) => {
    try {
      setIsPending(true);
      await applyToUnderwriteAsync({
        address: CONTRACT_ADDRESSES[assetType],
        abi: CreditTalentCenterABI,
        functionName: "applyToUnderwrite",
        args: [parseEther(amount)],
      });
    } finally {
      setIsPending(false);
    }
  };

  // Aprobar solicitud de crédito
  const { writeContract: approveCreditAsync, data: approveCreditHash } = useWriteContract();
  const {
    isLoading: isLoadingApproveCredit,
    isSuccess: isSuccessApproveCredit,
  } = useWaitForTransactionReceipt({ hash: approveCreditHash });

  const approveCredit = async (
    user: Address,
    applicationId: bigint,
    amount: string,
    interestRate: bigint
  ) => {
    try {
      setIsPending(true);
      await approveCreditAsync({
        address: CONTRACT_ADDRESSES[assetType],
        abi: CreditTalentCenterABI,
        functionName: "approveCredit",
        args: [user, applicationId, parseEther(amount), interestRate],
      });
    } finally {
      setIsPending(false);
    }
  };

  // Rechazar solicitud de crédito
  const { writeContract: rejectCreditAsync, data: rejectCreditHash } = useWriteContract();
  const {
    isLoading: isLoadingRejectCredit,
    isSuccess: isSuccessRejectCredit,
  } = useWaitForTransactionReceipt({ hash: rejectCreditHash });

  const rejectCredit = async (
    user: Address,
    applicationId: bigint,
    reason: string
  ) => {
    try {
      setIsPending(true);
      await rejectCreditAsync({
        address: CONTRACT_ADDRESSES[assetType],
        abi: CreditTalentCenterABI,
        functionName: "rejectCredit",
        args: [user, applicationId, reason],
      });
    } finally {
      setIsPending(false);
    }
  };

  // Transformar los datos en el tipo ApplicationInfo
  const application = applicationData ? {
    id: applicationData[0] ,
    applicant: applicationData[1],
    dataHash: applicationData[2],
    underwriter: applicationData[3],
    status: applicationData[4]
  } as ApplicationInfo : undefined;

  return {
    // Estado
    application,
    loanInfo,
    isUnderwriter,
    isPending,
    isLoadingApplyToCredit,
    isSuccessApplyToCredit,
    isLoadingApplyToUnderwrite, 
    isSuccessApplyToUnderwrite,
    isLoadingApproveCredit,
    isSuccessApproveCredit,
    isLoadingRejectCredit,
    isSuccessRejectCredit,

    // Acciones
    applyForCredit,
    applyForUnderwriting,
    approveCredit,
    rejectCredit,

    getApplicationInfoAsync

  };
};
