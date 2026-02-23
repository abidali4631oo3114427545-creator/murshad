"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus, Eye, MessageSquare } from "lucide-react"
import { ContentMetric } from "@/hooks/use-analytics-data"
import { Badge } from "@/components/ui/badge"

interface ContentPerformanceWidgetProps {
  items: ContentMetric[]
}

export function ContentPerformanceWidget({ items }: ContentPerformanceWidgetProps) {
  return (
    <Card className="h-full border-t-2 border-primary shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Content Performance</CardTitle>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-[9px] font-bold h-5"><Eye className="h-3 w-3 mr-1" /> Views</Badge>
          <Badge variant="outline" className="text-[9px] font-bold h-5"><MessageSquare className="h-3 w-3 mr-1" /> Eng.</Badge>
        </div>
      </CardHeader>
      <CardContent className="px-0 pt-0">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="border-border/50">
              <TableHead className="pl-6 font-black text-[10px] uppercase tracking-widest">Content Resource</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Views</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Engagement Rate</TableHead>
              <TableHead className="pr-6 text-right font-black text-[10px] uppercase tracking-widest">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/30 border-border/50 group">
                <TableCell className="pl-6 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">{item.title}</span>
                    <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest">Resource ID: {item.id}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <span className="font-black text-sm tabular-nums">{item.views.toLocaleString()}</span>
                </TableCell>
                <TableCell className="py-4 min-w-[140px]">
                  <div className="flex items-center gap-3">
                    <Progress 
                      value={item.engagement} 
                      className="h-2 w-24 bg-muted border border-border/20" 
                    />
                    <span className="text-xs font-black tabular-nums">{item.engagement}%</span>
                  </div>
                </TableCell>
                <TableCell className="pr-6 text-right py-4">
                  <div className="flex justify-end">
                    {item.trend === 'up' && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-tighter">Rising</span>
                      </div>
                    )}
                    {item.trend === 'down' && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-rose-500/10 text-rose-500">
                        <TrendingDown className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-tighter">Falling</span>
                      </div>
                    )}
                    {item.trend === 'stable' && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        <Minus className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-tighter">Stable</span>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}