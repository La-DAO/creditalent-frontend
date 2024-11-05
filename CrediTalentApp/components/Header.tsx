import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <>
      {/* Navigation */}
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-[#FF5722]">
          CrediTalent
        </Link>
        <div className="hidden items-center space-x-8 md:flex">
          <Link href="/borrow" className="text-gray-600 hover:text-gray-900">
            Borrow
          </Link>
          <Link href="/earn" className="text-gray-600 hover:text-gray-900">
            Earn
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            Support
          </Link>
          <Button className="rounded-full bg-[#FF5722] text-white hover:bg-[#FF5722]/90">
            Connect
          </Button>
        </div>
      </nav>  
    </>
  )
}
