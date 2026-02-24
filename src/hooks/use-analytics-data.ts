
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

const INITIAL_EMPTY_DATA: AnalyticsData = {
  activeUsers: 0,
  activeUsersHistory: Array(20).fill(0),
  trafficSources: [
    { name: 'Direct', medium: '(none)', value: 0, color: 'hsl(var(--chart-1))' },
    { name: 'Google', medium: 'organic', value: 0, color: 'hsl(var(--chart-2))' },
    { name: 'Newsletter', medium: 'email', value: 0, color: 'hsl(var(--chart-3))' },
    { name: 'LinkedIn', medium: 'social', value: 0, color: 'hsl(var(--chart-4))' },
  ],
  contentPerformance: [
    { id: '1', title: 'Real-time Tracking Active', views: 0, engagement: 0, trend: 'stable' },
    { id: '2', title: 'Waiting for Website Integration', views: 0, engagement: 0, trend: 'stable' },
  ],
  geoHotspots: [
    { id: 'node-1', name: 'Primary Region', users: 0, coords: [40, -74] },
    { id: 'node-2', name: 'Secondary Region', users: 0, coords: [51, 0] },
  ]
}

export function useAnalyticsData() {
  const firestore = useFirestore()
  const statsRef = firestore ? doc(firestore, 'stats', 'current') : null
  const { data: realStats } = useDoc(statsRef)

  const [data, setData] = useState<AnalyticsData>(INITIAL_EMPTY_DATA)

  // Sync Firestore data when it arrives
  useEffect(() => {
    if (realStats && typeof realStats.activeUsers === 'number') {
      setData(prev => {
        const newHistory = Array.isArray(realStats.activeUsersHistory) 
          ? realStats.activeUsersHistory 
          : [...prev.activeUsersHistory.slice(1), realStats.activeUsers];
          
        return {
          ...prev,
          activeUsers: realStats.activeUsers,
          activeUsersHistory: newHistory
        }
      })
    }
  }, [realStats])

  return data
}
