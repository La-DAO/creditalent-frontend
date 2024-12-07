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
  const [isLoading, setIsLoading] = useState(false);
  const token = useToken(assetType);
  const creditTalentCenter = useCreditTalentCenter(assetType);


  // Manejar éxito de las transacciones
  useEffect(() => {
    if (token.isSuccessApprove && !token.isLoadingApprove) {
      creditTalentCenter.applyForUnderwriting(amount.toString());
    }
  }, [token.isSuccessApprove, token.isLoadingApprove]);

  // Manejar éxito de Underwrite
  useEffect(() => {
    if (creditTalentCenter.isSuccessApplyToUnderwrite && !creditTalentCenter.isLoadingApplyToUnderwrite) {
      toast.success("¡Aplicación exitosa como underwriter!");
      setIsLoading(false);
    }
  }, [creditTalentCenter.isSuccessApplyToUnderwrite, creditTalentCenter.isLoadingApplyToUnderwrite]);

  const handleApplytoUnderWrite = async () => {
    if (!assetType || !amount) {
      toast.error("Por favor, ingresa un monto válido");
      return;
    }

    try {
      setIsLoading(true);
      await token.approve(creditTalentCenter.address, amount.toString());
    } catch (err) {
      console.error('Error en applyToUnderwrite:', err);
      toast.error("Error al procesar la transacción");
      setIsLoading(false);
    }
  };

  const isProcessing = isLoading || token.isLoadingApprove || creditTalentCenter.isLoadingApplyToUnderwrite;

  return (
    <button
      onClick={handleApplytoUnderWrite}
      disabled={isProcessing}
      className="w-full px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#FF5722]/90 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isProcessing ? (
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
