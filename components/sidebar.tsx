"use client"

import { useState } from "react"
import { BarChart3, Hash, FileText, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const menuItems = [
    {
      id: "category",
      label: "분류별 현황",
      icon: BarChart3,
    },
    {
      id: "keywords",
      label: "키워드 보기",
      icon: Hash,
    },
    {
      id: "complaints",
      label: "민원 보기",
      icon: FileText,
    },
  ]

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shadow-sm",
        isExpanded ? "w-64" : "w-20",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
          onClick={() => onPageChange("home")}
          title="홈으로 이동"
        >
          <img src="/images/dongdae-logo.png" alt="동대문구 로고" className="w-8 h-8" />
          {isExpanded && (
            <div className="font-sans">
              <div className="text-lg font-bold" style={{ color: "#B22B78" }}>동대문구</div>
              <div className="text-sm" style={{ color: "#8B1F5F" }}>한눈에 보는 교통·도로 민원</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 font-sans",
                    isActive
                      ? "bg-purple-100 text-purple-800 border border-purple-200 shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800",
                  )}
                  style={{
                    backgroundColor: isActive ? "#F3E8FF" : "transparent",
                    color: isActive ? "#B22B78" : "#6B7280",
                    borderColor: isActive ? "#B22B78" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "#F9FAFB"
                      e.currentTarget.style.color = "#B22B78"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent"
                      e.currentTarget.style.color = "#6B7280"
                    }
                  }}
                  title={!isExpanded ? item.label : undefined}
                >
                  <Icon className="w-5 h-5" style={{ color: isActive ? "#B22B78" : "inherit" }} />
                  {isExpanded && <span className="font-medium">{item.label}</span>}
                  {isActive && isExpanded && <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: "#B22B78" }} />}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer Info */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-center font-medium" style={{ color: "#8B1F5F" }}>
            <div>동대문구청</div>
            <div>교통·도로 민원 대시보드</div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
          style={{ color: "#6B7280" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#F9FAFB"
            e.currentTarget.style.color = "#B22B78"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
            e.currentTarget.style.color = "#6B7280"
          }}
          title={isExpanded ? "사이드바 축소" : "사이드바 확장"}
        >
          <ChevronRight className={cn("w-5 h-5 transition-transform", isExpanded ? "rotate-180" : "")} />
        </button>
      </div>
    </div>
  )
}
