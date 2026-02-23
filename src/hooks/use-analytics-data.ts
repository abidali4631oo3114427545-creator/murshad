"use client"

import { useState, useEffect } from 'react'

export type TrafficSource = {
  name: string
  medium: string
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
    { name: 'Direct', medium: '(none)', value: 450, color: 'hsl(var(--chart-1))' },
    { name: 'Google', medium: 'organic', value: 300, color: 'hsl(var(--chart-2))' },
    { name: 'Newsletter', medium: 'email', value: 200, color: 'hsl(var(--chart-3))' },
    { name: 'LinkedIn', medium: 'social', value: 150, color: 'hsl(var(--chart-4))' },
  ],
  contentPerformance: [
    { id: '1', title: 'Getting Started with Real-time AI', views: 5420, engagement: 85, trend: 'up' },
    { id: '2', title: 'Data Ingestion Best Practices', views: 3210, engagement: 72, trend: 'up' },
    { id: '3', title: 'Scaling Your Analytics Pipeline', views: 2150, engagement: 64, trend: 'stable' },
    { id: '4', title: 'Visualizing User Behavior', views: 1890, engagement: 91, trend: 'up' },
    { id: '5', title: 'Privacy in Modern Tracking', views: 940, engagement: 45, trend: 'down' },
  ],
  geoHotspots: [
    { id: 'us', name: 'USA', users: 450, coords: [40, -74] },
    { id: 'uk', name: 'United Kingdom', users: 320, coords: [51, 0] },
    { id: 'jp', name: 'Japan', users: 280, coords: [35, 139] },
    { id: 'de', name: 'Germany', users: 150, coords: [52, 13] },
    { id: 'br', name: 'Brazil', users: 90, coords: [-23, -46] },
    { id: 'ca', name: 'Canada', users: 85, coords: [56, -106] },
    { id: 'fr', name: 'France', users: 78, coords: [46, 2] },
    { id: 'au', name: 'Australia', users: 65, coords: [-25, 133] },
    { id: 'in', name: 'India', users: 55, coords: [20, 78] },
    { id: 'kr', name: 'South Korea', users: 42, coords: [35, 127] },
    { id: 'it', name: 'Italy', users: 40, coords: [41, 12] },
    { id: 'es', name: 'Spain', users: 38, coords: [40, -3] },
    { id: 'mx', name: 'Mexico', users: 35, coords: [23, -102] },
    { id: 'id', name: 'Indonesia', users: 33, coords: [-0.7, 113] },
    { id: 'nl', name: 'Netherlands', users: 31, coords: [52, 5] },
    { id: 'sa', name: 'Saudi Arabia', users: 30, coords: [23, 45] },
    { id: 'ch', name: 'Switzerland', users: 28, coords: [46, 8] },
    { id: 'tr', name: 'Turkey', users: 27, coords: [38, 35] },
    { id: 'tw', name: 'Taiwan', users: 26, coords: [23, 120] },
    { id: 'pl', name: 'Poland', users: 25, coords: [51, 19] },
    { id: 'se', name: 'Sweden', users: 24, coords: [60, 18] },
    { id: 'be', name: 'Belgium', users: 23, coords: [50, 4] },
    { id: 'th', name: 'Thailand', users: 22, coords: [15, 100] },
    { id: 'ae', name: 'UAE', users: 21, coords: [23, 53] },
    { id: 'il', name: 'Israel', users: 20, coords: [31, 34] },
    { id: 'no', name: 'Norway', users: 19, coords: [60, 10] },
    { id: 'at', name: 'Austria', users: 18, coords: [47, 14] },
    { id: 'sg', name: 'Singapore', users: 17, coords: [1.3, 103] },
    { id: 'ph', name: 'Philippines', users: 16, coords: [12, 121] },
    { id: 'vn', name: 'Vietnam', users: 15, coords: [14, 108] },
    { id: 'cl', name: 'Chile', users: 14, coords: [-35, -71] },
    { id: 'pt', name: 'Portugal', users: 13, coords: [39, -8] },
    { id: 'gr', name: 'Greece', users: 12, coords: [39, 21] },
    { id: 'cz', name: 'Czechia', users: 11, coords: [49, 15] },
    { id: 'ro', name: 'Romania', users: 10, coords: [45, 24] },
    { id: 'co', name: 'Colombia', users: 9, coords: [4, -72] },
    { id: 'pe', name: 'Peru', users: 8, coords: [-9, -75] },
    { id: 'my', name: 'Malaysia', users: 7, coords: [4, 101] },
    { id: 'nz', name: 'New Zealand', users: 6, coords: [-40, 174] },
    { id: 'ie', name: 'Ireland', users: 5, coords: [53, -8] },
    { id: 'fi', name: 'Finland', users: 4, coords: [61, 25] },
    { id: 'dk', name: 'Denmark', users: 4, coords: [56, 9] },
    { id: 'hu', name: 'Hungary', users: 3, coords: [47, 19] },
    { id: 'ua', name: 'Ukraine', users: 3, coords: [48, 31] },
    { id: 'pk', name: 'Pakistan', users: 2, coords: [30, 69] },
    { id: 'ng', name: 'Nigeria', users: 2, coords: [9, 8] },
    { id: 'eg', name: 'Egypt', users: 2, coords: [26, 30] },
    { id: 'za', name: 'South Africa', users: 1, coords: [-30, 22] },
    { id: 'ar', name: 'Argentina', users: 1, coords: [-38, -63] },
    { id: 'ma', name: 'Morocco', users: 1, coords: [31, -7] },
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
          users: Math.max(1, g.users + Math.floor(Math.random() * 5) - 2)
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
