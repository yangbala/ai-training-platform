'use client'

interface ChecklistProps {
  items: string[]
  checked: boolean[]
  onToggle: (index: number) => void
}

export default function Checklist({ items, checked, onToggle }: ChecklistProps) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 cursor-pointer group"
          onClick={() => onToggle(i)}
        >
          <div
            className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
              checked[i]
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 group-hover:border-blue-400'
            }`}
          >
            {checked[i] && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <span
            className={`text-base leading-relaxed transition-colors ${
              checked[i] ? 'text-gray-400 line-through' : 'text-gray-700 group-hover:text-gray-900'
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
