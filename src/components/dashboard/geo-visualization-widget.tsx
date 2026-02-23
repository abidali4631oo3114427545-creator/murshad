"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GeoPoint } from "@/hooks/use-analytics-data"
import { MapPin, Globe } from "lucide-react"

interface GeoVisualizationWidgetProps {
  hotspots: GeoPoint[]
}

export function GeoVisualizationWidget({ hotspots }: GeoVisualizationWidgetProps) {
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
        
        <div className="mt-6 rounded-md bg-accent/10 h-32 flex items-center justify-center relative overflow-hidden border border-accent/20">
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent animate-pulse" />
           <p className="text-xs text-accent font-medium z-10">Map Visualization Active</p>
        </div>
      </CardContent>
    </Card>
  )
}