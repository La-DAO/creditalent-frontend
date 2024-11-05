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
          <div className="mb-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <Link href="#" className="hover:text-gray-900">
              Home
            </Link>
            <Link href="#" className="hover:text-gray-900">
              Get Started
            </Link>
            <Link href="#" className="hover:text-gray-900">
              How It Works
            </Link>
            <Link href="#" className="hover:text-gray-900">
              Testimonials
            </Link>
            <Link href="#" className="hover:text-gray-900">
              FAQ
            </Link>
            <Link href="#" className="hover:text-gray-900">
              Lending Policy
            </Link>
            <Link href="#" className="hover:text-gray-900">
              Rates & Fees
            </Link>
            <Link href="#" className="hover:text-gray-900">
              Contact Us
            </Link>
            <Link href="#" className="hover:text-gray-900">
              Unsubscribe
            </Link>
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
          <div className="text-center text-xs text-gray-500">
            <p className="mx-auto mb-4 max-w-3xl">
              The operator of this Website is not a loan broker, lender, financial institution or an agent of a loan broker
              or lender. The operator of this Website does not in any way get involved in a lenders decision regarding loan
              approval or denial. The operator of this Website provides a no obligation, free of charge service introducing
              prospective borrowers to prospective lenders who offer loans.
            </p>
            <p className="mx-auto mb-4 max-w-3xl">
              This Website operates a facility for prospective borrowers looking to learn and the possibility to connect with
              lenders who can provide these loans. In order for this Website to enable such a borrowing process, each
              borrower must complete a loan application. The Website works with its partners to determine whether this might
              be interested in offers to such lending opportunities. Compensation is given to the operator of this Website
              from the lenders who, based on their assessments, decide that a potential borrower may meet their lending
              conditions.
            </p>
            <p>Copyright ©2022 Brighter Future II. All Rights Reserved</p>
          </div>
        </div>
      </footer>
     </>
  )
}