"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, CartesianGrid } from "recharts"
import { TrafficSource } from "@/hooks/use-analytics-data"

interface TrafficSourceWidgetProps {
  sources: TrafficSource[]
}

export function TrafficSourceWidget({ sources }: TrafficSourceWidgetProps) {
  return (
    <Card className="h-full border-t-2 border-primary shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Traffic Segmentation</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sources} layout="vertical" margin={{ left: -15, right: 30, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--muted))" opacity={0.4} />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={85} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }} 
              />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-primary/20 bg-background/95 backdrop-blur-md p-3 shadow-2xl">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: data.color }} />
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary">{data.name}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between items-baseline gap-4">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Active Users</span>
                            <span className="text-sm font-black tabular-nums">{data.value.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-baseline gap-4">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Medium</span>
                            <span className="text-[10px] font-black uppercase tracking-tighter">{data.medium}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
                {sources.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    className="hover:opacity-80 transition-opacity cursor-pointer shadow-lg"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          {sources.map((source, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: source.color }} />
              <span className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground">{source.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}