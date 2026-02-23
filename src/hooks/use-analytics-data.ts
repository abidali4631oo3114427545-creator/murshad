"use client"

import { useState, useEffect } from 'react'

export type TrafficSource = {
  name: string
  value: number
  color: string
}

export type ContentMetric = {
  id: string
  title: string
  views: number
  engagement: number
  trend: 'up' | 'down' | 'stable'
}

export type GeoPoint = {
  id: string
  name: string
  users: number
  coords: [number, number]
}

export type AnalyticsData = {
  activeUsers: number
  activeUsersHistory: number[]
  trafficSources: TrafficSource[]
  contentPerformance: ContentMetric[]
  geoHotspots: GeoPoint[]
}

const INITIAL_DATA: AnalyticsData = {
  activeUsers: 1240,
  activeUsersHistory: Array.from({ length: 20 }, () => Math.floor(Math.random() * 500) + 1000),
  trafficSources: [
    { name: 'Direct', value: 450, color: 'hsl(var(--chart-1))' },
    { name: 'Organic', value: 300, color: 'hsl(var(--chart-2))' },
    { name: 'Referral', value: 200, color: 'hsl(var(--chart-3))' },
    { name: 'Social', value: 150, color: 'hsl(var(--chart-4))' },
  ],
  contentPerformance: [
    { id: '1', title: 'Getting Started with Real-time AI', views: 5420, engagement: 85, trend: 'up' },
    { id: '2', title: 'Data Ingestion Best Practices', views: 3210, engagement: 72, trend: 'up' },
    { id: '3', title: 'Scaling Your Analytics Pipeline', views: 2150, engagement: 64, trend: 'stable' },
    { id: '4', title: 'Visualizing User Behavior', views: 1890, engagement: 91, trend: 'up' },
    { id: '5', title: 'Privacy in Modern Tracking', views: 940, engagement: 45, trend: 'down' },
  ],
  geoHotspots: [
    { id: 'us', name: 'New York, USA', users: 450, coords: [40, -74] },
    { id: 'uk', name: 'London, UK', users: 320, coords: [51, 0] },
    { id: 'jp', name: 'Tokyo, JP', users: 280, coords: [35, 139] },
    { id: 'de', name: 'Berlin, DE', users: 150, coords: [52, 13] },
    { id: 'br', name: 'São Paulo, BR', users: 90, coords: [-23, -46] },
  ]
}

export function useAnalyticsData() {
  const [data, setData] = useState<AnalyticsData>(INITIAL_DATA)

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const change = Math.floor(Math.random() * 41) - 20
        const newActive = Math.max(800, prev.activeUsers + change)
        const newHistory = [...prev.activeUsersHistory.slice(1), newActive]

        const newSources = prev.trafficSources.map(s => ({
          ...s,
          value: Math.max(50, s.value + Math.floor(Math.random() * 11) - 5)
        }))

        const newContent = prev.contentPerformance.map(c => ({
          ...c,
          views: c.views + Math.floor(Math.random() * 10),
          engagement: Math.min(100, Math.max(10, c.engagement + (Math.random() > 0.5 ? 1 : -1)))
        }))

        const newGeo = prev.geoHotspots.map(g => ({
          ...g,
          users: Math.max(10, g.users + Math.floor(Math.random() * 7) - 3)
        }))

        return {
          ...prev,
          activeUsers: newActive,
          activeUsersHistory: newHistory,
          trafficSources: newSources,
          contentPerformance: newContent,
          geoHotspots: newGeo
        }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return data
}