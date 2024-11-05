import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-[#1A2B48] sm:text-5xl xl:text-6xl">
              Quick and Easy Loans for Your Web3 Needs.
            </h1>
            <p className="text-lg text-gray-600">
              Our loan smart contracts offer a hassle-free and streamlined borrowing experience providing you with the funds
              you need in a timely manner to meet your financial requirements.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/borrow">
                <Button
                  variant="outline"
                  className="rounded-full border-2 border-gray-900 bg-transparent px-8 text-gray-900 hover:bg-gray-50"
              >
                  Request A Loan
                    </Button>
              </Link>
              <Link href="/earn">
                <Button
                  variant="outline"
                className="rounded-full border-2 border-gray-900 bg-transparent px-8 text-gray-900 hover:bg-gray-50"
              >
                Earn Interest
              </Button>
              </Link>
            </div>
          </div>
          <div className="">
            <div className="h-[400px] w-full">
              <Image
                src="/assets/Hero.png?height=400&width=500"
                alt="Banking Illustration"
                width={500}
                height={400}
                className="relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Borrowing Options */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-3xl bg-blue-50/50 px-4 py-16">
          <h2 className="mx-auto mb-16 max-w-3xl text-center text-3xl font-bold text-[#1A2B48]">
            Usamos tu pasaporte Talent para calcular tu perfil de riesgo y extenderte una línea de credito instantanea.
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Borrow $TALENT",
                color: "bg-[#4263EB]",
                number: "1",
                image: "/assets/BorrowTalent.png",
                description: "All paperwork is gone! The whole process is completely online. Just fill in a few details about yourself and hit “Get Started”!"
              },
              {
                title: "Borrow $XOC",
                color: "bg-[#40C057]",
                number: "2",
                image: "/assets/BorrowXOC.png",
                description: "The online form usually takes less than 10 minutes to complete. So before you even finish your cup of tea, you’ll already have your request submitted."
              },
              {
                title: "Borrow $USDC",
                color: "bg-[#FF922B]",
                number: "3",
                image: "/assets/BorrowUSDC.png",
                description: "Once you submit your request, get your offer, and e-sign it, you’ll be able to get the funds to your bank account in no time!"
              },
            ].map((option) => (
              <div
                key={option.title}
                className={`${option.color} group relative overflow-hidden rounded-3xl p-6 shadow-lg transition-transform hover:-translate-y-1 h-[350px]`}
              >
                <div className="relative z-10 h-full space-y-4 text-white">
                  <p className="text-sm font-medium">Borrow</p>
                  <h3 className="text-2xl font-bold">{option.title}</h3>
                  <div className="mt-auto">
                    <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm">
                      {option.number}
                    </span>
                  </div>
                  <p className="text-sm w-[150px]">{option.description}</p>
                  </div>
                <Image
                  src={option.image}
                  alt="Person"
                  width={200}
                  height={200}
                  className="absolute bottom-0 right-0 opacity-80"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-2 text-center text-3xl font-bold text-[#1A2B48]">How we works?</h2>
        <p className="mb-16 text-center text-gray-600">
          This is a process, how you can get loan for your self.
        </p>
        <div className="grid gap-12 md:grid-cols-2">
          {[
            {
              title: "Application",
              description:
                "The borrower submits a loan application to the smart contract. The application includes personal information, such as name, biography, wallet address and activity within it, Activity Skills and Builder Score, and the purpose of the loan.",
              image: "/assets/Application.png?v=1&height=200&width=200",
            },
            {
              title: "Credit-Line Approval",
              description:
                "The investors see a list of all applicants and approve a credit line to a borrower in a given token ($Talent, $usdc or $xoc), the funds are then instantly available for the borrower to withdraw.",
              image: "/assets/CreditLineApproval.png?height=200&width=200",
            },
            {
              title: "Loan Management Console",
              description:
                "The borrower can then withdraw the full amount that was approved by the investor all in a decentralized manner, the smart contract being the Schelling Point.",
              image: "/assets/LoanManagementConsole.png?height=200&width=200",
            },
            {
              title: "Loan Repayment Agreement",
              description:
                "If the borrower doesn't pay, they will be added to the Wall of Shame and hounded on social media to repay the loan.",
              image: "/assets/LoanRepaymentAgreement.png?height=200&width=200",
            },
          ].map((step, index) => (
            <div key={step.title} className="relative flex gap-8">
              <div className="text-8xl font-bold text-gray-400">0{index + 1}</div>
              <div className="space-y-4">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={200}
                  height={200}
                  className="h-32 w-32"
                />
                <h3 className="text-xl font-bold text-[#1A2B48]">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}