"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { sampleComplaints, type Complaint } from "@/components/complaint-list-page"

const getStatusColor = (status: string) => {
  switch (status) {
    case "처리 전":
      return "bg-rose-500 text-white"; // 부드러운 빨강
    case "처리 중":
      return "bg-amber-500 text-white"; // 부드러운 주황
    case "처리 완료":
      return "bg-emerald-500 text-white"; // 부드러운 초록
    default:
      return "bg-gray-500 text-white";
  }
};

interface RealtimeComplaintsProps {
  onComplaintClick: (complaint: Complaint) => void
}

export function RealtimeComplaints({ onComplaintClick }: RealtimeComplaintsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const realtimeComplaints = sampleComplaints.slice(0, 10)

  const nextComplaint = () => {
    setCurrentIndex((prev) => (prev + 1) % realtimeComplaints.length)
  }

  const prevComplaint = () => {
    setCurrentIndex((prev) => (prev - 1 + realtimeComplaints.length) % realtimeComplaints.length)
  }

  const handleComplaintClick = (complaint: Complaint) => {
    onComplaintClick(complaint)
  }

  const currentComplaint = realtimeComplaints[currentIndex]

  return (
    <div className="flex items-center justify-between space-x-4 h-16">
      <Button
        variant="ghost"
        size="sm"
        onClick={prevComplaint}
        className="hover:bg-gray-100 flex-shrink-0"
        style={{ color: "#B22B78", transform: "translateY(-13px)" }}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleComplaintClick(currentComplaint)}
            className="group flex items-center space-x-3 transition-colors text-left"
            style={{ color: "#B22B78" }}
          >
            <span className="text-lg font-semibold">{currentComplaint.title}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentComplaint.status)}`}>
              {currentComplaint.status}
            </span>
            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
        <div className="text-xs mt-3 text-center" style={{ color: "#8B1F5F" }}>
          <span className="font-medium">
            {currentIndex + 1} / {realtimeComplaints.length}
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={nextComplaint}
        className="hover:bg-gray-100 flex-shrink-0"
        style={{ color: "#B22B78", transform: "translateY(-13px)" }}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
