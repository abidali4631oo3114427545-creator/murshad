"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp } from "lucide-react"
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts"

interface ActiveUsersWidgetProps {
  count: number
  history: number[]
}

export function ActiveUsersWidget({ count, history }: ActiveUsersWidgetProps) {
  const chartData = history.map((val, i) => ({ val, i }))

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Real-time Users</CardTitle>
        <div className="flex items-center space-x-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary animate-pulse">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <span>Live</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-4xl font-bold tracking-tight">{count.toLocaleString()}</div>
          <div className="flex items-center text-xs text-green-500 font-medium">
            <TrendingUp className="mr-1 h-3 w-3" />
            +12%
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Users active in the last 5 minutes</p>
        
        <div className="h-16 mt-4 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
              <Line 
                type="monotone" 
                dataKey="val" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}