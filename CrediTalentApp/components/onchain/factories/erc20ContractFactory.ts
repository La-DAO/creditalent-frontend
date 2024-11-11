import { AssetType } from "@/types/creditalent-responses"
import { Address } from "viem"


export const erc20ContractFactory = (assetType: AssetType): { address: Address; abi: any } => {
    const XOC_ERC20_CONTRACT = "0x4eE906B7135bDBdfC83FE40b8f2156C99FCB64c2"
    const USDC_ERC20_CONTRACT = "" // TODO: SETUP USDC
    const TALENT_ERC20_CONTRACT = "" // TODO: SETUP TALENT

    // SETUP ABIS
    const TALENT_ERC20_ABI: [] = [] // TODO: SETUP TALENT 
    const USDC_ERC20_ABI: [] = [] // TODO: SETUP USDC
    const XOC_ERC20_ABI = [
        {
            inputs: [
                { internalType: "string", name: "mockName", type: "string" },
                { internalType: "string", name: "mockSymbol", type: "string" },
                { internalType: "address", name: "owner", type: "address" },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "src", type: "address" },
                { indexed: true, internalType: "address", name: "guy", type: "address" },
                { indexed: false, internalType: "uint256", name: "wad", type: "uint256" },
            ],
            name: "Approval",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "dst", type: "address" },
                { indexed: false, internalType: "uint256", name: "wad", type: "uint256" },
            ],
            name: "Deposit",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
                { indexed: true, internalType: "address", name: "newOwner", type: "address" },
            ],
            name: "OwnershipTransferred",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "src", type: "address" },
                { indexed: true, internalType: "address", name: "dst", type: "address" },
                { indexed: false, internalType: "uint256", name: "wad", type: "uint256" },
            ],
            name: "Transfer",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "src", type: "address" },
                { indexed: false, internalType: "uint256", name: "wad", type: "uint256" },
            ],
            name: "Withdrawal",
            type: "event",
        },
        {
            inputs: [
                { internalType: "address", name: "", type: "address" },
                { internalType: "address", name: "", type: "address" },
            ],
            name: "allowance",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "guy", type: "address" },
                { internalType: "uint256", name: "wad", type: "uint256" },
            ],
            name: "approve",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "", type: "address" }],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "decimals",
            outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
            stateMutability: "view",
            type: "function",
        },
        { inputs: [], name: "deposit", outputs: [], stateMutability: "payable", type: "function" },
        {
            inputs: [
                { internalType: "address", name: "account", type: "address" },
                { internalType: "uint256", name: "value", type: "uint256" },
            ],
            name: "mint",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "name",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
        {
            inputs: [],
            name: "symbol",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "totalSupply",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "dst", type: "address" },
                { internalType: "uint256", name: "wad", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "src", type: "address" },
                { internalType: "address", name: "dst", type: "address" },
                { internalType: "uint256", name: "wad", type: "uint256" },
            ],
            name: "transferFrom",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "uint256", name: "wad", type: "uint256" }],
            name: "withdraw",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        { stateMutability: "payable", type: "receive" },
    ]

    try {
        if (assetType === 'xoc' && XOC_ERC20_CONTRACT) {
            return {
                address: XOC_ERC20_CONTRACT as Address,
                abi: XOC_ERC20_ABI
            }
        } else if (assetType === 'usdc' && USDC_ERC20_CONTRACT) {
            return {
                address: USDC_ERC20_CONTRACT as Address,
                abi: USDC_ERC20_ABI
            }
        } else if (assetType === 'talent' && TALENT_ERC20_CONTRACT) {
            return {
                address: TALENT_ERC20_CONTRACT as Address,
                abi: TALENT_ERC20_ABI
            }
        }
    } catch (e) {
        throw Error('Address Asset Not valid')
    }
    throw Error('Address Asset require setup')
}