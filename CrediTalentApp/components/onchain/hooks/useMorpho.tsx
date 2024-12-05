import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Address } from "viem";
import MorphoABI from "@/abis/contracts/Morpho.json";

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
  
  const { isLoading: isLoadingBorrow, isSuccess: isSuccessBorrow } = 
  useWaitForTransactionReceipt({ hash: borrowHash });

  const borrow = async (
    marketParams: MarketParams,
    assets: bigint,
    shares: bigint,
    onBehalf: Address,
    receiver: Address
  ) => {
    console.log('🚀 ~ useMorpho ~ borrow:', {
      address: MORPHO_CONTRACT_ADDRESS,
      abi: MorphoABI,
      functionName: "borrow",
      args: [marketParams, assets, shares, onBehalf, receiver],
    })
 
    try {
      await borrowAsync({
        address: MORPHO_CONTRACT_ADDRESS,
        abi: MorphoABI,
        functionName: "borrow",
        args: [marketParams, assets, shares, onBehalf, receiver],
      });
    } catch(e){
      console.log('🔴🔴🔴🔴🔴 ~ borrow ~ e:', e)
    }
  };

  return {
    isLoadingBorrow,
    isSuccessBorrow,
    borrow,
  };
};