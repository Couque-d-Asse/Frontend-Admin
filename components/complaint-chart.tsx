"use client"

import { useState, useEffect } from "react"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { loadComplaintData, ComplaintData } from "@/lib/data-loader"

// 기본 데이터 (로딩 중 또는 에러 시 사용)
const defaultTrafficData = [
  { date: "25.08.13", count: 1450, change: 2.1 },
  { date: "25.08.14", count: 1380, change: -4.8 },
  { date: "25.08.15", count: 1520, change: 10.1 },
]

const defaultRoadData = [
  { date: "25.08.13", count: 890, change: 1.2 },
  { date: "25.08.14", count: 920, change: 3.4 },
  { date: "25.08.15", count: 850, change: -7.6 },
]

interface ComplaintChartProps {
  type: "traffic" | "road" | "combined"
}

// 커스텀 툴팁 컴포넌트
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // 건수와 증감률 데이터 찾기
    const countData = payload.find((item: any) => item.dataKey === "count")
    const changeData = payload.find((item: any) => item.dataKey === "change")
    
    return (
      <div style={{
        backgroundColor: "white",
        border: "1px solid #e2e8f0",
        borderRadius: "6px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        padding: "8px 12px",
      }}>
        <p style={{ color: "#1e293b", margin: "0 0 4px 0", fontWeight: "bold" }}>
          {label}
        </p>
        {countData && (
          <p style={{ color: "#1e293b", margin: "4px 0" }}>
            <span style={{ color: countData.color }}>●</span> 건수: {countData.value}
          </p>
        )}
        {changeData && (
          <p style={{ color: "#1e293b", margin: "4px 0" }}>
            <span style={{ color: changeData.color }}>●</span> 증감률: {changeData.value}%
          </p>
        )}
      </div>
    )
  }
  return null
}

export function ComplaintChart({ type }: ComplaintChartProps) {
  const [activeType, setActiveType] = useState<"traffic" | "road">("traffic")
  const [activePeriod, setActivePeriod] = useState<"daily" | "monthly" | "yearly">("daily")
  const [trafficData, setTrafficData] = useState<ComplaintData[]>(defaultTrafficData)
  const [roadData, setRoadData] = useState<ComplaintData[]>(defaultRoadData)
  const [loading, setLoading] = useState(false)

  const currentType = type === "combined" ? activeType : type
  const data = currentType === "traffic" ? trafficData : roadData
  const color = currentType === "traffic" ? "#B22B78" : "#C73E8F"

  // 데이터 로드 함수
  const loadData = async (period: "daily" | "monthly", category: "traffic" | "road") => {
    setLoading(true)
    try {
      const loadedData = await loadComplaintData(period, category)
      if (category === "traffic") {
        setTrafficData(loadedData.length > 0 ? loadedData : defaultTrafficData)
      } else {
        setRoadData(loadedData.length > 0 ? loadedData : defaultRoadData)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      // 에러 시 기본 데이터 사용
      if (category === "traffic") {
        setTrafficData(defaultTrafficData)
      } else {
        setRoadData(defaultRoadData)
      }
    } finally {
      setLoading(false)
    }
  }

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    loadData("daily", "traffic")
    loadData("daily", "road")
  }, [])

  // 기간 변경 시 데이터 로드
  useEffect(() => {
    if (activePeriod !== "yearly") { // yearly는 아직 구현하지 않음
      loadData(activePeriod, "traffic")
      loadData(activePeriod, "road")
    }
  }, [activePeriod])

  // 타입 변경 시 해당 데이터가 없으면 로드
  useEffect(() => {
    const currentData = currentType === "traffic" ? trafficData : roadData
    if (currentData === (currentType === "traffic" ? defaultTrafficData : defaultRoadData)) {
      if (activePeriod !== "yearly") {
        loadData(activePeriod, currentType)
      }
    }
  }, [currentType, activePeriod])

  return (
    <div className="h-full flex flex-col">
      {type === "combined" && (
        <div className="flex justify-end mb-4">
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <Button
                variant={activeType === "traffic" ? "default" : "outline"}
                size="default"
                onClick={() => setActiveType("traffic")}
                className={
                  activeType === "traffic"
                    ? "px-4 py-2"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2"
                }
                style={{
                  backgroundColor: activeType === "traffic" ? "#B22B78" : "transparent",
                  color: activeType === "traffic" ? "white" : "#6B7280",
                  borderColor: activeType === "traffic" ? "#B22B78" : "#D1D5DB",
                }}
              >
                교통 민원
              </Button>
              <Button
                variant={activeType === "road" ? "default" : "outline"}
                size="default"
                onClick={() => setActiveType("road")}
                className={
                  activeType === "road"
                    ? "px-4 py-2"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2"
                }
                style={{
                  backgroundColor: activeType === "road" ? "#B22B78" : "transparent",
                  color: activeType === "road" ? "white" : "#6B7280",
                  borderColor: activeType === "road" ? "#B22B78" : "#D1D5DB",
                }}
              >
                도로 민원
              </Button>
            </div>
            <div className="flex justify-end space-x-1">
              <Button
                variant={activePeriod === "daily" ? "default" : "outline"}
                size="sm"
                onClick={() => setActivePeriod("daily")}
                className={
                  activePeriod === "daily"
                    ? "px-2 py-1 text-xs"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 px-2 py-1 text-xs"
                }
                style={{
                  backgroundColor: activePeriod === "daily" ? "#C73E8F" : "transparent",
                  color: activePeriod === "daily" ? "white" : "#6B7280",
                  borderColor: activePeriod === "daily" ? "#C73E8F" : "#D1D5DB",
                }}
              >
                일별
              </Button>
              <Button
                variant={activePeriod === "monthly" ? "default" : "outline"}
                size="sm"
                onClick={() => setActivePeriod("monthly")}
                className={
                  activePeriod === "monthly"
                    ? "px-2 py-1 text-xs"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 px-2 py-1 text-xs"
                }
                style={{
                  backgroundColor: activePeriod === "monthly" ? "#C73E8F" : "transparent",
                  color: activePeriod === "monthly" ? "white" : "#6B7280",
                  borderColor: activePeriod === "monthly" ? "#C73E8F" : "#D1D5DB",
                }}
              >
                월별
              </Button>
              <Button
                variant={activePeriod === "yearly" ? "default" : "outline"}
                size="sm"
                onClick={() => setActivePeriod("yearly")}
                className={
                  activePeriod === "yearly"
                    ? "px-2 py-1 text-xs"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 px-2 py-1 text-xs"
                }
                style={{
                  backgroundColor: activePeriod === "yearly" ? "#C73E8F" : "transparent",
                  color: activePeriod === "yearly" ? "white" : "#6B7280",
                  borderColor: activePeriod === "yearly" ? "#C73E8F" : "#D1D5DB",
                }}
              >
                연도별
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">데이터 로딩 중...</div>
          </div>
        )}
        {!loading && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="count" fill={color} opacity={0.8} radius={[2, 2, 0, 0]} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="change"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex justify-center mt-4 space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: color }}></div>
          <span style={{ color: "#B22B78" }}>건수</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span style={{ color: "#B22B78" }}>증감률</span>
        </div>
      </div>
    </div>
  )
}
