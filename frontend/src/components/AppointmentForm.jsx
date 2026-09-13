import { useState } from 'react'
import { CalendarDays, Clock3, FileText, X } from 'lucide-react'

function getInitialForm(appointment) {
  if (appointment) {
    return {
      title: appointment.title || '',
      description: appointment.description || '',
      date: appointment.date || '',
      start_time: appointment.start_time?.slice(0, 5) || '',
      end_time: appointment.end_time?.slice(0, 5) || '',
    }
  }

  return {
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    start_time: '',
    end_time: '',
  }
}

function AppointmentForm({
  appointment,
  onClose,
  onSubmit,
  loading,
}) {
  const [form, setForm] = useState(() => getInitialForm(appointment))
  const [errors, setErrors] = useState({})

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))

    setErrors((current) => ({
      ...current,
      [field]: '',
      form: '',
    }))
  }

  function validate() {
    const nextErrors = {}

    if (!form.title.trim()) {
      nextErrors.title = 'Title is required.'
    }

    if (!form.date) {
      nextErrors.date = 'Date is required.'
    }

    if (!form.start_time) {
      nextErrors.start_time = 'Start time is required.'
    }

    if (!form.end_time) {
      nextErrors.end_time = 'End time is required.'
    }

    if (
      form.start_time &&
      form.end_time &&
      form.end_time <= form.start_time
    ) {
      nextErrors.end_time = 'End time must be after start time.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!validate()) {
      return
    }

    try {
      await onSubmit({
        title: form.title.trim(),
        description: form.description.trim() || null,
        date: form.date,
        start_time: form.start_time,
        end_time: form.end_time,
      })
    } catch (error) {
      setErrors({ form: error.message })
    }
  }

  const isEditing = Boolean(appointment)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onClose()
        }
      }}
    >
      <div
        className="max-h-[95vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-form-title"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2
              id="appointment-form-title"
              className="text-lg font-bold tracking-tight text-slate-900"
            >
              {isEditing ? 'Edit appointment' : 'Add appointment'}
            </h2>

            <p className="mt-0.5 text-sm text-slate-500">
              {isEditing
                ? 'Update the details for this appointment.'
                : 'Enter the details for the new appointment.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close appointment form"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          {errors.form && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm font-medium text-red-700">
              {errors.form}
            </div>
          )}

          <div>
            <label
              htmlFor="appointment-title"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Title <span className="text-red-500">*</span>
            </label>

            <input
              id="appointment-title"
              type="text"
              value={form.title}
              onChange={(event) =>
                updateField('title', event.target.value)
              }
              placeholder="e.g. Team stand-up"
              maxLength={200}
              autoFocus
              className={`h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                errors.title
                  ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-50'
                  : 'border-slate-200 hover:border-slate-300 focus:border-slate-400 focus:ring-4 focus:ring-slate-100'
              }`}
            />

            {errors.title && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="appointment-description"
              className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700"
            >
              <FileText size={14} className="text-slate-400" />
              Description
            </label>

            <textarea
              id="appointment-description"
              value={form.description}
              onChange={(event) =>
                updateField('description', event.target.value)
              }
              placeholder="Optional details about the appointment"
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="appointment-date"
              className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700"
            >
              <CalendarDays size={14} className="text-slate-400" />
              Date <span className="text-red-500">*</span>
            </label>

            <input
              id="appointment-date"
              type="date"
              value={form.date}
              onChange={(event) =>
                updateField('date', event.target.value)
              }
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />

            {errors.date && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.date}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="appointment-start"
                className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700"
              >
                <Clock3 size={14} className="text-slate-400" />
                Start time <span className="text-red-500">*</span>
              </label>

              <input
                id="appointment-start"
                type="time"
                value={form.start_time}
                onChange={(event) =>
                  updateField('start_time', event.target.value)
                }
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />

              {errors.start_time && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.start_time}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="appointment-end"
                className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700"
              >
                <Clock3 size={14} className="text-slate-400" />
                End time <span className="text-red-500">*</span>
              </label>

              <input
                id="appointment-end"
                type="time"
                value={form.end_time}
                onChange={(event) =>
                  updateField('end_time', event.target.value)
                }
                className={`h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-700 outline-none transition ${
                  errors.end_time
                    ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-50'
                    : 'border-slate-200 hover:border-slate-300 focus:border-slate-400 focus:ring-4 focus:ring-slate-100'
                }`}
              />

              {errors.end_time && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.end_time}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? 'Saving...'
                : isEditing
                  ? 'Save changes'
                  : 'Add appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AppointmentForm
