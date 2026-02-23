"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, ArrowUpRight } from "lucide-react"
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from "recharts"

interface ActiveUsersWidgetProps {
  count: number
  history: number[]
}

export function ActiveUsersWidget({ count, history }: ActiveUsersWidgetProps) {
  const chartData = history.map((val, i) => ({ val, i }))

  return (
    <Card className="overflow-hidden border-t-2 border-primary shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Real-time Users</CardTitle>
        <div className="flex items-center space-x-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>LIVE</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-4xl font-black tracking-tighter">{count.toLocaleString()}</div>
          <div className="flex items-center text-xs text-emerald-500 font-black">
            <ArrowUpRight className="mr-0.5 h-3.5 w-3.5" />
            +12.4%
          </div>
        </div>
        <p className="text-[10px] font-medium text-muted-foreground mt-1 uppercase tracking-tight">Active sessions in the last 5 minutes</p>
        
        <div className="h-24 mt-6 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background/95 backdrop-blur-sm p-2 shadow-xl border-primary/20">
                        <p className="text-[10px] font-bold text-primary uppercase">Active Users</p>
                        <p className="text-sm font-black">{payload[0].value}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <YAxis hide domain={['dataMin - 50', 'dataMax + 50']} />
              <Area 
                type="monotone" 
                dataKey="val" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorUsers)" 
                strokeWidth={3}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}