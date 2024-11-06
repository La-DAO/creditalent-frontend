import { TalentPassportType } from '../types/talent-protocol-responses'

export const fetchIdentityScore = async (
  walletAddress: string,
): Promise<number | null> => {
  const apiKey = process.env.NEXT_PUBLIC_TALENT_API_KEY

  if (!apiKey) {
    throw new Error('API key is not defined')
  }

  try {
    const response = await fetch(
      `https://api.talentprotocol.com/api/v2/passports/${walletAddress}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': apiKey, // Use the correct API key header
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch identity score: ${response.status}`)
    }

    const data = await response.json()
    console.log('API Response:', data) // Log the full response to inspect it

    return data?.passport?.identity_score ?? null // Extract identity score or return null
  } catch (error) {
    console.error('Error fetching identity score:', error)
    return null
  }
}

export const fetchTalentPassport = async (
  walletAddress: string,
): Promise<TalentPassportType | null> => {
  const apiKey = process.env.NEXT_PUBLIC_TALENT_API_KEY

  if (!apiKey) {
    throw new Error('API key is not defined')
  }

  try {
    const response = await fetch(
      `https://api.talentprotocol.com/api/v2/passports/${walletAddress}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': apiKey, // Use the correct API key header
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch identity score: ${response.status}`)
    }

    const data = await response.json()
    console.log('API Response:', data) // Log the full response to inspect it

    return (data?.passport as TalentPassportType) ?? null // Extract identity score or return null
  } catch (error) {
    console.error('Error fetching identity score:', error)
    return null
  }
}
