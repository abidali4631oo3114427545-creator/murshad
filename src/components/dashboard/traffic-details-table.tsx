"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrafficSource } from "@/hooks/use-analytics-data"

interface TrafficDetailsTableProps {
  sources: TrafficSource[]
}

export function TrafficDetailsTable({ sources }: TrafficDetailsTableProps) {
  return (
    <Card className="h-full overflow-hidden shadow-md border-t-2 border-primary">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold tracking-tight">Traffic Acquisition</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader className="bg-[#005582] hover:bg-[#005582]">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="h-10 pl-6 text-white font-bold text-xs uppercase tracking-wider">Source</TableHead>
              <TableHead className="h-10 text-white font-bold text-xs uppercase tracking-wider">Medium</TableHead>
              <TableHead className="h-10 pr-6 text-right text-white font-bold text-xs uppercase tracking-wider">Active Users</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sources.map((source, i) => (
              <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                <TableCell className="pl-6 py-3 font-medium text-sm">{source.name}</TableCell>
                <TableCell className="py-3 text-sm text-muted-foreground">{source.medium}</TableCell>
                <TableCell className="pr-6 py-3 text-right font-semibold text-sm">
                  {source.value.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
