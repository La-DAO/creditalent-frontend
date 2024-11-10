
import Earn from "@/components/Earn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AssetType } from "@/types/creditalent-responses";
import { useState } from "react";

export default function Home() {
  const [selectedAssetType, setSelectedAssetType] = useState<AssetType | undefined | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-50 to-white">
      <Header />

      {/* Select Asset Type */}
        {/* Select Asset Type (using shadcn Select) */}
        <div className="flex justify-center mt-4">
        <Select
          value={selectedAssetType?.toString()}
          onValueChange={(value) => setSelectedAssetType(value ? (value as AssetType) : undefined)}
        >
          <SelectTrigger className="rounded-md border-gray-300 py-2 px-3 focus:outline-none focus:ring focus:ring-blue-300">
            <SelectValue placeholder="Select Asset Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="xoc">XOC</SelectItem>
            <SelectItem value="usdc">USDC</SelectItem>
            <SelectItem value="talent">Talent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Earn Component */}
      {selectedAssetType && <Earn selectedAssetType={selectedAssetType} />}
      <Footer />
    </div>
   );
}