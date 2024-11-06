'use client'

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'

export const description = 'A radial chart with text'

const chartConfig = {
  points: {
    label: 'Score',
  },
  safari: {
    label: 'Safari',
    color: '#FF4405',
  },
} satisfies ChartConfig

export function BuilderScoreChart({
  builderScore = 0,
}: {
  builderScore: number
}) {
  const chartData = [
    { browser: 'safari', points: builderScore, fill: 'var(--color-safari)' },
  ]
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={((builderScore) / 200) * 360 + 90}
        innerRadius={80}
        outerRadius={120}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="points" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 32}
                      className="fill-muted-foreground"
                    >
                      Builder
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className=" text-4xl font-bold"
                    >
                     {chartData[0].points.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Score
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  )
}
