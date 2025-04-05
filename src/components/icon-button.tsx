"use client"

import type React from "react"

interface IconButtonProps {
  icon: React.ReactNode
  onClick?: () => void
  as?: React.ElementType
  to?: string
  className?: string
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  as: Component = "button",
  to,
  className = "",
}) => {
  return (
    <Component
      to={to}
      onClick={onClick}
      className={`p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors ${className}`}
    >
      {icon}
    </Component>
  )
}

