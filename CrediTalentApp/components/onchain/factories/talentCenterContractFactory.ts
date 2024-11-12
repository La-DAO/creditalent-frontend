import { AssetType } from "@/types/creditalent-responses"
import { Address } from "viem"

export const talentCenterContractFactory = (assetType: AssetType) => {
  const XOC_TALENT_CENTER_CONTRACT = "0xBD03d38828Bf0D56f1d325F96d4d48d4a2fa3549"
  const TALENT_TALENT_CENTER_CONTRACT = "" // TODO: SETUP 
  const USDC_TALENT_CENTER_CONTRACT = ""  // TODO: SETUP TALENT

  const TALENT_TALENT_CENTER_ABI = [{ "inputs": [{ "internalType": "address", "name": "implementation", "type": "address" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "stateMutability": "payable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }], "name": "AddressEmptyCode", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "implementation", "type": "address" }], "name": "ERC1967InvalidImplementation", "type": "error" }, { "inputs": [], "name": "ERC1967NonPayable", "type": "error" }, { "inputs": [], "name": "FailedInnerCall", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "implementation", "type": "address" }], "name": "Upgraded", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }]
  const USDC_TALENT_CENTER_ABI = [{ "inputs": [{ "internalType": "address", "name": "implementation", "type": "address" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "stateMutability": "payable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }], "name": "AddressEmptyCode", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "implementation", "type": "address" }], "name": "ERC1967InvalidImplementation", "type": "error" }, { "inputs": [], "name": "ERC1967NonPayable", "type": "error" }, { "inputs": [], "name": "FailedInnerCall", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "implementation", "type": "address" }], "name": "Upgraded", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }]
  const XOC_TALENT_CENTER_ABI = [{ "inputs": [{ "internalType": "address", "name": "implementation", "type": "address" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "stateMutability": "payable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "target", "type": "address" }], "name": "AddressEmptyCode", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "implementation", "type": "address" }], "name": "ERC1967InvalidImplementation", "type": "error" }, { "inputs": [], "name": "ERC1967NonPayable", "type": "error" }, { "inputs": [], "name": "FailedInnerCall", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "implementation", "type": "address" }], "name": "Upgraded", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }]
  try {
    if (assetType === 'xoc' && XOC_TALENT_CENTER_CONTRACT) {
      return {
        address: XOC_TALENT_CENTER_CONTRACT as Address,
        abi: XOC_TALENT_CENTER_ABI
      }
    } else if (assetType === 'usdc' && USDC_TALENT_CENTER_CONTRACT) {
      return {
        address: USDC_TALENT_CENTER_CONTRACT as Address,
        abi: USDC_TALENT_CENTER_ABI
      }
    } else if (assetType === 'talent' && TALENT_TALENT_CENTER_CONTRACT) {
      return {
        address: TALENT_TALENT_CENTER_CONTRACT as Address,
        abi: TALENT_TALENT_CENTER_ABI
      }
    }
  } catch (e) {
    console.log('🚀 ~ talentCenterContractFactory ~ e:', e)
    throw Error('Address Talent Center Not valid ')
  }
  throw Error('Address Talent Center require setup')
}