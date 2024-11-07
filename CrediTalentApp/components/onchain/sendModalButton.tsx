import React, { useState } from 'react'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '../ui/label'
import Link from 'next/link'
import { ArrowUpRightIcon, ExternalLinkIcon, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function SendModalButton() {
  const [amount, setAmount] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')

  const {
    data: hash,
    writeContractAsync: transferXOC,
    isPending: isTransferPending,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const handleTransfer = async (event: React.FormEvent) => {
    event.preventDefault()
    // Ensure amount is valid
    if (!recipientAddress || (amount && !isNaN(Number(amount)))) {
      try {
        // Start the transaction
        await transferXOC({
          address: '0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf',
          abi: [
            // ERC20 ABI
            {
              constant: false,
              inputs: [
                {
                  name: '_to',
                  type: 'address',
                },
                {
                  name: '_value',
                  type: 'uint256',
                },
              ],
              name: 'transfer',
              outputs: [
                {
                  name: '',
                  type: 'bool',
                },
              ],
              type: 'function',
            },
          ],
          functionName: 'transfer',
          args: [recipientAddress, parseEther(amount)],
        })

        toast.info('Transferencia solicitada...')
      } catch (error) {
        console.error('Transfer failed:', error)
        toast.error(
          'Hubo un error en la transferencia, por favor intenta de nuevo',
        )
      }
    } else {
      toast.warning('Ambos campos son requeridos')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button size="icon" className="h-12 w-12 rounded-full">
          <ArrowUpRightIcon className="h-6 w-6" />
          <span className="sr-only">Enviar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="md:px-8 lg:px-16">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">Enviar MXN</DialogTitle>
          <DialogDescription className="text-left text-lg">
            La cantidad será enviada a la dirección indicada al confirmar la
            transacción
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <form
            className="flex w-full flex-col gap-y-4"
            onSubmit={handleTransfer}
          >
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-lg" htmlFor="address">
                Dirección
              </Label>
              <Input
                name="address"
                placeholder="0xA0Cf…251e"
                required
                onChange={(event) => setRecipientAddress(event.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-lg" htmlFor="value">
                Cantidad
              </Label>
              <div className="relative w-full">
                <Input
                  name="value"
                  placeholder="Cuánto quieres enviar..."
                  required
                  type="number"
                  min={1}
                  step={1}
                  onChange={(event) => setAmount(event.target.value)}
                  className="pr-12" // Add right padding to make room for the currency indicator
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm font-bold text-foreground">
                  MXN
                </span>
              </div>
            </div>
            <div className="flex w-full justify-center pt-4">
              <Button
                className="w-1/2 font-semibold"
                size="lg"
                type="submit"
                disabled={isTransferPending || isConfirming}
              >
                {isTransferPending || isConfirming ? (
                  <span className="flex items-center gap-x-2">
                    Enviando...
                    <LoaderCircle className="h-6 w-6 animate-spin text-white" />
                  </span>
                ) : (
                  'Enviar'
                )}
              </Button>
            </div>
          </form>
          {hash && (
            <div className="flex flex-col items-center pt-4">
              <Link
                className="flex items-center gap-x-1.5 text-lg hover:text-primary"
                href={`https://basescan.org/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en explorador <ExternalLinkIcon className="h4 w-4" />
              </Link>
              {isConfirming && <p className="text-lg">Enviando...</p>}
              {isConfirmed && <p className="text-lg">Transacción enviada</p>}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
