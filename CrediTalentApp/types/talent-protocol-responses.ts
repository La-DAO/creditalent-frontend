export type TalentPassportType = {
  activity_score: number
  calculating_score: boolean
  created_at: string
  human_checkmark: boolean
  identity_score: number
  last_calculated_at: string
  main_wallet: string
  main_wallet_at: string
  merged: boolean
  nominations_received_count: number
  passport_id: number
  passport_profile: {
    bio: string
    display_name: string
    location: string
    tags: [string]
  }
  passport_socials: [
    {
      disconnected: boolean
      follower_count: number
      following_count: number
      location?: string
      profile_bio?: string
      profile_display_name?: string
      profile_image_url?: string
      profile_name?: string
      profile_url?: string
      source: string
    },
  ]
  pending_kyc: boolean
  score: number
  skills_score: number
  socials_calculated_at: string
  user: TalentPassportUser
  verified: boolean
  verified_wallets: [string]
}

export type FetchTalentPassportType = {
  passport: TalentPassportType
}

export type TalentPassportUser = {
  admin: boolean
  email?: string
  id: string
  name: string
  profile_picture_url: string
}
