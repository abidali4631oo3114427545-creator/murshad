
"use client"

import { useState, useEffect } from 'react'
import { useDoc, useFirestore } from '@/firebase'
import { doc } from 'firebase/firestore'

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

// Stable initial data for server-side rendering to prevent hydration mismatches
const STABLE_INITIAL_DATA: AnalyticsData = {
  activeUsers: 0,
  activeUsersHistory: Array(20).fill(0),
  trafficSources: [],
  contentPerformance: [],
  geoHotspots: []
}

export function useAnalyticsData() {
  const db = useFirestore()
  const statsRef = db ? doc(db, 'stats', 'current') : null
  const { data: realStats } = useDoc(statsRef)

  const [data, setData] = useState<AnalyticsData>(STABLE_INITIAL_DATA)

  // Initialize data on the client side only to avoid hydration errors
  useEffect(() => {
    setData({
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
      ]
    })
  }, [])

  useEffect(() => {
    if (realStats) {
      setData(prev => ({
        ...prev,
        activeUsers: realStats.activeUsers ?? prev.activeUsers,
        activeUsersHistory: realStats.activeUsersHistory ?? prev.activeUsersHistory
      }))
    }
  }, [realStats])

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        // Only run simulation if we have initialized data
        if (prev.activeUsers === 0) return prev;

        const change = Math.floor(Math.random() * 41) - 20
        const newActive = realStats?.activeUsers ?? Math.max(800, prev.activeUsers + change)
        const newHistory = realStats?.activeUsersHistory ?? [...prev.activeUsersHistory.slice(1), newActive]

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
  }, [realStats])

  return data
}
