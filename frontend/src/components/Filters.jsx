import {
  Check,
  ChevronDown,
  Filter,
  RotateCcw,
} from 'lucide-react'

const statuses = [
  { value: 'all', label: 'All' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function Filters({
  date,
  status,
  onDateChange,
  onStatusChange,
  onClear,
}) {
  const hasFilters = Boolean(date) || status !== 'all'

  return (
    <div className="premium-panel filter-panel rounded-[20px] p-4 sm:px-5 sm:py-4">
      <div className="relative">
        <div className="mb-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="filter-icon">
              <Filter size={15} />
            </div>

            <div>
              <h2 className="text-xs font-extrabold text-slate-900">
                Filter appointments
              </h2>

              <p className="text-[10px] text-slate-400">
                Narrow your schedule by date or status
              </p>
            </div>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={onClear}
              className="clear-button"
            >
              <RotateCcw size={12} />
              Clear filters
            </button>
          )}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="block min-w-0">
            <span className="field-label">Date</span>

            <input
              type="date"
              value={date}
              onChange={(event) => onDateChange(event.target.value)}
              className="premium-input date-input"
            />
          </label>

          <label className="block min-w-0">
            <span className="field-label">Status</span>

            <div className="relative">
              <select
                value={status}
                onChange={(event) => onStatusChange(event.target.value)}
                className="premium-input appearance-none pr-9"
              >
                {statuses.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.value === 'all'
                      ? 'All statuses'
                      : item.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </label>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {statuses.map((item) => {
            const active = status === item.value

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onStatusChange(item.value)}
                className={`filter-chip ${
                  active ? 'filter-chip-active' : ''
                }`}
              >
                {active && <Check size={11} />}
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
