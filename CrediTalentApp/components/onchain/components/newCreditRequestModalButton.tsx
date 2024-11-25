import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createLoanApplication } from "@/controllers/creditalentApi";
import { CreateLoanApplicationData } from "@/types/creditalent-responses";
import { TalentPassportType } from "@/types/talent-protocol-responses";
import {
  useAccount,
} from "wagmi";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { isPassportTalentRequired as isTalentPassportRequired } from "@/lib/utils";
import { AssetType } from "@/lib/constants";
import { useCreditTalentCenter } from "../hooks/useCreditTalentCenter";
import { useNetworkSwitch } from "../hooks/useNetworkSwitch";
import { getApplicationExists } from "@/types/contracts/CreditalentCenter";

export function NewCreditRequestModal({
  talentPassportData,
  creditAllowed,
}: {
  talentPassportData: TalentPassportType | undefined | null;
  creditAllowed: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState<AssetType>("xoc");
  const [isLoading, setIsLoading] = useState(false);

  const { address: accountAddress } = useAccount();
  const { user } = useDynamicContext();
  const { switchToBaseSepolia } = useNetworkSwitch();

  // Usar los nuevos hooks
  const {
    application,
    applyForCredit,
    isLoadingApplyToCredit,
    isSuccessApplyToCredit,
    getApplicationInfoAsync,
  } = useCreditTalentCenter(selectedToken);

  const handleRequestCreditLine = async () => {
    try {
      setIsLoading(true);
      if (!selectedToken) {
        toast.error("Ups require, please select a asset");
        return;
      }

      // Verificar si ya existe una aplicación
      if (getApplicationExists(application)) {
        toast.error("Application already exists");
        return;
      }

      if (talentPassportData === null && isTalentPassportRequired) {
        toast.error("Required talent passport!");
        return;
      }

      if (accountAddress == null) {
        toast.warning("user not logged");
        return;
      }

      // Cambiar red si es necesario
      const networkSwitched = await switchToBaseSepolia();
      if (!networkSwitched) return;

      // Usar el nuevo hook para aplicar al crédito
      const dataHash =
        "0x0000000000000000000000000000000000000000000000000000000000000002"; // TODO: Generar hash real
      await applyForCredit(dataHash);
    } catch (error) {
      toast.error("Ups.." + error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  // Manejar el éxito de la transacción
  useEffect(() => {
    if (!isLoadingApplyToCredit && isSuccessApplyToCredit && !getApplicationExists(application) ) {
     
      // Agregamos await y hacemos la función async
      (async () => {
        try {
          const applicationInfo = await getApplicationInfoAsync();
          console.log('🚀 ~ applicationInfo:', applicationInfo)
          const dataToSend = createLoanApplicationDataFromTalentPassport(
            accountAddress!,
            +amount,
            parseInt(applicationInfo?.id?.toString() ?? ""),
            creditAllowed,
            selectedToken,
            talentPassportData
          );
    
          await createLoanApplication(dataToSend);
          toast.success("Credit line requested successfully");
        } catch (error) {
          toast.error("Error creating loan application");
          console.error(error);
        }
      })();
    }
  }, [isLoadingApplyToCredit, isSuccessApplyToCredit, application]);

  const createLoanApplicationDataFromTalentPassport = (
    walletId: string, // Wallet Id
    amount: number, // You'll need to get the amount from somewhere (e.g., user input)
    applicationId: number, // Application Id from contract
    availableCreditLine: number, // Get available credit line
    tokenType: string, // Token ttype
    talentPassport?: TalentPassportType | null
  ): CreateLoanApplicationData => {
    const totalFollowerCount = talentPassport?.passport_socials?.reduce(
      (sum, social) => sum + (social.follower_count || 0), // Handle cases where follower_count might be null or undefined
      0
    );

    const loanApplicationData: CreateLoanApplicationData = {
      amount,
      availableCreditLine,
      assetType: tokenType,
      status: "PENDING", // Default status
      xocScore: -1, // Or whatever default value you use
      builderScore: talentPassport?.score ?? -1,
      nominationsReceived: talentPassport?.nominations_received_count ?? -1,
      followers: totalFollowerCount ?? -1,
      walletId: walletId,
      applicantId: applicationId,
      userName: user?.username ?? "-",
      userPictureUrl: talentPassportData?.user?.profile_picture_url ?? "",
    };

    return loanApplicationData;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FF4405] hover:bg-[#FF4405]/90">
          Request a New Credit Line
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[576px] lg:max-w-[768px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            New Credit Request
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            In which token and amount would you like your credit to be in?
          </DialogDescription>
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
              <label htmlFor="talent" className="flex items-center gap-2">
                <input
                  type="radio"
                  id="talent"
                  value="talent"
                  checked={selectedToken === "talent"}
                  onChange={() => setSelectedToken("talent")}
                />
                $talent
              </label>
              <label htmlFor="usdc" className="flex items-center gap-2">
                <input
                  type="radio"
                  id="usdc"
                  value="usdc"
                  checked={selectedToken === "usdc"}
                  onChange={() => setSelectedToken("usdc")}
                />
                $usdc
              </label>
              <label htmlFor="xoc" className="flex items-center gap-2">
                <input
                  type="radio"
                  id="xoc"
                  value="xoc"
                  checked={selectedToken === "xoc"}
                  onChange={() => setSelectedToken("xoc")}
                />
                $xoc
              </label>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              className="bg-[#FF4405] hover:bg-[#FF4405]/90"
              onClick={handleRequestCreditLine}
              disabled={!amount || isLoading}
            >
              Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
