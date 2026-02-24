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
        <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-tighter">Real-time</Badge>
      </CardHeader>
      <CardContent className="px-0 pt-0">
        <Table>
          <TableHeader className="bg-primary/10 hover:bg-primary/10 border-none">
            <TableRow className="border-none hover:bg-transparent transition-none">
              <TableHead className="h-10 pl-4 text-primary font-bold text-[10px] uppercase tracking-wider border-none">Source</TableHead>
              <TableHead className="h-10 text-primary font-bold text-[10px] uppercase tracking-wider border-none">Medium</TableHead>
              <TableHead className="h-10 pr-4 text-right text-primary font-bold text-[10px] uppercase tracking-wider border-none">Users</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sources.length > 0 ? (
              sources.slice(0, 5).map((source, i) => (
                <TableRow key={i} className="hover:bg-muted/50 border-border/50 transition-colors group">
                  <TableCell className="pl-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: source.color }} />
                      <span className="font-bold text-xs truncate group-hover:text-primary transition-colors max-w-[80px]">{source.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-70">
                      {source.medium}
                    </span>
                  </TableCell>
                  <TableCell className="pr-4 py-3 text-right">
                    <span className="font-black text-xs tabular-nums">{source.value.toLocaleString()}</span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground text-[10px] uppercase tracking-widest font-bold">
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
