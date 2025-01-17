import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useToken } from '../hooks/useErc20';
import { useCreditTalentCenter } from '../hooks/useCreditTalentCenter';
import { AssetType } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

interface ApplyToUnderwriteButtonProps {
  amount: number;
  assetType: AssetType;
}

export default function ApplyToUnderwriteButton({ amount, assetType }: ApplyToUnderwriteButtonProps) {
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const underwriteToken = useToken(assetType);
  const creditTalentCenter = useCreditTalentCenter(assetType);

  // Handle transaction success
  useEffect(() => {
    if (underwriteToken.isSuccessApprove && !underwriteToken.isLoadingApprove) {
      creditTalentCenter.applyForUnderwriting(amount.toString());
    }
  }, [underwriteToken.isSuccessApprove, underwriteToken.isLoadingApprove]);

  // Handle underwrite application success
  useEffect(() => {
    if (creditTalentCenter.isSuccessApplyToUnderwrite && !creditTalentCenter.isLoadingApplyToUnderwrite) {
      toast.success("¡Aplicación exitosa como underwriter!");
      setIsTransactionPending(false);
    }
  }, [creditTalentCenter.isSuccessApplyToUnderwrite, creditTalentCenter.isLoadingApplyToUnderwrite]);

  const handleUnderwriteApplication = async () => {
    if (!assetType || !amount) {
      toast.error("Por favor, ingresa un monto válido");
      return;
    }

    try {
      setIsTransactionPending(true);
      await underwriteToken.approve(creditTalentCenter.address, amount.toString());
    } catch (err) {
      console.error('Error in underwrite application:', err);
      toast.error("Error processing the transaction");
      setIsTransactionPending(false);
    }
  };

  const isUnderwriteProcessing = isTransactionPending || underwriteToken.isLoadingApprove || creditTalentCenter.isLoadingApplyToUnderwrite;

  return (
    <button
      onClick={handleUnderwriteApplication}
      disabled={isUnderwriteProcessing}
      className="w-full px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#FF5722]/90 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isUnderwriteProcessing ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin h-5 w-5" />
          <span>Procesando...</span>
        </div>
      ) : (
        "Aplicar como Underwriter"
      )}
    </button>
  );
}
