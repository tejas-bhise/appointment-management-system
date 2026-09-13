import { CalendarDays, Plus } from 'lucide-react'

export default function Header({ onAdd }) {
  return (
    <header className="relative z-10 border-b border-white/10 bg-slate-950 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-32 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-violet-600/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
            <CalendarDays size={20} strokeWidth={2.2} />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold tracking-tight sm:text-base">
              Appointment Board
            </h1>

            <p className="truncate text-[10px] text-slate-400 sm:text-xs">
              Manage your team's schedule
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="
            group inline-flex shrink-0 items-center gap-2
            rounded-xl border border-white/10
            bg-white px-3.5 py-2.5
            text-xs font-bold text-slate-950
            shadow-lg shadow-black/20
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-blue-50
            hover:shadow-xl hover:shadow-blue-500/10
            active:translate-y-0
            sm:px-4 sm:text-sm
          "
        >
          <Plus
            size={17}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
          <span>Add Appointment</span>
        </button>
      </div>
    </header>
  )
}
