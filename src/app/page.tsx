"use client"

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
  Menu
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
import { ThemeToggle } from "@/components/theme-toggle"
import { TrackingCodeDialog } from "@/components/dashboard/tracking-code-dialog"

export default function DashboardPage() {
  const data = useAnalyticsData()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background transition-colors duration-300">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-2 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <BarChart2 className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">MuRsHaD</span>
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
          <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 md:px-6 backdrop-blur transition-all">
            <div className="flex items-center gap-4">
              <div className="hidden md:flex relative w-64 lg:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search metrics, users, sources..."
                  className="pl-8 bg-muted/40 border-none h-9 w-full focus-visible:ring-1 focus-visible:bg-muted/60 transition-colors"
                />
              </div>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-primary" />
              </Button>
              <div className="h-8 w-px bg-border mx-1 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-semibold">MuRsHaDI</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Administrator</p>
                </div>
                <Avatar className="h-8 w-8 ring-2 ring-primary/10 transition-all hover:ring-primary/30">
                  <AvatarImage src="https://picsum.photos/seed/user1/40/40" />
                  <AvatarFallback className="bg-primary/5 text-primary">MU</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-in fade-in slide-in-from-top-4 duration-500">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Analytics Overview</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Monitoring data streams from your original website sources.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <TrackingCodeDialog />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Box 1: Active Users */}
              <div className="col-span-1">
                <ActiveUsersWidget count={data.activeUsers} history={data.activeUsersHistory} />
              </div>

              {/* Box 2: Traffic Acquisition Details */}
              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <TrafficDetailsTable sources={data.trafficSources} />
              </div>

              {/* Box 3: Geographic Activity */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                <GeoVisualizationWidget hotspots={data.geoHotspots} />
              </div>

              {/* Box 4: Traffic Source Segment */}
              <div className="col-span-1">
                <TrafficSourceWidget sources={data.trafficSources} />
              </div>

              {/* Box 5: Content Performance */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                <ContentPerformanceWidget items={data.contentPerformance} />
              </div>
            </div>
          </main>
          
          <footer className="py-6 px-4 md:px-8 border-t bg-card/30 mt-auto">
             <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
                <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                  © 2024 MuRsHaD. All data processed in real-time.
                </p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-tighter">
                   <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                   <a href="#" className="hover:text-primary transition-colors">Security Standards</a>
                   <a href="#" className="hover:text-primary transition-colors">API Documentation</a>
                   <a href="#" className="hover:text-primary transition-colors">System Health</a>
                </div>
             </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
