'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useIsLoggedIn, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useRouter } from 'next/navigation';

export default function Component() {
  const isLoggedIn = useIsLoggedIn();
  const router = useRouter();
  const { setShowAuthFlow } = useDynamicContext();

  const processRequestLoan = () => {
    if (!isLoggedIn) {
      // login the user with dynamic labs
      setShowAuthFlow(true);
    } else {
      router.push('/borrow');
    }
  };

  const processRequestEarn = () => {
    if (!isLoggedIn) {
      // login the user with dynamic labs
      setShowAuthFlow(true);
    } else {
      router.push('/earn');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 mt-28">
          <div className="space-y-6">
            <h1 className="m-8 text-4xl font-bold tracking-tight text-[#FF5722] sm:text-5xl xl:text-6xl">
              Quick and Easy Loans for Your Web3 Needs.
            </h1>
            <p className="text-xl text-gray-600 m-10">
              Our smart contracts offer a hassle-free and streamlined
              borrowing experience providing you with the funds you need in a
              timely manner to meet your financial requirements.
            </p>
            <div className="flex flex-wrap gap-4 ml-10">
              <Button
                variant="outline"
                className="rounded-full border-4 border-[#FF5722] bg-transparent p-8 text-[#FF5722] hover:bg-orange-600 hover:text-white text-2xl"
                onClick={processRequestLoan}
              >
                Request A Loan
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-4 border-[#FF5722] bg-transparent p-8 ml-8 px-12 text-[#FF5722] hover:bg-orange-600 hover:text-white text-2xl"
                onClick={processRequestEarn}
              >
                Earn Interest
              </Button>
            </div>
          </div>
          <div className="">
            <div className="h-[330px] w-full ml-16">
              <Image
                src="/assets/Hero.png?height=400&width=500"
                alt="Banking Illustration"
                width={500}
                height={326}
                className="relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-8 mt-32">
        <h2 className="mb-2 text-center text-3xl font-bold text-[#FF5722]">
          How it works?
        </h2>
        <p className="mb-16 text-center text-gray-600 text-lg">
          This is a process, how you can get loan for your self.
        </p>
        <div className="grid gap-12 md:grid-cols-2">
          {[
            {
              title: 'Application',
              description:
                'The borrower submits a loan application to the smart contract. The application includes everything in your Talent Passport i.e. personal information, such as name, biography, wallet address and activity within it, Activity Skills and Builder Score, and the purpose of the loan.',
              image: '/assets/Tech Life - Blockchain (1).svg',
            },
            {
              title: 'Credit-Line Approval',
              description:
                'The investors see a list of all applicants and approve a credit line to a borrower in a given token ($Talent, $usdc or $xoc), the funds are then instantly available for the borrower to withdraw.',
              image: '/assets/Tech Life - Communication (4).svg',
            },
            {
              title: 'Loan Management Console',
              description:
                'The borrower can then withdraw the full amount that was approved by the investor all in a decentralized manner, the smart contract being the Schelling Point.',
              image: '/assets/Tech Life - Remote Life (1).svg',
            },
            {
              title: 'Loan Repayment Agreement',
              description:
                "If the borrower doesn't pay, they will be added to the Wall of Shame and hounded on social media to repay the loan.",
              image: '/assets/Tech Life - Life Management (1).svg',
            },
          ].map((step, index) => (
            <div key={step.title} className="relative flex gap-8">
              <div className="text-8xl font-bold text-[#FF5722]">
                0{index + 1}
              </div>
              <div className="space-y-4">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={400}
                  height={400}
                  className="h-auto w-150"
                />
                <h3 className="text-xl font-bold text-[#FF5722]">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Borrowing Options */}
      <section className="container mx-auto px-4 py-2">
        <div className="rounded-3xl bg-blue-50/50 px-4 py-6">
            <h2 className="mx-auto mb-24 mt-24 max-w-3xl text-center text-3xl font-bold text-[#FF5722] tracking-tighter">
            We use your Talent passport to calculate your risk profile and extend an almost instant credit line.
            </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Borrow $TALENT',
                color: 'bg-[#826AEE]',
                image: '/assets/talent-logo.jpg',
                description:
                  'You can use borrowed $Talent to temporarily increase your Builder Score, or to degen into a DeFi Protocol”!',
              },
              {
                title: 'Borrow $XOC',
                color: 'bg-[#693E34]',
                image: '/assets/xoc logo.png',
                description:
                  'You can use your borrowed $XOC to leverage yourself denominated in pesos, to buy CETES or any other lever that this new money lego offers.',
              },
              {
                title: 'Borrow $USDC',
                color: 'bg-[#93BBFB]',
                image: '/assets/usdc-logo.png',
                description:
                  '$USDC is the widest used stablecoin in the world, you can use it to buy more crypto or to pay your bills.',
              },
            ].map((option) => (
              <div
                key={option.title}
                className={`${option.color} group relative overflow-hidden rounded-3xl p-6 shadow-lg transition-transform hover:-translate-y-1 h-[350px] border-8 border-[#FF5722]`}
              >
                <div className="relative z-10 h-full space-y-4 text-white">
                  <p className="text-sm font-medium">Borrow</p>
                  <h3 className="text-2xl font-bold">{option.title}</h3>
                  <div className="mt-auto"></div>
                  <p className="text-sm w-[150px]">{option.description}</p>
                </div>
                <Image
                  src={option.image}
                  alt="Person"
                  width={200}
                  height={200}
                  className="absolute bottom-0 right-0 opacity-80 rounded-full p-10 m-10"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
