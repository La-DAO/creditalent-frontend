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
) => {
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

    const resData = await response // Return the response data

    return resData
  } catch (error) {
    console.log(error)
    console.error('Error creating loan application:', error)
    return null
  }
}
