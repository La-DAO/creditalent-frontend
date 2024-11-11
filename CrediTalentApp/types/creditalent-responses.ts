
export type CreateLoanApplicationData = {
  amount: number
  availableCreditLine: number
  status?: string
  userName?: string
  userPictureUrl?: string
  assetType: string
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

export interface LoanApplicationExtended extends CreateLoanApplicationData {
  id?: number
  creditLine?: CreditLine
  applicant?: PassportProfileExtended
  reviewedBy?: UnderwriterProfile
}

export interface PassportProfileExtended extends CreatePassportProfileData {
  id?: number
  creditLine?: CreditLine
  loans: Loan[]
  loanApplications: LoanApplication[]
  underwriterProfile?: UnderwriterProfile
}

export type  Loan = {
  id: number
  status: string
  createdAt: Date
  updatedAt: Date
  amount: number
  walletId: string
  creditLineId: number
  pendingBalance: number
  dueDate: Date
  borrowerId: number
  loanApplicationId: number
}


export type CreatePassportProfileData = {
  dynamicUserId: string
  dynamicWallet: string
  mainWallet: string
  verifiedWallets: string[]
  talentPassportId: number
  talentUserId: string
  name: string
  profilePictureUrl: string
  verified: boolean
  humanCheck: boolean
  score: number
  activityScore: number
  identityScore: number
  skillsScore: number
  nominationsReceived: number
  socialsLinked: number
  followerCount: number
  totalLimit?: number
}


export type CreditLine = {
  id: number
  walletId: string
  createdAt: Date
  updatedAt: Date
  borrowerId: number
  totalLimit: number
  availableLimit: number
  creditStatus:string
  isOverdue: boolean
}

type UnderwriterProfile = {
  id: number
  status: string
  name: string
  createdAt: Date
  updatedAt: Date
  passportProfileId: number
}


export type CreditInfoType = {
  walletId: string
  xoc: CreditInfo
  talent: CreditInfo
  usdc: CreditInfo
}

type CreditInfo = {
  amount: number
  status:string
}


export  type AssetType = 'xoc' | 'usdc' | 'talent'
