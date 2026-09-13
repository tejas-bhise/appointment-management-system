import { CalendarX2 } from 'lucide-react'

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <CalendarX2 size={24} />
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-900">
        No appointments found
      </h3>

      <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-slate-500">
        There are no appointments matching the selected filters.
        Try changing the filters to see more results.
      </p>
    </div>
  )
}

export default EmptyState
