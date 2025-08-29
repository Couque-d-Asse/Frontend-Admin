"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ComplaintItem, loadComplaintsData } from "@/lib/data-loader"

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

interface RealtimeComplaintsProps {
  onComplaintClick: (complaint: ComplaintItem) => void
}

export function RealtimeComplaints({ onComplaintClick }: RealtimeComplaintsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [complaints, setComplaints] = useState<ComplaintItem[]>([])
  const [loading, setLoading] = useState(true)

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

  const realtimeComplaints = complaints.slice(0, 10)

  const nextComplaint = () => {
    if (realtimeComplaints.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % realtimeComplaints.length)
  }

  const prevComplaint = () => {
    if (realtimeComplaints.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + realtimeComplaints.length) % realtimeComplaints.length)
  }

  const handleComplaintClick = (complaint: ComplaintItem) => {
    onComplaintClick(complaint)
  }

  if (loading || realtimeComplaints.length === 0) {
    return (
      <div className="flex items-center justify-center h-16">
        <div className="text-sm text-gray-500">민원 데이터를 불러오는 중...</div>
      </div>
    )
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
            <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(currentComplaint.type as ComplaintType)}`}>
              {currentComplaint.type}
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
