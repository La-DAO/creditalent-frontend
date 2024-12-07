'use client'

import Link from "next/link"
import AuthButton from "./buttons/authButton"
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { usePathname } from 'next/navigation'

export default function Header() {
  const isLoggedIn = useIsLoggedIn();
  const pathname = usePathname();

  return (
    <>
      {/* Navigation */}
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="text-3xl font-bold text-[#FF5722]">
          CrediTalent
        </Link>
        <div className="hidden items-center space-x-8 md:flex">

          {isLoggedIn && (
            <Link 
              href="/borrow" 
              className={`text-xl ${
                pathname === '/borrow' 
                  ? 'text-gray-900 border-b-2 border-[#FF5722]' 
                  : 'text-[#FF5722] hover:text-gray-900 border-b-2 border-transparent hover:border-[#FF5722]'
              }`}
            >
              Borrow
            </Link>
          )}
          {isLoggedIn && (
            <Link 
              href="/earn" 
              className={`text-xl ${
                pathname === '/earn' 
                  ? 'text-gray-900 border-b-2 border-[#FF5722]' 
                  : 'text-[#FF5722] hover:text-gray-900 border-b-2 border-transparent hover:border-[#FF5722]'
              }`}
            >
              Earn
            </Link>
          )}
          <Link href="#" className="text-xl text-[#FF5722] hover:text-gray-900">
            Support
          </Link>

          {/* <Button className="rounded-full bg-[#FF5722] text-white hover:bg-[#FF5722]/90">
            Connect
          </Button> */}

          <AuthButton />

        </div>
      </nav>  
    </>
  )
}
