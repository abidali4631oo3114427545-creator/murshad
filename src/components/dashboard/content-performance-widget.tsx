"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { ContentMetric } from "@/hooks/use-analytics-data"

interface ContentPerformanceWidgetProps {
  items: ContentMetric[]
}

export function ContentPerformanceWidget({ items }: ContentPerformanceWidgetProps) {
  return (
    <Card className="h-full border-t-2 border-primary">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Content Performance</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Content Piece</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead className="pr-6 text-right">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="pl-6 font-medium max-w-[180px] truncate">
                  {item.title}
                </TableCell>
                <TableCell>{item.views.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={item.engagement} className="h-1.5 w-12" />
                    <span className="text-xs font-medium">{item.engagement}%</span>
                  </div>
                </TableCell>
                <TableCell className="pr-6 text-right">
                  {item.trend === 'up' && <TrendingUp className="ml-auto h-4 w-4 text-green-500" />}
                  {item.trend === 'down' && <TrendingDown className="ml-auto h-4 w-4 text-red-500" />}
                  {item.trend === 'stable' && <Minus className="ml-auto h-4 w-4 text-muted-foreground" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
