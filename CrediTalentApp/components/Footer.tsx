import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <>
     {/* Footer */}
     <footer className="mt-20 border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-center">
            <Image
              src="/assets/CrediTalent.png?height=40&width=150"
              alt="CrediTalent"
              width={150}
              height={100}
              className="h-10"
            />
          </div>
          <div className="mb-8 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
            <Link href="#" className="hover:text-gray-700">
              Terms And Conditions
            </Link>
            <Link href="#" className="hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-700">
              E-Consent
            </Link>
            <Link href="#" className="hover:text-gray-700">
              Do Not Sell My Personal Information
            </Link>
          </div>
        </div>
      </footer>
     </>
  )
}