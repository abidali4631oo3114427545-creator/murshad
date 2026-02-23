"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { TrafficSource } from "@/hooks/use-analytics-data"

interface TrafficSourceWidgetProps {
  sources: TrafficSource[]
}

export function TrafficSourceWidget({ sources }: TrafficSourceWidgetProps) {
  return (
    <Card className="h-full border-t-2 border-primary">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Traffic Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sources} layout="vertical" margin={{ left: -10, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={80} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }} 
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }} 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm text-xs font-medium">
                        {payload[0].payload.name}: {payload[0].value} users
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                {sources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
