import { useEffect, useState } from 'react'
import { Address, formatUnits, parseEther } from 'viem'
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { useBalanceOf } from '@/hooks/useBalanceOf'
import { ERC20ABI } from '@/components/onchain/abis/erc20'
import CreditTalentCenterABI from '@/components/onchain/abis/CreditTalentCenter'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'

const xocContract = '0x4eE906B7135bDBdfC83FE40b8f2156C99FCB64c2'
const spenderAddress = '0x0E44B48406b5E7Bba4E6d089542719Cb2577d444'
const creditTalentCenterAddress = '0x0E44B48406b5E7Bba4E6d089542719Cb2577d444'

export default function UnderwriterModal() {
  const { address: accountAddress } = useAccount()
  const [amount, setAmount] = useState<number | string>('') // input state
  const [action, setAction] = useState<'Deposit' | 'Withdraw'>('Deposit')
  const [xocAllowanceState, xocSetAllowanceState] = useState<string>('0')
  const [xocError, setXocError] = useState<string | null>(null)
  const [requiresApproval, setRequiresApproval] = useState(false) // Track approval need

  const { writeContractAsync: deposit } = useWriteContract()
  const { writeContractAsync: approveERC20, data: approveHash } =
    useWriteContract()
  const { writeContractAsync: withdraw } = useWriteContract()

  const { isSuccess: isSuccessApproveTxReceipt } = useWaitForTransactionReceipt(
    {
      hash: approveHash,
    },
  )
  const xocBalance = useBalanceOf({
    tokenAddress: xocContract,
    walletAddress: accountAddress as Address,
  })

  const formatBalance = (balance: string) => {
    const parsedBalance = parseFloat(balance)
    return isNaN(parsedBalance) ? '0.00' : parsedBalance
  }

  const formattedXocBalance = xocBalance
    ? formatBalance(xocBalance.balance)
    : '0.00'

  // Hook to read the XOC contract allowance
  const {
    data: xocAllowance,
    isError,
    isLoading,
  } = useReadContract({
    address: xocContract,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: [accountAddress, spenderAddress],
  })

  // Handle allowance data
  useEffect(() => {
    if (isError) {
      console.error('Error fetching allowance')
      xocSetAllowanceState('0')
    } else if (!isLoading && xocAllowance && typeof xocAllowance === 'bigint') {
      const allowanceInEther = formatUnits(xocAllowance, 18)
      xocSetAllowanceState(allowanceInEther)
    }
  }, [xocAllowance, isError, isLoading])

  // Validate XOC balance and allowance against input
  useEffect(() => {
    const xocAmount = parseFloat(amount.toString()) || 0
    const balance = parseFloat(formattedXocBalance.toString())
    const allowance = parseFloat(xocAllowanceState)

    if (xocAmount > balance) {
      setXocError("You don't have enough XOC tokens in your wallet")
    } else {
      setXocError(null) // Clear error if balance is enough
    }

    // Check if approval is needed
    const needsApproval = xocAmount > allowance
    setRequiresApproval(needsApproval)
  }, [amount, formattedXocBalance, xocAllowanceState])

  const handleActionChange = (newAction: 'Deposit' | 'Withdraw') => {
    setAction(newAction)
  }

  // Function to handle approval
  const handleApproval = async () => {
    const xocAmount = parseFloat(amount.toString()) || 0

    try {
      await approveERC20({
        abi: ERC20ABI,
        address: xocContract,
        functionName: 'approve',
        args: [spenderAddress, parseEther(xocAmount.toString())], // Convert amount to 18 decimals
      })
      console.log('Approval transaction submitted')
    } catch (err) {
      console.error('Error approving XOC tokens:', err)
      setXocError('Error approving XOC tokens')
    }
  }

  // Function to handle deposit or withdraw
  const handleDeposit = async () => {
    const xocAmountInWei = parseEther(amount.toString())
    try {
      const tx = await deposit({
        abi: CreditTalentCenterABI,
        address: creditTalentCenterAddress,
        functionName: 'applyToUnderwrite',
        args: [xocAmountInWei],
      })
      console.log('Deposit transaction submitted:', tx)
    } catch (err) {
      console.error('Error executing deposit:', err)
    }
  }

  const handleWithdrawal = async () => {
    const xocAmountInWei = parseEther(amount.toString())
    try {
      const tx = await withdraw({
        abi: ERC20ABI,
        address: xocContract,
        functionName: 'withdraw',
        args: [xocAmountInWei, accountAddress],
      })
      console.log('Withdrawal transaction submitted:', tx)
    } catch (err) {
      console.error('Error executing withdrawal:', err)
    }
  }

  const handleXOCMaxClick = () => {
    if (formattedXocBalance) {
      setAmount(formattedXocBalance.toString())
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Caja</Button>
      </DialogTrigger>
      <DialogContent className="w-full md:px-8 lg:px-16">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">
            Caja Underwriter
          </DialogTitle>
          <DialogDescription className="text-left text-lg">
            Deposita o retira tus fondos de manera segura
          </DialogDescription>
        </DialogHeader>
        <hr className="rounded-t-full border-t-2 border-gray-300" />

        {/* Toggle buttons for Deposit/Withdraw */}
        <div className="mb-6 flex justify-center">
          <div className="flex">
            <button
              onClick={() => handleActionChange('Deposit')}
              className={`rounded-l-md rounded-r-none px-6 py-2 ${action === 'Deposit' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Depositar
            </button>
            <button
              onClick={() => handleActionChange('Withdraw')}
              className={`rounded-l-none rounded-r-md px-6 py-2 ${action === 'Withdraw' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Retirar
            </button>
          </div>
        </div>

        {/* Input field */}
        <div className="mb-6">
          <label className="block text-gray-700">
            {action === 'Deposit'
              ? 'Indica la cantidad a depositar:'
              : 'Indica la cantidad a retirar:'}
          </label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full rounded-lg border p-2"
            placeholder="0.0"
          />
          <div className="flex flex-col items-start justify-between">
            <div className="mb-2">
              <span className="mr-1 text-gray-500">{`Balance: ${formattedXocBalance || 0}`}</span>
              <span
                className="cursor-pointer font-bold text-primary hover:underline"
                onClick={handleXOCMaxClick}
              >
                MAX
              </span>
            </div>
            <div className="text-gray-500">{`Allowance: ${xocAllowanceState}`}</div>
          </div>
          {xocError && <p className="mt-2 text-red-500">{xocError}</p>}{' '}
          {/* Display error */}
        </div>

        {/* Submit button */}
        <button
          className="w-full rounded-lg bg-primary px-6 py-2 text-white"
          onClick={() => {
            if (requiresApproval) {
              handleApproval() // Call handleApproval when approval is needed
            } else if (action === 'Deposit' && isSuccessApproveTxReceipt) {
              handleDeposit() // Call handleDeposit if deposit is selected
            } else if (action === 'Withdraw' && !xocError) {
              handleWithdrawal() // Call handleWithdrawal if withdraw is selected
            }
          }}
        >
          {requiresApproval
            ? 'Aprobar'
            : action === 'Deposit'
              ? 'Depositar'
              : 'Retirar'}{' '}
          {/* Dynamic button label */}
        </button>
      </DialogContent>
    </Dialog>
  )
}
