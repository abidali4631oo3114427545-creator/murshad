"use client"

import { useState } from 'react'
import { SidebarProvider, SidebarInset, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  BarChart2, 
  Globe, 
  Users, 
  Settings, 
  HelpCircle,
  Bell,
  Search,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAnalyticsData } from "@/hooks/use-analytics-data"
import { ActiveUsersWidget } from "@/components/dashboard/active-users-widget"
import { TrafficSourceWidget } from "@/components/dashboard/traffic-source-widget"
import { ContentPerformanceWidget } from "@/components/dashboard/content-performance-widget"
import { GeoVisualizationWidget } from "@/components/dashboard/geo-visualization-widget"
import { TrafficDetailsTable } from "@/components/dashboard/traffic-details-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardPage() {
  const data = useAnalyticsData()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-2 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BarChart2 className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">Insight Stream</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="mt-4 px-2">
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Overview">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Analytics">
                  <BarChart2 className="h-4 w-4" />
                  <span>Real-time Stats</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Users">
                  <Users className="h-4 w-4" />
                  <span>User Segments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Global">
                  <Globe className="h-4 w-4" />
                  <span>Geographic</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="mt-auto p-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Help">
                    <HelpCircle className="h-4 w-4" />
                    <span>Support</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/80 px-6 backdrop-blur">
            <div className="flex items-center gap-4">
              <div className="hidden md:flex relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search metrics..."
                  className="pl-8 bg-muted/50 border-none h-9 w-full focus-visible:ring-1"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-primary" />
              </Button>
              <div className="h-8 w-px bg-border mx-1" />
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-semibold">Alex Rivers</p>
                  <p className="text-[10px] text-muted-foreground">Admin Access</p>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/seed/user1/40/40" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics Overview</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Monitoring data streams from 12 active sources.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Configure
                </Button>
                <Button size="sm" className="gap-2 bg-primary">
                  <Plus className="h-4 w-4" />
                  New Widget
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Row 1 */}
              <div className="col-span-1 lg:col-span-1">
                <ActiveUsersWidget count={data.activeUsers} history={data.activeUsersHistory} />
              </div>
              
              <div className="col-span-1 lg:col-span-1 xl:col-span-1">
                <TrafficSourceWidget sources={data.trafficSources} />
              </div>

              <div className="col-span-1 lg:col-span-1 xl:col-span-2">
                <GeoVisualizationWidget hotspots={data.geoHotspots} />
              </div>

              {/* Row 2 */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3">
                <ContentPerformanceWidget items={data.contentPerformance} />
              </div>

              <div className="col-span-1 lg:col-span-1 xl:col-span-1">
                <TrafficDetailsTable sources={data.trafficSources} />
              </div>
            </div>
          </main>
          
          <footer className="py-6 px-8 border-t bg-white/50">
             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-muted-foreground">© 2024 Insight Stream. All data processed in real-time.</p>
                <div className="flex gap-6 text-xs text-muted-foreground font-medium">
                   <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                   <a href="#" className="hover:text-primary transition-colors">Data Processing</a>
                   <a href="#" className="hover:text-primary transition-colors">System Status</a>
                </div>
             </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
