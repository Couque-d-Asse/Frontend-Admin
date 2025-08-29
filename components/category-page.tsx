"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const categoryData = [
  { name: "도로 시설", value: 4200, color: "#B22B78", change: -6.0 },
  { name: "주정차", value: 3800, color: "#C73E8F", change: 2.5 },
  { name: "보행자 안전", value: 2900, color: "#D45AA6", change: -1.2 },
  { name: "교통 운영", value: 2100, color: "#E176BD", change: 4.8 },
  { name: "안전 및 위험 요소", value: 1500, color: "#ED92D4", change: -3.1 },
  { name: "환경·소음", value: 970, color: "#F9AEEB", change: -8.4 },
]

const categoryDetails = {
  "도로 시설": {
    description: [
      "- 포장·노면: 도로파손, 포트홀, 침하, 미끄럼, 도색 지워짐",
      "- 표지·신호: 교통표지판 훼손, 신호등 고장, 안내 부족",
      "- 가로등·조명: 고장, 불빛 부족, 빛 공해",
      "- 도로 청결: 쓰레기, 낙하물, 빗물 고임, 제설 미비",
    ],
  },
  주정차: {
    description: [
      "- 불법주차: 인도 점유, 횡단보도 위 주차, 소방도로 주차",
      "- 주차시설 부족: 공영주차장 요청, 주차면 확대 요구",
      "- 배달·택배 차량: 이중주차, 장시간 점유",
    ],
  },
  "보행자 안전": {
    description: [
      "- 인도·횡단보도: 파손, 단차, 점자블록 불량",
      "- 보행신호: 보행신호 시간 부족, 어린이 보호구역 개선 요구",
      "- 자전거 도로: 차도와 혼용 문제, 안전펜스 부족",
    ],
  },
  "교통 운영": {
    description: [
      "- 신호체계: 신호시간 불균형, 좌회전 신호 필요, 교차로 혼잡",
      "- 차량흐름: 일방통행 지정 요청, 불법 U턴, 지정차로 위반",
      "- 버스·택시: 정류장 부족, 정차 위반, 배차간격 문제",
    ],
  },
  "안전 및 위험 요소": {
    description: [
      "- 사고 다발 구역: 과속방지턱 요청, 방호벽 필요",
      "- 야간 시야 확보: 가로수 가지, 가로등 부족",
      "- 공사·점용: 도로 공사 미정비, 안전펜스 미설치",
    ],
  },
  환경·소음: {
    description: [
      "- 소음·진동: 과속 방지턱 소음, 차량 튜닝 소음",
      "- 대기오염: 배출가스, 먼지 발생",
      "- 악취: 쓰레기 방치, 하수구 문제",
    ],
  },
}

const timeSeriesData = [
  { date: "25.08.14", count: 25000, change: 5 },
  { date: "25.08.15", count: 23800, change: -3 },
  { date: "25.08.16", count: 26000, change: 10 },
  { date: "25.08.17", count: 24000, change: -8 },
  { date: "25.08.18", count: 23500, change: -2 },
  { date: "25.08.19", count: 25500, change: 8 },
  { date: "25.08.20", count: 26200, change: 3 },
]

export function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState("도로 시설")
  const [timePeriod, setTimePeriod] = useState("일별")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const selectedCategoryData = categoryData.find((cat) => cat.name === selectedCategory)

  // 현재 시각을 가져오는 함수
  const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")

    return `${year}.${month}.${day} ${hours}:${minutes}`
  }

  // 커스텀 라벨 함수
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="#374151" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        style={{ 
          fontSize: '15px', 
          fontWeight: '600',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        {`${name}(${(percent * 100).toFixed(0)}%)`}
      </text>
    )
  }

  return (
    <div className="h-full flex flex-col font-sans bg-white">
      <div className="h-20 flex items-center justify-between border-b border-gray-200 px-6 bg-white">
        <h1 className="text-2xl font-bold" style={{ color: "#B22B78" }}>분류별 현황</h1>
        <div className="text-sm" style={{ color: "#8B1F5F" }}>{getCurrentDateTime()}</div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            
            
            
          </div>

          <div className="grid grid-cols-5 gap-6 h-[calc(100vh-320px)]">
            {/* Left Side - Pie Chart and Rankings (2/5 width) */}
            <div className="col-span-2 space-y-6">
              {/* Pie Chart */}
              <div className="border-gray-200 bg-white shadow-sm rounded-xl overflow-hidden">
                <div style={{ backgroundColor: "#B22B78" }} className="px-6 py-4">
                  <CardTitle className="text-lg text-left text-white">
                    민원분류별 현황
                    <br />
                  </CardTitle>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie 
                        data={categoryData} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={40} 
                        outerRadius={110} 
                        dataKey="value"
                        paddingAngle={3}
                        stroke="#fff"
                        strokeWidth={2}
                        onMouseEnter={(data, index) => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        label={renderCustomLabel}
                        labelLine={false}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            style={{
                              transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                              transformOrigin: 'center',
                              transition: 'transform 0.05s ease-out',
                              cursor: 'pointer'
                            }}
                          />
                        ))}
                      </Pie>
                      
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                        formatter={(value: any, name: string) => {
                          const total = categoryData.reduce((sum, item) => sum + item.value, 0)
                          const percentage = ((value / total) * 100).toFixed(1)
                          return [`${value.toLocaleString()}건 (${percentage}%)`, name]
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Rankings */}
              <div className="border-gray-200 bg-white shadow-sm flex-1 rounded-xl overflow-hidden">
                <div style={{ backgroundColor: "#B22B78" }} className="px-6 py-4">
                  <CardTitle className="text-sm text-white">
                    ▼ 분류별 민원신청 건수 및 전일대비 증감률(%)
                  </CardTitle>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    {categoryData.map((item, index) => (
                      <div
                        key={item.name}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors text-sm ${
                          selectedCategory === item.name ? "border" : ""
                        }`}
                        style={{
                          backgroundColor: selectedCategory === item.name ? "#F3E8FF" : "transparent",
                          borderColor: selectedCategory === item.name ? "#B22B78" : "transparent",
                        }}
                        onClick={() => setSelectedCategory(item.name)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-semibold" style={{ backgroundColor: "#B22B78" }}>
                            {index + 1}
                          </div>
                          <span className="font-medium text-sm" style={{ color: selectedCategory === item.name ? "#B22B78" : "#374151" }}>{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-sm" style={{ color: "#B22B78" }}>{item.value.toLocaleString()}건</div>
                          <div className={`text-xs ${item.change > 0 ? "text-red-600" : "text-blue-600"}`}>
                            {item.change > 0 ? "▲" : "▼"} {Math.abs(item.change)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Selected Category Details (3/5 width) */}
            <div className="col-span-3 space-y-6">
              {/* Category Description */}
              <div className="border-gray-200 bg-white shadow-sm rounded-xl overflow-hidden">
                <div style={{ backgroundColor: "#B22B78" }} className="px-6 py-4">
                  <CardTitle className="text-lg text-white">{selectedCategory} 현황</CardTitle>
                </div>
                <div className="p-6">
                  <div className="space-y-2 text-sm font-medium">
                    {categoryDetails[selectedCategory as keyof typeof categoryDetails]?.description.map(
                      (desc, index) => (
                        <div key={index} style={{ color: "#6B7280" }}>
                          {desc}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Time Series Chart */}
              <div className="border-gray-200 bg-white shadow-sm flex-1 rounded-xl overflow-hidden">
                <div style={{ backgroundColor: "#B22B78" }} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">{selectedCategory} 민원 추이</CardTitle>
                    <div className="flex space-x-2">
                      {["일별", "월별", "연도별"].map((period) => (
                        <button
                          key={period}
                          onClick={() => setTimePeriod(period)}
                          className={`text-sm px-4 py-2 rounded-md font-medium transition-all duration-200 min-w-[60px] ${
                            timePeriod === period
                              ? "bg-white text-purple-700 border border-white shadow-sm"
                              : "border border-white text-white hover:bg-white hover:text-purple-700"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any, name: string) => {
                          if (name === 'count') {
                            return [value, '건수']
                          }
                          return [value, name]
                        }}
                      />
                      <Bar dataKey="count" fill="#B22B78" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
