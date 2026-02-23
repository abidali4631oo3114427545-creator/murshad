"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAITrendInsights } from "@/app/actions"
import { ProactiveTrendInsightsOutput } from "@/ai/flows/proactive-trend-insights"
import { Badge } from "@/components/ui/badge"

interface AIInsightsWidgetProps {
  userInteractions: string
  contentPerformance: string
}

export function AIInsightsWidget({ userInteractions, contentPerformance }: AIInsightsWidgetProps) {
  const [insights, setInsights] = useState<ProactiveTrendInsightsOutput | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchInsights = async () => {
    setLoading(true)
    const result = await getAITrendInsights({
      userInteractions,
      contentPerformance,
      timeframe: "the last 30 minutes"
    })
    setInsights(result)
    setLoading(false)
  }

  useEffect(() => {
    fetchInsights()
  }, [])

  return (
    <Card className="h-full border-primary/20 bg-gradient-to-br from-white to-primary/5">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle className="text-sm font-bold">AI Trend Identifier</CardTitle>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7" 
          onClick={fetchInsights}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4 py-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          </div>
        ) : insights?.trends && insights.trends.length > 0 ? (
          <div className="space-y-4">
            {insights.trends.map((trend, i) => (
              <div key={i} className="rounded-lg border bg-background/50 p-3 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-foreground leading-tight">{trend.description}</p>
                  <Badge variant="secondary" className="text-[10px] whitespace-nowrap">Emerging</Badge>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Impact: {trend.impact}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <AlertCircle className="h-8 w-8 mb-2 opacity-20" />
            <p className="text-sm">No significant trends detected currently.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}