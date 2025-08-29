"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { loadComplaintsData, ComplaintItem } from "@/lib/data-loader"

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

interface ComplaintListPageProps {
  onComplaintClick: (complaint: ComplaintItem) => void
}

export default function ComplaintListPage({ onComplaintClick }: ComplaintListPageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [typeFilter, setTypeFilter] = useState("전체")
  const [complaints, setComplaints] = useState<ComplaintItem[]>([])
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await loadComplaintsData()
        setComplaints(data)
      } catch (error) {
        console.error('Error fetching complaints:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value)
    setCurrentPage(1)
  }

  const filteredComplaints = complaints.filter(complaint => 
    typeFilter === "전체" || complaint.type === typeFilter
  )

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentComplaints = filteredComplaints.slice(startIndex, endIndex)

  if (loading) {
    return (
      <div className="h-full flex flex-col font-sans">
        <div className="h-20 flex items-center justify-between border-b border-gray-200 px-6 bg-white">
          <h1 className="text-2xl font-bold" style={{ color: "#B22B78" }}>민원 보기</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg">민원 데이터를 불러오는 중...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col font-sans">
      <div className="h-20 flex items-center justify-between border-b border-gray-200 px-6 bg-white">
        <h1 className="text-2xl font-bold" style={{ color: "#B22B78" }}>민원 보기</h1>
        <div className="text-sm" style={{ color: "#8B1F5F" }}>총 {filteredComplaints.length}건의 민원</div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <Card className="border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold" style={{ color: "#B22B78" }}>민원 목록</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-sm" style={{ color: "#8B1F5F" }}>분류 유형:</span>
                <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
                  <SelectTrigger className="w-40 h-8 border-2 border-gray-300 focus:border-purple-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="전체">전체</SelectItem>
                    <SelectItem value="도로 시설">도로 시설</SelectItem>
                    <SelectItem value="주정차">주정차</SelectItem>
                    <SelectItem value="보행자 안전">보행자 안전</SelectItem>
                    <SelectItem value="교통 운영">교통 운영</SelectItem>
                    <SelectItem value="안전 및 위험 요소">안전 및 위험 요소</SelectItem>
                    <SelectItem value="환경·소음">환경·소음</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentComplaints.map((complaint, index) => (
                <div
                  key={complaint.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition-colors shadow-sm"
                  onClick={() => onComplaintClick(complaint)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold" style={{ backgroundColor: "#F3E8FF", color: "#B22B78" }}>
                      {startIndex + index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium hover:text-purple-700" style={{ color: "#374151" }}>{complaint.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(complaint.type as ComplaintType)}`}>
                          {complaint.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm" style={{ color: "#6B7280" }}>{complaint.registeredAt}</div>
                </div>
              ))}
            </div>

            {filteredComplaints.length === 0 && (
              <div className="text-center py-8">
                <div className="text-lg" style={{ color: "#6B7280" }}>
                  {typeFilter === "전체" ? "등록된 민원이 없습니다." : `'${typeFilter}' 유형의 민원이 없습니다.`}
                </div>
              </div>
            )}

            {filteredComplaints.length > 0 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm" style={{ color: "#8B1F5F" }}>
                  {startIndex + 1}-{Math.min(endIndex, filteredComplaints.length)} /{" "}
                  {filteredComplaints.length}
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    style={{ color: "#6B7280" }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    이전
                  </Button>
                  <span className="text-sm px-3" style={{ color: "#6B7280" }}>
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    style={{ color: "#6B7280" }}
                  >
                    다음
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

