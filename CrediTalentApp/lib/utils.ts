import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { pad, toHex } from "viem"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertToBytes32 = (num: number): string => {
  return pad(toHex(num), { size: 32 })
}
export const isPassportTalentRequired = process.env.NEXT_PUBLIC_PASSPORT_TALENT_REQUIRED === 'true'
