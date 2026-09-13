import {
  CalendarDays,
  Check,
  Clock3,
  FileText,
  Pencil,
  X,
} from 'lucide-react'

function formatDate(dateString) {
  if (!dateString) return ''

  const date = new Date(`${dateString}T00:00:00`)

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(timeString) {
  if (!timeString) return ''

  const [hour, minute] = timeString.split(':').map(Number)
  const date = new Date()
  date.setHours(hour, minute, 0, 0)

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

const statusConfig = {
  scheduled: {
    label: 'Scheduled',
    badge: 'border-blue-200 bg-blue-50 text-blue-700',
    dot: 'bg-blue-500',
    bar: 'from-blue-500 via-indigo-500 to-violet-500',
    glow: 'group-hover:shadow-blue-500/10',
    icon: 'bg-blue-500',
  },
  completed: {
    label: 'Completed',
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500',
    bar: 'from-emerald-400 via-teal-500 to-cyan-500',
    glow: 'group-hover:shadow-emerald-500/10',
    icon: 'bg-emerald-500',
  },
  cancelled: {
    label: 'Cancelled',
    badge: 'border-rose-200 bg-rose-50 text-rose-700',
    dot: 'bg-rose-500',
    bar: 'from-rose-400 via-red-500 to-orange-500',
    glow: 'group-hover:shadow-rose-500/10',
    icon: 'bg-rose-500',
  },
}

export default function AppointmentCard({
  appointment,
  onEdit,
  onComplete,
  onCancel,
}) {
  const config =
    statusConfig[appointment.status] || statusConfig.scheduled

  const isScheduled = appointment.status === 'scheduled'

  return (
    <article
      className={`
        appointment-card group relative overflow-hidden
        rounded-2xl border border-slate-200/80
        bg-white
        shadow-[0_5px_20px_rgba(15,23,42,0.045)]
        transition-all duration-300
        hover:-translate-y-1.5
        hover:border-slate-300
        hover:shadow-[0_20px_45px_rgba(15,23,42,0.10)]
        ${config.glow}
      `}
    >
      <div
        className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${config.bar}`}
      />

      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-slate-100/50 blur-2xl transition-all duration-500 group-hover:scale-150" />

      <div className="relative p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${config.dot} shadow-sm`}
              />

              <h3
                className="truncate text-[15px] font-extrabold tracking-[-0.015em] text-slate-900"
                title={appointment.title}
              >
                {appointment.title}
              </h3>
            </div>

            <p className="mt-1 pl-4 text-[10px] font-medium text-slate-400">
              {appointment.status === 'scheduled'
                ? 'Upcoming appointment'
                : appointment.status === 'completed'
                  ? 'Finished appointment'
                  : 'Cancelled appointment'}
            </p>
          </div>

          <span
            className={`
              shrink-0 rounded-full border px-2.5 py-1
              text-[10px] font-bold
              ${config.badge}
            `}
          >
            {config.label}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 transition-all duration-300 group-hover:bg-slate-50">
            <div className="flex items-center gap-1.5 text-slate-400">
              <CalendarDays size={12} />
              <span className="text-[9px] font-bold uppercase tracking-[0.12em]">
                Date
              </span>
            </div>

            <p className="mt-1 text-[11px] font-bold text-slate-700">
              {formatDate(appointment.date)}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 transition-all duration-300 group-hover:bg-slate-50">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock3 size={12} />
              <span className="text-[9px] font-bold uppercase tracking-[0.12em]">
                Time
              </span>
            </div>

            <p className="mt-1 truncate text-[11px] font-bold text-slate-700">
              {formatTime(appointment.start_time)}
              <span className="mx-1 text-slate-300">–</span>
              {formatTime(appointment.end_time)}
            </p>
          </div>
        </div>

        {appointment.description && (
          <div className="mt-2.5 flex min-h-[38px] items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2 transition-all duration-300 group-hover:border-slate-200 group-hover:bg-slate-50/50">
            <FileText
              size={13}
              className="shrink-0 text-slate-400"
            />

            <p className="line-clamp-1 text-[11px] leading-5 text-slate-500">
              {appointment.description}
            </p>
          </div>
        )}

        <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => onEdit(appointment)}
            className="
              inline-flex items-center gap-1.5 rounded-lg
              border border-slate-200 bg-white px-2.5 py-1.5
              text-[10px] font-bold text-slate-600
              shadow-sm
              transition-all duration-200
              hover:-translate-y-0.5 hover:border-slate-300
              hover:bg-slate-50 hover:text-slate-900
              hover:shadow-md active:translate-y-0
            "
          >
            <Pencil size={12} />
            Edit
          </button>

          {isScheduled && (
            <>
              <button
                type="button"
                onClick={() => onComplete(appointment)}
                className="
                  inline-flex items-center gap-1.5 rounded-lg
                  border border-emerald-200 bg-emerald-50 px-2.5 py-1.5
                  text-[10px] font-bold text-emerald-700
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-emerald-100
                  hover:shadow-md hover:shadow-emerald-500/10
                  active:translate-y-0
                "
              >
                <Check size={12} />
                Complete
              </button>

              <button
                type="button"
                onClick={() => onCancel(appointment)}
                className="
                  inline-flex items-center gap-1.5 rounded-lg
                  border border-rose-200 bg-rose-50 px-2.5 py-1.5
                  text-[10px] font-bold text-rose-700
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-rose-100
                  hover:shadow-md hover:shadow-rose-500/10
                  active:translate-y-0
                "
              >
                <X size={12} />
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
