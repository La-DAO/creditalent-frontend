import { CreateLoanApplicationData, LoanApplicationExtended } from '../types/creditalent-responses'


export const fetchLoanApplications =
  async (): Promise<LoanApplicationExtended | null> => {
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_CREDITALENT_API_URL}/api/loan-applications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch identity score: ${response.status}`)
      }

      const data = await response.json()
      console.log('API creditalentApi  Response:', data) // Log the full response to inspect it

      return data
    } catch (error) {
      console.log(error)
      console.error('Error fetching loan applications:', error)
      return null
    }
  }

export const createLoanApplication = async (
  data: CreateLoanApplicationData,
):  Promise<number | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CREDITALENT_API_URL}/api/loan-applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create loan application')
    }

    const resData = await response.json() // Return the response data
    console.log('🚀 ~ resData:', resData)

    return +resData
  } catch (error) {
    console.log(error)
    console.error('Error creating loan application:', error)
    return null
  }
}

export const getCreditInfo = async (
  walletAddress: string,
) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CREDITALENT_API_URL}/api/credit-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletId: walletAddress }),
    })

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create loan application')
      }
    console.log('🚀 ~ response:', response)
    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}


export const saveApproveCreditInfo = async (
  applicationId: number, 
  walletId: string,
  assetType: string,
  approvedAmount: number
) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CREDITALENT_API_URL}/api/credit-info`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ applicationId, walletId, assetType,  status: 'APPROVED', amount: approvedAmount }),
    })

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create loan application')
      }
    console.log('🚀 ~ response:', response)
    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
export const saveRejectedCreditInfo = async (
  applicationId: number, 
  walletId: string,
  assetType: string,
  rejectedReason: string,
) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CREDITALENT_API_URL}/api/credit-info`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({applicationId,  walletId, assetType, status: 'REJECTED', rejectedReason }),
    })

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create loan application')
      }
    console.log('🚀 ~ response:', response)
    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
