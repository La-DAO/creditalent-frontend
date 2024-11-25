import { Address } from "viem"

// Enums
export enum ApplicationStatus {
  PENDING,
  APPROVED,
  REJECTED
}

// Tipos de eventos
export type ApplicationApprovedEvent = {
  id: bigint
  applicant: Address
  underwriter: Address
  amount: bigint
  interestRate: bigint
}

export type ApplicationCreatedEvent = {
  id: bigint
  applicant: Address
  dataHash: `0x${string}`
}

export type ApplicationRejectedEvent = {
  id: bigint
  applicant: Address
  underwriter: Address
  reason: string
}

// Tipos de estructuras
export type ApplicationInfo = {
  id: bigint
  applicant: Address
  dataHash: `0x${string}`
  underwriter: Address
  status: ApplicationStatus
}

export type UnderwriterInfo = {
  underwriter: Address
  approvalAmount: bigint
}

export type UserLoanInfo = {
  creditLine: bigint
  borrowed: bigint
}

// Interfaz principal del contrato
export interface ICrediTalentCenter {
  // Constantes
  DEFAULT_ADMIN_ROLE: `0x${string}`
  DEFAULT_LLTV: bigint
  FLOATING_RATE: bigint
  UNDERWRITER_ROLE: `0x${string}`
  
  // Funciones de lectura
  applicationInfo: (address: Address) => Promise<ApplicationInfo>
  applications: () => Promise<bigint>
  getUserLoanInfo: (user: Address) => Promise<UserLoanInfo>
  underwriters: (address: Address) => Promise<UnderwriterInfo>
  hasRole: (role: `0x${string}`, account: Address) => Promise<boolean>
  
  // Funciones de escritura
  applyToCredit: (dataHash: `0x${string}`) => Promise<void>
  applyToUnderwrite: (amount: bigint) => Promise<void>
  approveCredit: (
    user: Address,
    applicationId: bigint, 
    amount: bigint,
    iRateWad: bigint
  ) => Promise<void>
  rejectCredit: (
    user: Address,
    applicationId: bigint,
    reason: string
  ) => Promise<void>
}

export const getApplicationExists = (application?: ApplicationInfo): boolean => {
  return parseInt(application?.id?.toString() ?? "") > 0;
};

