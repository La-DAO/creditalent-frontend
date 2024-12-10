import Link from "next/link"
// import Image from "next/image"

export default function Footer() {
  return (
    <>
     {/* Footer */}
     <footer className="mt-20 border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-center">
            <h1 className="text-3xl font-bold text-[#FF5722]">CrediTalent</h1>
          </div>
          <div className="mb-8 flex flex-wrap justify-center gap-6 text-xs text-[#FF5722]">
            <Link href="https://sepolia.basescan.org/address/0xBD03d38828Bf0D56f1d325F96d4d48d4a2fa3549#writeProxyContract" className="hover:text-gray-700 text-lg" target="_blank" rel="noopener noreferrer">
              Live on Base Sepolia
            </Link>
            <Link href="https://github.com/La-DAO/creditalent-contracts" className="hover:text-gray-700 text-lg" target="_blank" rel="noopener noreferrer">
              CrediTalent Contracts
            </Link>
            <Link href="https://github.com/La-DAO/creditalent-frontend" className="hover:text-gray-700 text-lg" target="_blank" rel="noopener noreferrer">
              Frontend Repo
            </Link>
            <Link href="https://devfolio.co/projects/credittalent-42f6" className="hover:text-gray-700 text-lg" target="_blank" rel="noopener noreferrer">
              DevFolio Pitch Page
            </Link>
          </div>
        </div>
      </footer>
     </>
  )
}