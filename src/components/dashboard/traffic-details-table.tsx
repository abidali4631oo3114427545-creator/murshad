"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrafficSource } from "@/hooks/use-analytics-data"
import { Badge } from "@/components/ui/badge"

interface TrafficDetailsTableProps {
  sources: TrafficSource[]
}

export function TrafficDetailsTable({ sources }: TrafficDetailsTableProps) {
  return (
    <Card className="h-full overflow-hidden shadow-sm border-t-2 border-primary hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Traffic Acquisition Details</CardTitle>
        <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-tighter">Real-time Data</Badge>
      </CardHeader>
      <CardContent className="px-0 pt-0">
        <Table>
          <TableHeader className="bg-[#005c97] hover:bg-[#005c97] border-none">
            <TableRow className="border-none hover:bg-transparent transition-none">
              <TableHead className="h-12 pl-6 text-white font-bold text-sm border-none">Source</TableHead>
              <TableHead className="h-12 text-white font-bold text-sm border-none">Medium</TableHead>
              <TableHead className="h-12 pr-6 text-right text-white font-bold text-sm border-none">Active Users</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sources.length > 0 ? (
              sources.map((source, i) => (
                <TableRow key={i} className="hover:bg-muted/50 border-border/50 transition-colors group">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: source.color }} />
                      <span className="font-bold text-sm group-hover:text-primary transition-colors">{source.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-tighter border-muted-foreground/20 text-muted-foreground">
                      {source.medium}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-6 py-4 text-right">
                    <span className="font-black text-sm tabular-nums">{source.value.toLocaleString()}</span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground text-xs uppercase tracking-widest font-bold">
                  Waiting for website traffic...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
