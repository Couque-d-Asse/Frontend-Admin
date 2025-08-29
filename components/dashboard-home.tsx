import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ComplaintChart } from "@/components/complaint-chart"
import { WordCloudComponent } from "@/components/word-cloud"
import { RealtimeComplaints } from "@/components/realtime-complaints"
import type { Complaint } from "@/components/complaint-list-page"

interface DashboardHomeProps {
  onComplaintClick: (complaint: Complaint) => void
}

export function DashboardHome({ onComplaintClick }: DashboardHomeProps) {
  const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")

    return `${year}.${month}.${day} ${hours}:${minutes}`
  }

  return (
    <div className="h-full p-6 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto h-full flex flex-col space-y-6">
        {/* 실시간 민원 현황 카드 - 높이 증가 */}
        <div className="border-gray-200 bg-white shadow-sm flex-shrink-0 rounded-xl overflow-hidden" style={{ minHeight: "120px" }}>
          <div style={{ backgroundColor: "#B22B78" }} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white">실시간 민원 현황</CardTitle>
              <div className="text-sm font-medium text-white">{getCurrentDateTime()}</div>
            </div>
          </div>
          <CardContent className="pt-6 pb-6">
            <RealtimeComplaints onComplaintClick={onComplaintClick} />
          </CardContent>
        </div>

        <div className="flex gap-6 flex-1 min-h-0">
          {/* Left side - Word Cloud (비율 조정) */}
          <div className="w-2/5">
            <div className="border-gray-200 bg-white shadow-sm h-full rounded-xl overflow-hidden">
              <div style={{ backgroundColor: "#B22B78" }} className="px-6 py-4">
                <CardTitle className="text-lg font-semibold text-white">키워드 워드클라우드</CardTitle>
              </div>
              <CardContent className="flex-1 min-h-0 pt-6">
                <WordCloudComponent />
              </CardContent>
            </div>
          </div>

          {/* Right side - Complaint Chart (비율 조정) */}
          <div className="border-gray-200 bg-white shadow-sm flex flex-col flex-1 rounded-xl overflow-hidden">
            <div style={{ backgroundColor: "#B22B78" }} className="px-6 py-4">
              <CardTitle className="text-lg font-semibold text-white">교통·도로 민원 발생 추이</CardTitle>
            </div>
            <CardContent className="flex-1 min-h-0 pt-6">
              <ComplaintChart type="combined" />
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  )
}
