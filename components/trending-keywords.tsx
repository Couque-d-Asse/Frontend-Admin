"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const trendingData = [
  { keyword: "불법주차", change: 45.2, trend: "up", rank: 1 },
  { keyword: "도로파손", change: 32.8, trend: "up", rank: 2 },
  { keyword: "신호등고장", change: 28.5, trend: "up", rank: 3 },
  { keyword: "교통체증", change: 15.3, trend: "up", rank: 4 },
  { keyword: "횡단보도", change: -8.2, trend: "down", rank: 5 },
  { keyword: "속도위반", change: -12.4, trend: "down", rank: 6 },
  { keyword: "버스정류장", change: -18.7, trend: "down", rank: 7 },
  { keyword: "자전거도로", change: -25.1, trend: "down", rank: 8 },
]

export function TrendingKeywords() {
  return (
    <div className="space-y-2">
      {trendingData.map((item) => (
        <div
          key={item.keyword}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          <div className="flex items-center space-x-3">
            <Badge
              variant="outline"
              className="w-5 h-5 p-0 flex items-center justify-center text-xs"
              style={{ borderColor: "#B22B78", color: "#B22B78" }}
            >
              {item.rank}
            </Badge>
            <span className="font-medium text-sm" style={{ color: "#B22B78" }}>{item.keyword}</span>
          </div>
          <div className="flex items-center space-x-1">
            {item.trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-red-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-blue-500" />
            )}
            <span className={`text-sm font-medium ${item.trend === "up" ? "text-red-500" : "text-blue-500"}`}>
              {item.change > 0 ? "+" : ""}
              {item.change}%
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
