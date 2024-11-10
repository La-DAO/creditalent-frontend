import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createLoanApplication } from '@/controllers/creditalentApi'
import { CreateLoanApplicationData } from '@/types/creditalent-responses'
import { TalentPassportType } from '@/types/talent-protocol-responses'

export function NewCreditRequestModal( {talentPassportData, creditAllowed }: { talentPassportData: TalentPassportType | undefined | null, creditAllowed: number } ) {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [selectedToken, setSelectedToken] = useState('xoc') // Default to $xoc
  const [isLoading, setIsLoading] = useState(false); // Add loading state


  const createLoanApplicationDataFromTalentPassport = (
    talentPassport: TalentPassportType,
    amount: number, // You'll need to get the amount from somewhere (e.g., user input)
    availableCreditLine: number, // Get available credit line
    creditLineId: number, // Get credit line id
    tokenType: string // Token ttype
  ): CreateLoanApplicationData => {
    const totalFollowerCount = talentPassport.passport_socials.reduce(
      (sum, social) => sum + (social.follower_count || 0), // Handle cases where follower_count might be null or undefined
      0
    );
    
    const loanApplicationData: CreateLoanApplicationData = {
      amount,
      availableCreditLine,
      tokenType,
      status: "PENDING", // Default status
      xocScore: -1, // Or whatever default value you use
      builderScore: talentPassport.score,
      nominationsReceived: talentPassport.nominations_received_count,
      followers: totalFollowerCount,
      walletId: talentPassport.main_wallet,
      applicantId: parseInt(talentPassport.user.id, 10), // Assuming user.id is a string, convert to number
      creditLineId: creditLineId,
    };

    return loanApplicationData;
  };
  const handleRequestCreditLine = async () => {
    try {
      setIsLoading(true);
      const creditLineId = 100; // TODO: REMOVE HARDCODED
      if (!creditLineId) {
        // Check if creditLineId is defined
        return;
        }

      if (talentPassportData === null) {
        toast.error('Required talent passport!')
        return
      }
     
      const dataToSend = createLoanApplicationDataFromTalentPassport(
        talentPassportData! , // Type assertion if needed
        +amount,
        creditAllowed,
        creditLineId,
        selectedToken,
      );
      console.log('🚀 ~ handleRequestCreditLine ~ dataToSend:', dataToSend)

      const response = await createLoanApplication(dataToSend);
      console.log("🚀 ~ handleRequestCreditLine ~ response:", response);
      // ... the rest of your handleApprove logic
    } catch (error) {
      // ... error handling ...
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>
        <Button className="bg-[#FF4405] hover:bg-[#FF4405]/90">Request a New Credit Line</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[576px] lg:max-w-[768px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">New Credit Request</DialogTitle>
          <DialogDescription className="text-center text-base">In which token and amount would you like your credit to be in?</DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid gap-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="token">Token</Label>
            <div className="flex gap-4">
              <label htmlFor="stalent" className="flex items-center gap-2">
                <input
                  type="radio"
                  id="stalent"
                  value="stalent"
                  checked={selectedToken === 'stalent'}
                  onChange={() => setSelectedToken('stalent')}
                />
                $talent
              </label>
              <label htmlFor="usdc" className="flex items-center gap-2">
                <input
                  type="radio"
                  id="usdc"
                  value="usdc"
                  checked={selectedToken === 'usdc'}
                  onChange={() => setSelectedToken('usdc')}
                />
                $usdc
              </label>
              <label htmlFor="xoc" className="flex items-center gap-2">
                <input
                  type="radio"
                  id="xoc"
                  value="xoc"
                  checked={selectedToken === 'xoc'}
                  onChange={() => setSelectedToken('xoc')}
                />
                $xoc
              </label>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              className="bg-[#FF4405] hover:bg-[#FF4405]/90"
              onClick={handleRequestCreditLine}
              disabled={!amount}
            >
              Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
