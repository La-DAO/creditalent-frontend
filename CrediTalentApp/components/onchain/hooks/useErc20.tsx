import {
    useReadContract,
    useWriteContract,
    useWaitForTransactionReceipt,
  } from "wagmi";
  import { parseUnits, Address } from "viem";
  import { useState } from "react";
  import { ERC20ABI } from "@/abis";
  import { ASSET_TYPES, AssetType } from "@/lib/constants";
  
  export const TOKEN_ADDRESSES: Record<AssetType, Address> = {
    [ASSET_TYPES.XOC]: "0x4eE906B7135bDBdfC83FE40b8f2156C99FCB64c2",
    [ASSET_TYPES.USDC]: "0x03e5f3a1ae8faea9d8ec56a3ed1e708cfede1970",
    [ASSET_TYPES.TALENT]: "0xaAE22ccff30E636BDa436D54E5efea72227B2868"
  } as const;
  
  type TokenType = keyof typeof TOKEN_ADDRESSES;
  
  export const useToken = (tokenType: TokenType) => {
    const [isPending, setIsPending] = useState(false);
  
    // Leer nombre del token
    const { data: name } = useReadContract({
      address: TOKEN_ADDRESSES[tokenType],
      abi: ERC20ABI,
      functionName: "name"
    });
  
    // Leer símbolo
    const { data: symbol } = useReadContract({
      address: TOKEN_ADDRESSES[tokenType],
      abi: ERC20ABI,
      functionName: "symbol"
    });
  
    // Leer decimales
    const { data: decimals } = useReadContract({
      address: TOKEN_ADDRESSES[tokenType],
      abi: ERC20ABI,
      functionName: "decimals"
    });
  
    // Leer suministro total
    const { data: totalSupply } = useReadContract({
      address: TOKEN_ADDRESSES[tokenType],
      abi: ERC20ABI,
      functionName: "totalSupply"
    });
  
    // Aprobar tokens
    const { writeContract: approveAsync, data: approveHash } = useWriteContract();
  
    const { isLoading: isLoadingApprove, isSuccess: isSuccessApprove } = 
      useWaitForTransactionReceipt({ hash: approveHash });
  
    const approve = async (spender: Address, amount: string) => {
      try {
        setIsPending(true);
        await approveAsync({
          address: TOKEN_ADDRESSES[tokenType],
          abi: ERC20ABI,
          functionName: "approve",
          args: [spender, parseUnits(amount, 18)]
        });
      } finally {
        setIsPending(false);
      }
    };
  
    // Transferir tokens
    const { writeContract: transferAsync } = useWriteContract();
  
    const transfer = async (to: Address, amount: string) => {
      try {
        setIsPending(true);
        await transferAsync({
          address: TOKEN_ADDRESSES[tokenType],
          abi: ERC20ABI,
          functionName: "transfer",
          args: [to, parseUnits(amount, 18)]
        });
      } finally {
        setIsPending(false);
      }
    };
  
    return {
      // Direcciones
      address: TOKEN_ADDRESSES[tokenType],
      
      // Datos del token
      name,
      symbol,
      decimals,
      totalSupply,
      isPending,
      isLoadingApprove,
      isSuccessApprove,
  
      // Funciones
      approve,
      transfer
    };
  };