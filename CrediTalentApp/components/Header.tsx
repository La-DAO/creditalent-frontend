'use client'

import Link from "next/link"
import AuthButton from "./buttons/authButton"
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core'

export default function Header() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <>
      {/* Navigation */}
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-[#FF5722]">
          CrediTalent
        </Link>
        <div className="hidden items-center space-x-8 md:flex">

          {isLoggedIn && (
            <Link href="/borrow" className="text-gray-600 hover:text-gray-900">
              Borrow
            </Link>
          )}
          {isLoggedIn && (
            <Link href="/earn" className="text-gray-600 hover:text-gray-900">
              Earn
            </Link>
          )}
          <Link href="#" className="text-gray-600 hover:text-gray-900">
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
