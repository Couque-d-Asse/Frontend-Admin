"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardHome } from "@/components/dashboard-home"
import { CategoryPage } from "@/components/category-page"
import { KeywordsPage } from "@/components/keywords-page"
import ComplaintListPage from "@/components/complaint-list-page"
import ComplaintDetailPage from "@/components/complaint-detail-page"
import { sampleComplaints, type Complaint } from "@/components/complaint-list-page"

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)

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

  const handleComplaintClick = (complaint: Complaint) => {
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
    const currentIndex = sampleComplaints.findIndex((c) => c.id === selectedComplaint.id)
    if (currentIndex > 0) {
      setSelectedComplaint(sampleComplaints[currentIndex - 1])
    }
  }

  const handleNextComplaint = () => {
    if (!selectedComplaint) return
    const currentIndex = sampleComplaints.findIndex((c) => c.id === selectedComplaint.id)
    if (currentIndex < sampleComplaints.length - 1) {
      setSelectedComplaint(sampleComplaints[currentIndex + 1])
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
          const currentIndex = sampleComplaints.findIndex((c) => c.id === selectedComplaint.id)
          return (
            <ComplaintDetailPage
              complaint={selectedComplaint}
              onBackToList={handleBackToList}
              onPrevious={handlePreviousComplaint}
              onNext={handleNextComplaint}
              hasPrevious={currentIndex > 0}
              hasNext={currentIndex < sampleComplaints.length - 1}
            />
          )
        }
        return <ComplaintListPage onComplaintClick={handleComplaintClick} />
      default:
        return <DashboardHome onComplaintClick={handleComplaintClick} />
    }
  }

  return (
    <div className="h-screen bg-white flex font-sans">
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />

      <div className="flex-1 overflow-hidden">{renderPage()}</div>
    </div>
  )
}
