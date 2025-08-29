"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, List } from "lucide-react"
import type { ComplaintItem } from "@/lib/data-loader"

type ComplaintType = 
  | "도로 시설" 
  | "주정차" 
  | "보행자 안전" 
  | "교통 운영" 
  | "안전 및 위험 요소" 
  | "환경·소음"

const getTypeColor = (type: ComplaintType) => {
  switch (type) {
    case "도로 시설":
      return "bg-blue-500"
    case "주정차":
      return "bg-orange-500"
    case "보행자 안전":
      return "bg-green-500"
    case "교통 운영":
      return "bg-purple-500"
    case "안전 및 위험 요소":
      return "bg-red-500"
    case "환경·소음":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

interface ComplaintDetailPageProps {
  complaint: ComplaintItem
  onBackToList: () => void
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
}

export default function ComplaintDetailPage({
  complaint,
  onBackToList,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: ComplaintDetailPageProps) {
  return (
    <div className="h-full flex flex-col font-sans">
      <div className="h-20 flex items-center justify-between border-b border-gray-200 px-6 bg-white">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold" style={{ color: "#B22B78" }}>민원 상세</h1>
          <span className={`px-3 py-1 rounded-full text-sm text-white ${getTypeColor(complaint.type as ComplaintType)}`}>
            {complaint.type}
          </span>
        </div>
        <div className="text-sm" style={{ color: "#8B1F5F" }}>등록일: {complaint.registeredAt}</div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Card className="h-full bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg leading-relaxed" style={{ color: "#374151" }}>{complaint.title}</CardTitle>
            <div className="flex items-center justify-between text-sm mt-2" style={{ color: "#6B7280" }}>
              <span>민원 번호: #{complaint.id.toString().padStart(4, "0")}</span>
              <span>작성 시간: {complaint.registeredAt}</span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose max-w-none">
              
              <div className="leading-relaxed whitespace-pre-wrap p-4 rounded-lg bg-white" style={{ color: "#6B7280" }}>
                {complaint.content}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onBackToList}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            style={{ color: "#6B7280" }}
          >
            <List className="w-4 h-4 mr-2" />
            목록으로
          </Button>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevious}
              disabled={!hasPrevious}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              style={{ color: "#6B7280" }}
            >
              <ChevronLeft className="w-4 h-4" />
              이전
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onNext}
              disabled={!hasNext}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              style={{ color: "#6B7280" }}
            >
              다음
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
