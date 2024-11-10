import { Address, Abi } from "viem";
import { useWriteContract } from "wagmi";
import Pool from "@/components/onchain/abis/Pool";



// Pool contract details directly inside the hook
const poolContract = {
  address: "0x7a8AE9bB9080670e2BAFb6Df3EA62968F4Ad8a88", // Pool contract address
  abi: Pool
};


/**
 * Custom hook to handle supply transactions.
 * @returns {Object} - The supply handler function and contract interaction states.
 */
const useSupply = () => {
  const { writeContract, isPending, status, error, data } = useWriteContract();

  const handleSupply = (asset: Address, amount: bigint, onBehalfOf: Address, referralCode = 0) => {
    try {
      writeContract({
        abi: poolContract.abi as Abi,
        address: poolContract.address as Address,
        functionName: "supply",
        args: ["0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf", amount, onBehalfOf, referralCode],
      });
    } catch (err) {
      console.error("Error executing contract function:", err);
    }
  };

  return { handleSupply,isPending, status, isError: !!error, error, data };
};

export default useSupply;
