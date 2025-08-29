"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WordCloudComponent } from "@/components/word-cloud"
import { TrendingKeywords } from "@/components/trending-keywords"

export function KeywordsPage() {
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

  return (
    <div className="h-full flex flex-col font-sans bg-white">
      <div className="h-20 flex items-center justify-between border-b border-gray-200 px-6 bg-white">
        <h1 className="text-2xl font-bold" style={{ color: "#B22B78" }}>키워드 보기</h1>
        <div className="text-sm" style={{ color: "#8B1F5F" }}>{getCurrentDateTime()}</div>
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex gap-6">
          {/* Left Side - Word Cloud */}
          <div className="border-gray-200 bg-white shadow-sm flex-1 flex flex-col rounded-xl overflow-hidden">
            <div style={{ backgroundColor: "#B22B78" }} className="px-6 py-4">
              <CardTitle className="text-lg text-white">키워드 클라우드</CardTitle>
              <div className="text-sm text-white">{getCurrentDateTime()}</div>
            </div>
            <CardContent className="flex-1 min-h-0 pt-6">
              <WordCloudComponent />
            </CardContent>
          </div>

          {/* Right Side - Trending Keywords */}
          <div className="border-gray-200 bg-white shadow-sm flex-1 flex flex-col rounded-xl overflow-hidden">
            <div style={{ backgroundColor: "#B22B78" }} className="px-6 py-4">
              <CardTitle className="text-lg text-white">급증 키워드</CardTitle>
              <div className="text-sm text-white">{getCurrentDateTime()}</div>
            </div>
            <CardContent className="flex-1 min-h-0 pt-6">
              <TrendingKeywords />
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  )
}
