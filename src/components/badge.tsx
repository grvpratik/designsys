import type React from "react"

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => {
  return <div className={`bg-gray-800 px-3 py-1 rounded-md mt-1 ${className}`}>{children}</div>
}

