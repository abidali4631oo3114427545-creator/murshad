"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GeoPoint } from "@/hooks/use-analytics-data"
import { MapPin, Globe, Activity } from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { ScrollArea } from "@/components/ui/scroll-area"

interface GeoVisualizationWidgetProps {
  hotspots: GeoPoint[]
}

const sparkData = Array.from({ length: 15 }, (_, i) => ({ val: Math.floor(Math.random() * 40) + 60 }))

export function GeoVisualizationWidget({ hotspots }: GeoVisualizationWidgetProps) {
  const mapPlaceholder = PlaceHolderImages.find(img => img.id === 'world-map')

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium">Geographic Activity</CardTitle>
          <div className="flex items-center gap-2">
             <div className="h-4 w-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparkData}>
                    <Line 
                      type="monotone" 
                      dataKey="val" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                      dot={false} 
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
             </div>
             <span className="text-[10px] font-bold text-primary flex items-center gap-0.5">
               <Activity className="h-3 w-3" />
               FAST LINE
             </span>
          </div>
        </div>
        <Globe className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="rounded-md h-40 relative overflow-hidden border border-border shadow-inner bg-muted/20 shrink-0">
           {mapPlaceholder && (
             <Image 
               src={mapPlaceholder.imageUrl} 
               alt={mapPlaceholder.description}
               fill
               className="object-cover opacity-40 grayscale contrast-125"
               data-ai-hint={mapPlaceholder.imageHint}
             />
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
           
           <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
           <div className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-primary animate-pulse delay-75 shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
           <div className="absolute top-1/3 right-1/4 h-2 w-2 rounded-full bg-primary animate-pulse delay-150 shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
           <div className="absolute bottom-1/4 right-1/3 h-2 w-2 rounded-full bg-primary animate-pulse delay-300 shadow-[0_0_8px_rgba(var(--primary),0.8)]" />

           <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded border shadow-sm text-[10px] font-bold text-primary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              MAP VISUALIZATION ACTIVE
           </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <p className="text-xs font-bold uppercase text-muted-foreground mb-3 tracking-wider">Top 50 Countries</p>
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-3">
              {hotspots.slice(0, 50).map((spot, index) => (
                <div key={spot.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-bold text-muted-foreground w-4">{index + 1}.</span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/5">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{spot.name}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold">{spot.users.toLocaleString()}</span>
                    <span className="text-[9px] uppercase text-muted-foreground font-semibold">Active</span>
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
