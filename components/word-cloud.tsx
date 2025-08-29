"use client"

import { useEffect, useRef } from "react"

const keywords = [
  { text: "불법주차", size: 32, color: "#B22B78" },
  { text: "신호등", size: 28, color: "#C73B8A" },
  { text: "도로파손", size: 24, color: "#D44B9C" },
  { text: "교통체증", size: 20, color: "#E15BAE" },
  { text: "횡단보도", size: 18, color: "#B22B78" },
  { text: "속도위반", size: 16, color: "#C73B8A" },
  { text: "버스정류장", size: 14, color: "#D44B9C" },
  { text: "자전거도로", size: 12, color: "#E15BAE" },
  { text: "보행로", size: 12, color: "#B22B78" },
  { text: "가로등", size: 10, color: "#C73B8A" },
  { text: "노면표시", size: 10, color: "#D44B9C" },
  { text: "방음벽", size: 8, color: "#E15BAE" },
]

export function WordCloudComponent() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const words = container.querySelectorAll(".word-item")

    words.forEach((word, index) => {
      const element = word as HTMLElement
      const angle = (index * 30) % 360
      const radius = 60 + (index % 3) * 20
      const x = Math.cos((angle * Math.PI) / 180) * radius
      const y = Math.sin((angle * Math.PI) / 180) * radius

      element.style.transform = `translate(${x}px, ${y}px)`
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-64 flex items-center justify-center overflow-hidden bg-white rounded-lg"
    >
      {keywords.map((keyword, index) => (
        <div
          key={keyword.text}
          className="word-item absolute transition-all duration-300 hover:scale-110 cursor-pointer font-medium drop-shadow-sm"
          style={{
            fontSize: `${keyword.size}px`,
            color: keyword.color,
          }}
        >
          {keyword.text}
        </div>
      ))}
    </div>
  )
}
