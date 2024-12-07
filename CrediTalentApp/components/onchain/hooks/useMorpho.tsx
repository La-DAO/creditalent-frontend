import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Address } from "viem";
import { MorphoABI } from "@/components/onchain/abis";

// Mainnet Morpho contract address
export const MORPHO_CONTRACT_ADDRESS = "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb" as const;

export type MarketParams = {
  loanToken: Address;
  collateralToken: Address;
  oracle: Address;
  irm: Address;
  lltv: bigint;
};

export const useMorpho = () => {
  const { writeContract: borrowAsync, data: borrowHash } = useWriteContract();
  const { writeContract: supplyAsync, data: supplyHash } = useWriteContract();
  const { writeContract: withdrawAsync, data: withdrawHash } = useWriteContract();
  const { writeContract: repayAsync, data: repayHash } = useWriteContract();

  const { isLoading: isLoadingBorrow, isSuccess: isSuccessBorrow, data: borrowReceipt } =
    useWaitForTransactionReceipt({ hash: borrowHash });
  const { isLoading: isLoadingSupply, isSuccess: isSuccessSupply } =
    useWaitForTransactionReceipt({ hash: supplyHash });
  const { isLoading: isLoadingWithdraw, isSuccess: isSuccessWithdraw } =
    useWaitForTransactionReceipt({ hash: withdrawHash });
  const { isLoading: isLoadingRepay, isSuccess: isSuccessRepay } =
    useWaitForTransactionReceipt({ hash: repayHash });

  console.log('🚀 ~ useMorpho ~ borrowReceipt:', borrowReceipt)
  const supply = async (
    marketParams: MarketParams,
    assets: bigint,
    onBehalf: Address,
  ) => {
    try {
      await supplyAsync({
        address: MORPHO_CONTRACT_ADDRESS,
        abi: MorphoABI,
        functionName: "supply",
        args: [marketParams, assets, onBehalf],
      });
    } catch (e) {
      console.error('Error in supply:', e);
    }
  };

  const withdraw = async (
    marketParams: MarketParams,
    assets: bigint,
    shares: bigint,
    onBehalf: Address,
    receiver: Address
  ) => {
    try {
      await withdrawAsync({
        address: MORPHO_CONTRACT_ADDRESS,
        abi: MorphoABI,
        functionName: "withdraw",
        args: [marketParams, assets, shares, onBehalf, receiver],
      });
    } catch (e) {
      console.error('Error in withdraw:', e);
    }
  };

  const borrow = async (
    marketParams: MarketParams,
    assets: bigint,
    shares: bigint,
    onBehalf: Address,
    receiver: Address
  ) => {
    try {
      const borrowResult = await borrowAsync({
        address: MORPHO_CONTRACT_ADDRESS,
        abi: MorphoABI,
        functionName: "borrow",
        args: [marketParams, assets, shares, onBehalf, receiver],
      });
      console.log(`borrowResult: ${borrowResult}`);
    } catch (e) {
      console.error('Error in borrow:', e);
    }
  };

  const repay = async (
    marketParams: MarketParams,
    assets: bigint,
    onBehalf: Address,
  ) => {
    try {
      await repayAsync({
        address: MORPHO_CONTRACT_ADDRESS,
        abi: MorphoABI,
        functionName: "repay",
        args: [marketParams, assets, onBehalf],
      });
    } catch (e) {
      console.error('Error in repay:', e);
    }
  };

  return {
    // Supply
    supply,
    isLoadingSupply,
    isSuccessSupply,

    // Withdraw
    withdraw,
    isLoadingWithdraw,
    isSuccessWithdraw,

    // Borrow
    borrow,
    isLoadingBorrow,
    isSuccessBorrow,

    // Repay
    repay,
    isLoadingRepay,
    isSuccessRepay,
  };
};
