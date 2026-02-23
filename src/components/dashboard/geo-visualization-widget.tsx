
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GeoPoint } from "@/hooks/use-analytics-data"
import { MapPin, Globe } from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

interface GeoVisualizationWidgetProps {
  hotspots: GeoPoint[]
}

export function GeoVisualizationWidget({ hotspots }: GeoVisualizationWidgetProps) {
  const mapPlaceholder = PlaceHolderImages.find(img => img.id === 'world-map')

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Geographic Activity</CardTitle>
        <Globe className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hotspots.map((spot) => (
            <div key={spot.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">{spot.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">Real-time hotspots</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold">{spot.users}</span>
                <span className="text-[10px] uppercase text-muted-foreground font-semibold">Users</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 rounded-md h-32 relative overflow-hidden border border-border shadow-inner bg-muted/20">
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
           
           {/* Pulsing activity markers */}
           <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
           <div className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-primary animate-pulse delay-75 shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
           <div className="absolute top-1/3 right-1/4 h-2 w-2 rounded-full bg-primary animate-pulse delay-150 shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
           <div className="absolute bottom-1/4 right-1/3 h-2 w-2 rounded-full bg-primary animate-pulse delay-300 shadow-[0_0_8px_rgba(var(--primary),0.8)]" />

           <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded border text-[10px] font-semibold text-primary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              LIVE STREAM
           </div>
        </div>
      </CardContent>
    </Card>
  )
}
