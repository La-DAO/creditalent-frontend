'use client'

import { type Dispatch, type SetStateAction } from 'react'
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import '@coinbase/onchainkit/styles.css';
import { base } from 'viem/chains'
import {
  Address,
  Avatar,
  Badge,
  Identity,
  Name,
} from '@coinbase/onchainkit/identity';

type AuthButtonProps = {
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AuthButton({
  size = 'default',
  setIsMenuOpen,
}: AuthButtonProps) {
  const { handleLogOut, setShowAuthFlow } = useDynamicContext()
  const isLoggedIn = useIsLoggedIn()
  const router = useRouter()
  const { address: walletAddress } = useAccount()

  function login() {
    if (!isLoggedIn) {
      setShowAuthFlow(true)
    } else {
      toast.warning('user is already logged in')
    }
  }
  async function logout() {
    await handleLogOut()
    router.push('/')
    setIsMenuOpen?.(false)
  }

  return (
    <>
      { isLoggedIn && walletAddress&& (
        <>
        <Identity
          address={walletAddress}
          className="rounded-md bg-white"
        >
          <Avatar />
          <Name chain={base}>
            <Badge />
          </Name>
          <Address />
        </Identity>
        </>
      )}
      <Button
        onClick={isLoggedIn ? logout : login}
      size={size}
      className="rounded-md bg-[#FF5722] text-white text-xl hover:bg-[#FF5722]/90"
    >
        {isLoggedIn ? 'Disconnect' : 'Connect Wallet'}
      </Button>
    </>
  )
}
