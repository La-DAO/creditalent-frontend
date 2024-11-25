import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { toast } from "sonner";

export const useNetworkSwitch = () => {
  const { primaryWallet } = useDynamicContext();

  const switchToBaseSepolia = async (): Promise<boolean> => {
    try {
      if (primaryWallet?.connector.supportsNetworkSwitching()) {
        toast.info("Cambia tu red a Base Sepolia");
        await primaryWallet.switchNetwork(84532);
      }

      const currentChainId = await primaryWallet?.getNetwork();
      if (currentChainId !== 84532) {
        toast.error("Red no soportada, cambia de red y vuelva a intentar");
        return false;
      }
      
      return true;
    } catch (error) {
      toast.error("Error al cambiar de red");
      return false;
    }
  };

  return { switchToBaseSepolia };
};
