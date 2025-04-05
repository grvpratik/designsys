import type React from "react"

interface DataRowProps {
  label: string
  value: string
  valueClassName?: string
}

export const DataRow: React.FC<DataRowProps> = ({ label, value, valueClassName = "" }) => {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-700 last:border-0">
      <span className="text-gray-400">{label}</span>
      <span className={`font-medium ${valueClassName}`}>{value}</span>
    </div>
  )
}

