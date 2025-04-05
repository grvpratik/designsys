import type React from "react"

interface InfoCardProps {
  children: React.ReactNode
  className?: string
}

export const InfoCard: React.FC<InfoCardProps> = ({ children, className = "" }) => {
  return <div className={`border border-gray-700 rounded-lg p-4 ${className}`}>{children}</div>
}

