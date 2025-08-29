"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, List } from "lucide-react"
import type { Complaint } from "./complaint-list-page"

const getStatusColor = (status: string) => {
  switch (status) {
    case "처리 전":
      return "bg-rose-500"; // 부드러운 빨강
    case "처리 중":
      return "bg-amber-500"; // 부드러운 주황
    case "처리 완료":
      return "bg-emerald-500"; // 부드러운 초록
    default:
      return "bg-gray-500";
  }
};

interface ComplaintDetailPageProps {
  complaint: Complaint
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
          <span className={`px-3 py-1 rounded-full text-sm text-white ${getStatusColor(complaint.status)}`}>
            {complaint.status}
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
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevious}
              disabled={!hasPrevious}
              className="border-gray-300 hover:bg-gray-50 disabled:opacity-50 bg-transparent"
              style={{ color: "#6B7280" }}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              이전 글
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onNext}
              disabled={!hasNext}
              className="border-gray-300 hover:bg-gray-50 disabled:opacity-50 bg-transparent"
              style={{ color: "#6B7280" }}
            >
              다음 글
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <Button 
            onClick={onBackToList} 
            className="text-white"
            style={{ backgroundColor: "#B22B78" }}
          >
            <List className="w-4 h-4 mr-2" />
            목록 보기
          </Button>
        </div>
      </div>
    </div>
  )
}
