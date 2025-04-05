import type React from "react"

interface Tab {
  id: string
  label: string
}

interface TabGroupProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
}

export const TabGroup: React.FC<TabGroupProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex mb-4">
      {tabs.map((tab, index) => {
        const isFirst = index === 0
        const isLast = index === tabs.length - 1
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              flex-1 py-2 px-4 text-center
              ${isFirst ? "rounded-l-md" : ""}
              ${isLast ? "rounded-r-md" : ""}
              ${
                isActive
                  ? tab.id === "social"
                    ? "bg-green-800 text-white"
                    : "bg-gray-800 text-white"
                  : "bg-transparent border border-gray-700 text-gray-400"
              }
            `}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

