"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardHome } from "@/components/dashboard-home"
import { CategoryPage } from "@/components/category-page"
import { KeywordsPage } from "@/components/keywords-page"
import ComplaintListPage from "@/components/complaint-list-page"
import ComplaintDetailPage from "@/components/complaint-detail-page"
import { ComplaintItem, loadComplaintsData } from "@/lib/data-loader"

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintItem | null>(null)
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

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash && ["home", "category", "keywords", "complaints"].includes(hash)) {
        setCurrentPage(hash)
        if (hash !== "complaints") {
          setSelectedComplaint(null)
        }
      }
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const handlePageChange = (page: string) => {
    setCurrentPage(page)
    window.location.hash = page
    if (page !== "complaints") {
      setSelectedComplaint(null)
    }
  }

  const handleComplaintClick = (complaint: ComplaintItem) => {
    console.log("[v0] Complaint clicked:", complaint.title)
    setSelectedComplaint(complaint)
    setCurrentPage("complaints")
    window.location.hash = "complaints"
    console.log("[v0] Page changed to complaints, selected complaint:", complaint.id)
  }

  const handleBackToList = () => {
    setSelectedComplaint(null)
  }

  const handlePreviousComplaint = () => {
    if (!selectedComplaint) return
    const currentIndex = complaints.findIndex((c) => c.id === selectedComplaint.id)
    if (currentIndex > 0) {
      setSelectedComplaint(complaints[currentIndex - 1])
    }
  }

  const handleNextComplaint = () => {
    if (!selectedComplaint) return
    const currentIndex = complaints.findIndex((c) => c.id === selectedComplaint.id)
    if (currentIndex < complaints.length - 1) {
      setSelectedComplaint(complaints[currentIndex + 1])
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <DashboardHome onComplaintClick={handleComplaintClick} />
      case "category":
        return <CategoryPage />
      case "keywords":
        return <KeywordsPage />
      case "complaints":
        if (selectedComplaint) {
          const currentIndex = complaints.findIndex((c) => c.id === selectedComplaint.id)
          return (
            <ComplaintDetailPage
              complaint={selectedComplaint}
              onBackToList={handleBackToList}
              onPrevious={handlePreviousComplaint}
              onNext={handleNextComplaint}
              hasPrevious={currentIndex > 0}
              hasNext={currentIndex < complaints.length - 1}
            />
          )
        }
        return <ComplaintListPage onComplaintClick={handleComplaintClick} />
      default:
        return <DashboardHome onComplaintClick={handleComplaintClick} />
    }
  }

  if (loading) {
    return (
      <div className="h-screen bg-white flex font-sans">
        <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg">데이터를 불러오는 중...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-white flex font-sans">
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />

      <div className="flex-1 overflow-hidden">{renderPage()}</div>
    </div>
  )
}
