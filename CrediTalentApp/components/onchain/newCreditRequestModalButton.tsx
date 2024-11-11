import React, { useState } from "react";
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
import {
  AssetType,
  CreateLoanApplicationData,
} from "@/types/creditalent-responses";
import { TalentPassportType } from "@/types/talent-protocol-responses";
import {
  useAccount,
  useWriteContract,
  useClient,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { isPassportTalentRequired as isTalentPassportRequired } from "@/lib/utils";
import { talentCenterContractFactory } from "./factories/talentCenterContractFactory";
import { readContract } from "viem/actions";

export function NewCreditRequestModal({
  talentPassportData,
  creditAllowed,
}: {
  talentPassportData: TalentPassportType | undefined | null;
  creditAllowed: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("xoc"); // Default to $xoc
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const { address: accountAddress } = useAccount();
  const { primaryWallet, user } = useDynamicContext();
  const { writeContractAsync, data: transactionHash } = useWriteContract();
  const client = useClient();
  const { isSuccess: isSuccessTransaction } = useWaitForTransactionReceipt({
    hash: transactionHash, // Pass the transaction hash here
  });

  const createLoanApplicationDataFromTalentPassport = (
    walletId: string, // Wallet Id
    amount: number, // You'll need to get the amount from somewhere (e.g., user input)
    applicationId: number, // Application Id from contract
    availableCreditLine: number, // Get available credit line
    creditLineId: number, // Get credit line id
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
      creditLineId: creditLineId,
      userName: user?.username ?? "-",
      userPictureUrl: talentPassportData?.user?.profile_picture_url ?? "",
    };

    return loanApplicationData;
  };
  const handleRequestCreditLine = async () => {
    try {
      setIsLoading(true);

      let applicationId = await readLoanApplication();
      console.log("🚀 ~ BEFORE ~ applicationId:", applicationId);

      if (applicationId !== null) {
        toast.error("Application already exists");
        return;
      }

      const creditLineId = 100; // TODO: REMOVE HARDCODED
      if (!creditLineId) {
        toast.error("Credit line not exist");
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

      await writeLoanApplication();
      console.log(
        "🚀 ~ handleRequestCreditLine ~ isSuccessTransaction:",
        isSuccessTransaction
      );

      if (isSuccessTransaction) {
        applicationId = await readLoanApplication();
        console.log(
          "🚀 ~ handleRequestCreditLine ~ applicationId:",
          applicationId
        );

        if (applicationId) {
          const dataToSend = createLoanApplicationDataFromTalentPassport(
            accountAddress!,
            +amount,
            applicationId,
            creditAllowed,
            creditLineId,
            selectedToken,
            talentPassportData // Type assertion if needed
          );
          console.log("🚀 ~ handleRequestCreditLine ~ dataToSend:", dataToSend);

          await createLoanApplication(dataToSend);
        } else {
          toast.error("Application Id not valid");
        }
      }
    } catch (error) {
      toast.error("Ups.." + error);
      // ... error handling ...
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };
  async function writeLoanApplication() {
    console.log("Antes de write contract");

    try {
      if (primaryWallet?.connector.supportsNetworkSwitching()) {
        toast.info("Cambia tu red a Base Sepolia");
        await primaryWallet.switchNetwork(84532);
        console.log("Success! Network switched");
      }

      const currentChainId = await primaryWallet?.getNetwork();
      if (currentChainId !== 84532) {
        return toast.error(
          "Red no soportada, cambia de red y vuelva a intentar"
        );
      }
      const inputApplyToCredit =
        "0x0000000000000000000000000000000000000000000000000000000000000002";
      const talentCenterContract = talentCenterContractFactory(
        selectedToken as AssetType
      );

      const hash = await writeContractAsync({
        address: talentCenterContract.address,
        abi: talentCenterContract.abi,
        functionName: "applyToCredit",
        args: [inputApplyToCredit], //TODO:  `${convertToBytes32(loanApplicationId)}`
      });
      console.log("🚀 ~ writeLoanApplication ~ hash:", hash);
    } catch (error) {
      if (`${error}`.includes("applicationAlreadyExists")) {
        throw Error("Application already exists");
      }
    }
    console.log("despues de write contract");
  }
  // TODO: read loan application
  async function readLoanApplication(): Promise<number | null> {
    if (!client) {
      toast.error("Client required");
      return null;
    }
    const talentCenterContract = talentCenterContractFactory(
      selectedToken as AssetType
    );

    const [idHex] = await readContract(client!, {
      abi: talentCenterContract.abi, // This assumes your abi is correctly typed
      address: talentCenterContract.address,
      functionName: "applicationInfo",
      args: [accountAddress],
    });

    const id = parseInt(idHex, 16);

    if (id === 0) return null;
    else {
      return id;
    }
  }
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
