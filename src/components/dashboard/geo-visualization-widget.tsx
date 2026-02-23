"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GeoPoint } from "@/hooks/use-analytics-data"
import { MapPin, Globe, Activity, Zap } from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { AreaChart, Area, ResponsiveContainer } from "recharts"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface GeoVisualizationWidgetProps {
  hotspots: GeoPoint[]
}

const sparkData = Array.from({ length: 15 }, (_, i) => ({ val: Math.floor(Math.random() * 40) + 60 }))

const MARKER_COLORS = [
  'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]',
  'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]',
  'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]',
  'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]',
  'bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]'
];

export function GeoVisualizationWidget({ hotspots }: GeoVisualizationWidgetProps) {
  const mapPlaceholder = PlaceHolderImages.find(img => img.id === 'world-map')

  return (
    <Card className="h-full flex flex-col border-t-2 border-primary shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Geographic Activity</CardTitle>
          <div className="flex items-center gap-2">
             <div className="h-5 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparkData}>
                    <Area 
                      type="step" 
                      dataKey="val" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={1.5} 
                      dot={false} 
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
             <span className="text-[10px] font-black text-primary flex items-center gap-0.5 animate-pulse uppercase tracking-tighter">
               <Activity className="h-3 w-3" />
               STREAM ACTIVE
             </span>
          </div>
        </div>
        <Globe className="h-4 w-4 text-primary opacity-50" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="rounded-xl h-44 relative overflow-hidden border border-border/50 shadow-inner bg-muted/20 shrink-0 group">
           {mapPlaceholder && (
             <Image 
               src={mapPlaceholder.imageUrl} 
               alt={mapPlaceholder.description}
               fill
               className="object-cover transition-transform duration-1000 group-hover:scale-105"
               data-ai-hint={mapPlaceholder.imageHint}
             />
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
           
           {/* Dynamic Multi-colored Markers */}
           <div className="absolute top-1/4 left-[15%] h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.8)] border border-white/20" />
           <div className="absolute top-1/2 left-[48%] h-3 w-3 rounded-full bg-rose-500 animate-pulse delay-75 shadow-[0_0_12px_rgba(244,63,94,0.8)] border border-white/20" />
           <div className="absolute top-1/3 right-[30%] h-2 w-2 rounded-full bg-emerald-500 animate-pulse delay-150 shadow-[0_0_12px_rgba(16,185,129,0.8)] border border-white/20" />
           <div className="absolute bottom-[20%] right-[40%] h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse delay-300 shadow-[0_0_12px_rgba(245,158,11,0.8)] border border-white/20" />
           <div className="absolute top-[60%] right-[10%] h-2 w-2 rounded-full bg-violet-500 animate-pulse delay-500 shadow-[0_0_12px_rgba(139,92,246,0.8)] border border-white/20" />

           <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-primary/20 shadow-xl text-[10px] font-black text-primary uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              MAP VISUALIZATION ACTIVE
           </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Global Distribution</p>
            <Badge variant="outline" className="text-[9px] font-bold border-primary/20 text-primary uppercase px-1.5 h-4">TOP 50</Badge>
          </div>
          <ScrollArea className="h-[180px] pr-4">
            <div className="space-y-4">
              {hotspots.slice(0, 50).map((spot, index) => (
                <div key={spot.id} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-black text-muted-foreground/40 w-5">{String(index + 1).padStart(2, '0')}</span>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${MARKER_COLORS[index % MARKER_COLORS.length].split(' ')[0]}/10 group-hover:scale-110`}>
                      <MapPin className={`h-4 w-4 ${MARKER_COLORS[index % MARKER_COLORS.length].split(' ')[0].replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">{spot.name}</p>
                      <p className="text-[9px] font-medium text-muted-foreground uppercase tracking-tighter">Region Node</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-black tabular-nums">{spot.users.toLocaleString()}</span>
                    <div className="flex items-center gap-1">
                      <Zap className="h-2.5 w-2.5 text-emerald-500 fill-emerald-500" />
                      <span className="text-[9px] uppercase text-emerald-500 font-black tracking-tighter">ACTIVE</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}