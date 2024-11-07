
export type CreateLoanApplicationData = {
  amount: number
  availableCreditLine: number
  status?: string
  xocScore: number
  builderScore: number
  nominationsReceived: number
  followers: number
  walletId: string
  applicantId: number
  creditLineId: number
  reviewedById?: number
}

export type LoanApplication = {
  amount: number
  availableCreditLine: number
  status?: string
  xocScore: number
  builderScore: number
  nominationsReceived: number
  followers: number
  walletId: string
  applicantId: number
  creditLineId: number
  reviewedById?: number
}