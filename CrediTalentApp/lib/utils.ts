import { AssetType } from "@/types/creditalent-responses"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Address, pad, toHex } from "viem"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertToBytes32 = (num: number): string => {
  return pad(toHex(num), { size: 32 })
}


export const isPassportTalentRequired = process.env.NEXT_PUBLIC_PASSPORT_TALENT_REQUIRED === 'true'

export const assetContractFactory = (assetType: AssetType): Address => {
  const {
    NEXT_PUBLIC_BASE_XOC_ERC20_CONTRACT,
    NEXT_PUBLIC_BASE_USDC_ERC20_CONTRACT,
    NEXT_PUBLIC_BASE_TALENT_ERC20_CONTRACT
  } = process.env

  try {
    if (assetType === 'xoc' && NEXT_PUBLIC_BASE_XOC_ERC20_CONTRACT) {
      return NEXT_PUBLIC_BASE_XOC_ERC20_CONTRACT as Address
    } else if ('usdc' && NEXT_PUBLIC_BASE_USDC_ERC20_CONTRACT) {
      return NEXT_PUBLIC_BASE_USDC_ERC20_CONTRACT as Address
    } else if ('talent' && NEXT_PUBLIC_BASE_TALENT_ERC20_CONTRACT) {
      return NEXT_PUBLIC_BASE_TALENT_ERC20_CONTRACT as Address
    }
  } catch(e) {
    throw Error('Address Asset Not valid')
  }
  throw Error('Address Asset require setup')
}

export const talentCenterContractFactory = (assetType: AssetType): Address => {

  const {
    NEXT_PUBLIC_BASE_XOC_TALENT_CENTER_CONTRACT,
    NEXT_PUBLIC_BASE_USDC_TALENT_CENTER_CONTRACT,
    NEXT_PUBLIC_BASE_TALENT_TALENT_CENTER_CONTRACT
  } = process.env
  try {
    if (assetType === 'xoc' && NEXT_PUBLIC_BASE_XOC_TALENT_CENTER_CONTRACT) {
      return NEXT_PUBLIC_BASE_XOC_TALENT_CENTER_CONTRACT as Address
    } else if ('usdc' && NEXT_PUBLIC_BASE_USDC_TALENT_CENTER_CONTRACT) {
      return NEXT_PUBLIC_BASE_USDC_TALENT_CENTER_CONTRACT as Address
    } else if ('talent' && NEXT_PUBLIC_BASE_TALENT_TALENT_CENTER_CONTRACT) {
      return NEXT_PUBLIC_BASE_TALENT_TALENT_CENTER_CONTRACT as Address
    }
  } catch(e) {
    throw Error('Address Talent Center Not valid')
  }
  throw Error('Address Talent Center require setup')
}