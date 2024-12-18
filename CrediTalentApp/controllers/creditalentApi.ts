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
    console.log('Credit Talent API Response - createLoanApplication:', resData)

    return +resData
  } catch (error) {
    console.log(error)
    console.error('Error creating loan application:', error)
    return null
  }
}

export const approveLoanApplication = async (
  applicationId: number, 
  walletId: string,
  assetType: string,
  approvedAmount: number
) => {
  try {
    const data = { applicationId, walletId, assetType, amount: approvedAmount }
    console.log('🚀 ~ approveLoanApplication ~ data:', data)
    const response = await fetch(`${process.env.NEXT_PUBLIC_CREDITALENT_API_URL}/api/loan-applications/approve`, {
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
    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

// Borrow
export const borrowedCredit = async (
  walletId: string,
  assetType: string,
  amount: number,
  borrowedAmount: number,
) => {
  try {
    console.log('🚀 ~ borrowedCredit ~ walletId:', walletId)
    console.log('🚀 ~ borrowedCredit ~ assetType:', assetType)
    console.log('🚀 ~ borrowedCredit ~ amount:', amount)
    console.log('🚀 ~ borrowedCredit ~ borrowedAmount:', borrowedAmount)
    
    // Construir URL con query params
    const url = new URL(`${process.env.NEXT_PUBLIC_CREDITALENT_API_URL}/api/credit-info`);
    url.searchParams.append('walletId', walletId);
    url.searchParams.append('assetType', assetType);

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, borrowedAmount }),
    })

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create loan application')
      }
    console.log('Credit Talent API Response - borrowedCredit:', response)
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
    console.log('Credit Talent API Response - saveApproveCreditInfo:', response)
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
    console.log('Credit Talent API Response - saveRejectedCreditInfo:', response)
    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const saveMarketIdCreditInfo = async (
  walletId: string,
  assetType: string,
  marketId: string,
) => {
  try {
    console.log( 'saveMarketIdCreditInfo', walletId, assetType, marketId );
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_CREDITALENT_API_URL}/api/credit-info`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletId, assetType, marketId }),
    })

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create loan application')
      }
    console.log('Credit Talent API Response - saveMarketIdCreditInfo:', response)
    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
