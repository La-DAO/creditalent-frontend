'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const liquidityData = [
  { month: 'JAN 18', value: 30 },
  { month: 'FEB 18', value: 35 },
  { month: 'MAR 18', value: 30 },
  { month: 'APR 18', value: 18 },
  { month: 'MAY 18', value: 30 },
  { month: 'JUN 18', value: 35 },
  { month: 'JUL 18', value: 40 },
  { month: 'AUG 18', value: 35 },
]

export default function Component() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card className="mx-auto my-2 w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-medium">About this pool</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <div className="mx-auto max-w-6xl">
        {isExpanded && (
          <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                This pool uses the Morpho smart contracts as the underlying base
                to give out permisionless credit to any whitelisted address
                based just on your Builder Score. This allows us to offer a
                fixed interest rate and keep everything efficient.
              </p>
              <p className="text-sm text-gray-600">
                When you deposit into it, you will receive a CrediXoc token
                which gets configured from the Morpho pool as collateral in
                order to access the line of credit in MXN at a fixed rate.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Liquidity Over Time
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={liquidityData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        )}
      </div>
    </Card>
  )
}
