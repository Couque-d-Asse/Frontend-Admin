"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Complaint {
  id: number
  title: string
  status: "처리 전" | "처리 중" | "처리 완료"
  registeredAt: string
  content: string
}

// 샘플 민원 데이터 (실제로는 API에서 가져올 데이터)
const sampleComplaints: Complaint[] = [
  {
    id: 1,
    title: "동대문구 청량리동 도로 포트홀 신고",
    status: "처리 전",
    registeredAt: "2025-01-27 14:30",
    content:
      "청량리동 123번지 앞 도로에 큰 포트홀이 발생하여 차량 통행에 위험을 초래하고 있습니다. 빠른 보수 작업을 요청드립니다.",
  },
  {
    id: 2,
    title: "회기동 불법 주정차 단속 요청",
    status: "처리 중",
    registeredAt: "2025-01-27 13:45",
    content: "회기동 상가 앞 인도에 상습적으로 불법 주차하는 차량들로 인해 보행자들이 불편을 겪고 있습니다.",
  },
  {
    id: 3,
    title: "용두동 교차로 신호등 고장 신고",
    status: "처리 완료",
    registeredAt: "2025-01-27 12:20",
    content: "용두동 주요 교차로의 신호등이 고장나서 교통 혼잡이 발생하고 있습니다. 긴급 수리가 필요합니다.",
  },
  {
    id: 4,
    title: "장안동 보행자 안전시설 개선 요청",
    status: "처리 전",
    registeredAt: "2025-01-27 11:15",
    content: "장안동 초등학교 앞 횡단보도에 안전펜스 설치를 요청드립니다. 어린이들의 안전을 위해 필요합니다.",
  },
  {
    id: 5,
    title: "전농동 가로등 점검 요청",
    status: "처리 중",
    registeredAt: "2025-01-27 10:30",
    content: "전농동 주택가 일대의 가로등 여러 개가 고장나서 야간 보행이 위험합니다.",
  },
  {
    id: 6,
    title: "답십리동 소음 문제 신고",
    status: "처리 전",
    registeredAt: "2025-01-27 09:45",
    content: "답십리동 상가 앞 도로에서 발생하는 과도한 차량 소음으로 인한 민원을 제기합니다.",
  },
  {
    id: 7,
    title: "이문동 도로 표지판 훼손 신고",
    status: "처리 완료",
    registeredAt: "2025-01-27 08:20",
    content: "이문동 주요 도로의 교통 표지판이 훼손되어 교체가 필요합니다.",
  },
  {
    id: 8,
    title: "휘경동 자전거 도로 정비 요청",
    status: "처리 중",
    registeredAt: "2025-01-27 07:30",
    content: "휘경동 자전거 전용 도로의 노면이 파손되어 자전거 이용자들이 불편을 겪고 있습니다.",
  },
  {
    id: 9,
    title: "제기동 버스 정류장 개선 요청",
    status: "처리 전",
    registeredAt: "2025-01-26 16:45",
    content: "제기동 버스 정류장의 지붕이 낙아서 비가 올 때 승객들이 불편을 겪고 있습니다.",
  },
  {
    id: 10,
    title: "신설동 도로 청소 요청",
    status: "처리 완료",
    registeredAt: "2025-01-26 15:20",
    content: "신설동 상가 밀집 지역의 도로에 쓰레기가 많이 쌓여 있어 청소가 필요합니다.",
  },
  {
    id: 11,
    title: "용신동 과속방지턱 설치 요청",
    status: "처리 전",
    registeredAt: "2025-01-26 14:10",
    content: "용신동 주택가 도로에 과속 차량이 많아 과속방지턱 설치를 요청드립니다.",
  },
  {
    id: 12,
    title: "청량리동 횡단보도 신설 요청",
    status: "처리 중",
    registeredAt: "2025-01-26 13:30",
    content: "청량리동 대형마트 앞에 횡단보도 신설이 필요합니다. 보행자들이 위험하게 도로를 건너고 있습니다.",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "처리 전":
      return "bg-rose-500"
    case "처리 중":
      return "bg-amber-500"
    case "처리 완료":
      return "bg-emerald-500"
    default:
      return "bg-gray-500"
  }
}

interface ComplaintListPageProps {
  onComplaintClick: (complaint: Complaint) => void
}

export default function ComplaintListPage({ onComplaintClick }: ComplaintListPageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [statusFilter, setStatusFilter] = useState("전체")

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1)
  }

  const filteredComplaints = statusFilter === "전체" 
    ? sampleComplaints 
    : sampleComplaints.filter(complaint => complaint.status === statusFilter)

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentComplaints = filteredComplaints.slice(startIndex, startIndex + itemsPerPage)

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
                <span className="text-sm" style={{ color: "#8B1F5F" }}>처리 상태:</span>
                <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                  <SelectTrigger className="w-32 h-8 border-2 border-gray-300 focus:border-purple-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="전체">전체</SelectItem>
                    <SelectItem value="처리 전">처리 전</SelectItem>
                    <SelectItem value="처리 중">처리 중</SelectItem>
                    <SelectItem value="처리 완료">처리 완료</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(complaint.status)}`}
                        >
                          {complaint.status}
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
                  {statusFilter === "전체" ? "등록된 민원이 없습니다." : `'${statusFilter}' 상태의 민원이 없습니다.`}
                </div>
              </div>
            )}

            {filteredComplaints.length > 0 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm" style={{ color: "#8B1F5F" }}>
                  {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredComplaints.length)} /{" "}
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

export { sampleComplaints, type Complaint }

