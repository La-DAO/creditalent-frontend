'use client'

import * as React from 'react'
import { Check, X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ApplicationProps {
  nombre: string
  cartera: string
  bio: string
  ubicacion: string
  activityScore: number
  identityScore: number
  skillsScore: number
  humanCheckmark: boolean
  status?: 'pending' | 'approved'
}

export default function Component() {
  // const [balance, setBalance] = React.useState("0")
  const [amount, setAmount] = React.useState("")
  
  const applications: ApplicationProps[] = [
    {
      nombre: "Usuario 1",
      cartera: "0x123",
      bio: "Bio del usuario 1",
      ubicacion: "Direccion 1",
      activityScore: 85,
      identityScore: 92,
      skillsScore: 78,
      humanCheckmark: true
    },
    {
      nombre: "Usuario 2",
      cartera: "0x456",
      bio: "Bio del usuario 2",
      ubicacion: "Direccion 2",
      activityScore: 60,
      identityScore: 74,
      skillsScore: 57,
      humanCheckmark: false,
      status: 'approved'
    }
  ]

  return (
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="add-balance" className="w-full">
          <TabsList className="w-full max-w-md">
            <TabsTrigger 
              value="add-balance" 
              className="flex-1 data-[state=active]:text-[#ff4405] data-[state=active]:border-b-[#ff4405]"
            >
              Add/Balance Funds
            </TabsTrigger>
            <TabsTrigger 
              value="approve" 
              className="flex-1"
            >
              Approve Applications
            </TabsTrigger>
          </TabsList>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">Caja</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Deposita o retira tus fondos de manera segura.
                </p>
                
                <div className="flex gap-2 mb-6">
                  <Button 
                    className="bg-[#ff4405] hover:bg-[#ff4405]/90 text-white"
                  >
                    Depositar
                  </Button>
                  <Button variant="outline">
                    Retirar
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">
                      Indica la cantidad a depositar:
                    </p>
                    <Input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-lg"
                      placeholder="0.0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Balance:</span>
                      <span>0 MAX</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Allowance:</span>
                      <span>0</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-[#ff4405] hover:bg-[#ff4405]/90 text-white"
                  >
                    Depositar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600">Perfil</th>
                    <th className="text-left p-4 font-medium text-gray-600">Puntaje</th>
                    <th className="text-left p-4 font-medium text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="p-4">
                        <div className="space-y-1">
                          <p><span className="text-gray-500">Nombre:</span> {app.nombre}</p>
                          <p><span className="text-gray-500">Cartera:</span> {app.cartera}</p>
                          <p><span className="text-gray-500">Bio:</span> {app.bio}</p>
                          <p><span className="text-gray-500">Ubicación:</span> {app.ubicacion}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <p><span className="text-gray-500">Activity Score:</span> {app.activityScore}</p>
                          <p><span className="text-gray-500">Identity Score:</span> {app.identityScore}</p>
                          <p><span className="text-gray-500">Skills Score:</span> {app.skillsScore}</p>
                          <p>
                            <span className="text-gray-500">Human Checkmark:</span>{' '}
                            {app.humanCheckmark ? (
                              <Check className="inline-block w-4 h-4 text-green-500" />
                            ) : (
                              <X className="inline-block w-4 h-4 text-red-500" />
                            )}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        {app.status === 'approved' ? (
                          <Button 
                            variant="secondary" 
                            className="w-full bg-gray-500 text-white hover:bg-gray-600"
                            disabled
                          >
                            Aprobado
                          </Button>
                        ) : (
                          <div className="space-y-2">
                            <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                              Aprobar
                            </Button>
                            <Button className="w-full bg-[#ff4405] hover:bg-[#ff4405]/90 text-white">
                              Denegar
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Tabs>
      </div>
  )
}