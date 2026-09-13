import { useCallback, useEffect, useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  Loader2,
  Sparkles,
} from 'lucide-react'

import Header from './components/Header'
import Filters from './components/Filters'
import AppointmentCard from './components/AppointmentCard'
import AppointmentForm from './components/AppointmentForm'
import EmptyState from './components/EmptyState'
import {
  cancelAppointment,
  completeAppointment,
  createAppointment,
  getAppointments,
  updateAppointment,
} from './services/api'

function App() {
  const [appointments, setAppointments] = useState([])
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('all')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)

  const loadAppointments = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getAppointments({
        date,
        status,
      })

      setAppointments(data.appointments || [])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [date, status])

  useEffect(() => {
    let cancelled = false

    async function fetchAppointments() {
      setLoading(true)
      setError('')

      try {
        const data = await getAppointments({
          date,
          status,
        })

        if (!cancelled) {
          setAppointments(data.appointments || [])
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchAppointments()

    return () => {
      cancelled = true
    }
  }, [date, status])

  function openCreateForm() {
    setEditingAppointment(null)
    setShowForm(true)
    setError('')
    setMessage('')
  }

  function openEditForm(appointment) {
    setEditingAppointment(appointment)
    setShowForm(true)
    setError('')
    setMessage('')
  }

  function closeForm() {
    if (saving) {
      return
    }

    setShowForm(false)
    setEditingAppointment(null)
  }

  async function handleSubmit(formData) {
    setSaving(true)
    setError('')
    setMessage('')

    try {
      if (editingAppointment) {
        await updateAppointment(editingAppointment.id, formData)
        setMessage('Appointment updated successfully.')
      } else {
        await createAppointment(formData)
        setMessage('Appointment created successfully.')
      }

      setShowForm(false)
      setEditingAppointment(null)
      await loadAppointments()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleComplete(appointment) {
    setActionLoading(true)
    setError('')
    setMessage('')

    try {
      await completeAppointment(appointment.id)
      setMessage('Appointment marked as completed.')
      await loadAppointments()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setActionLoading(false)
    }
  }

  async function handleCancel(appointment) {
    const confirmed = window.confirm(
      `Cancel "${appointment.title}"?\n\nThe appointment will remain visible as cancelled.`,
    )

    if (!confirmed) {
      return
    }

    setActionLoading(true)
    setError('')
    setMessage('')

    try {
      await cancelAppointment(appointment.id)
      setMessage('Appointment cancelled successfully.')
      await loadAppointments()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setActionLoading(false)
    }
  }

  function clearFilters() {
    setDate('')
    setStatus('all')
  }

  const scheduledCount = appointments.filter(
    (appointment) => appointment.status === 'scheduled',
  ).length

  const completedCount = appointments.filter(
    (appointment) => appointment.status === 'completed',
  ).length

  const cancelledCount = appointments.filter(
    (appointment) => appointment.status === 'cancelled',
  ).length

  const hasActiveFilters = Boolean(date) || status !== 'all'

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="aurora aurora-three" />

      <Header onAdd={openCreateForm} />

      <main className="relative z-[1] mx-auto max-w-[1480px] px-4 pb-10 pt-5 sm:px-6 lg:px-8 lg:pt-6">
        {/* Compact premium hero */}
        <section className="premium-panel hero-panel mb-4 overflow-hidden rounded-[24px] px-5 py-5 sm:px-6 sm:py-5">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />

          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-2.5 py-1 text-[10px] font-bold text-blue-700 shadow-sm">
                <Sparkles size={12} />
                Team schedule
              </div>

              <h1 className="text-[28px] font-black tracking-[-0.04em] text-slate-950 sm:text-[32px]">
                Appointments
              </h1>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                View and manage upcoming and past appointments from one
                simple workspace.
              </p>
            </div>

            {!loading && (
              <div className="stats-panel">
                <div className="stat-item">
                  <strong>{appointments.length}</strong>
                  <span>Total</span>
                </div>

                <div className="stat-divider" />

                <div className="stat-item stat-blue">
                  <strong>{scheduledCount}</strong>
                  <span>Scheduled</span>
                </div>

                <div className="stat-divider" />

                <div className="stat-item stat-green">
                  <strong>{completedCount}</strong>
                  <span>Done</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Feedback */}
        {(message || error) && (
          <div
            className={`
              feedback-banner mb-4 flex items-start gap-3 rounded-xl
              border px-4 py-3 text-xs shadow-lg
              ${
                error
                  ? 'border-red-200 bg-red-50/95 text-red-700'
                  : 'border-emerald-200 bg-emerald-50/95 text-emerald-700'
              }
            `}
          >
            {error ? (
              <AlertCircle size={17} className="mt-0.5 shrink-0" />
            ) : (
              <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
            )}

            <span className="leading-5">{error || message}</span>

            <button
              type="button"
              onClick={() => {
                setError('')
                setMessage('')
              }}
              className="ml-auto rounded-md px-2 py-1 text-[10px] font-bold opacity-70 transition hover:bg-black/5 hover:opacity-100"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Compact filters */}
        <section className="mb-5">
          <Filters
            date={date}
            status={status}
            onDateChange={setDate}
            onStatusChange={setStatus}
            onClear={clearFilters}
          />
        </section>

        {/* Board heading */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="board-icon">
              <ClipboardList size={15} />
            </div>

            <div>
              <h2 className="text-sm font-extrabold tracking-tight text-slate-900">
                {hasActiveFilters
                  ? 'Filtered appointments'
                  : 'All appointments'}
              </h2>

              <p className="text-[10px] font-medium text-slate-400">
                {loading
                  ? 'Updating schedule...'
                  : `${appointments.length} ${
                      appointments.length === 1
                        ? 'appointment'
                        : 'appointments'
                    }`}
              </p>
            </div>
          </div>

          {!loading && cancelledCount > 0 && !hasActiveFilters && (
            <span className="cancelled-count">
              <span className="pulse-dot" />
              {cancelledCount} cancelled
            </span>
          )}
        </div>

        {/* Appointment board */}
        <section>
          {loading ? (
            <div className="loading-panel">
              <div className="loading-ring">
                <Loader2 size={19} className="animate-spin" />
              </div>
              <span>Loading appointments...</span>
            </div>
          ) : appointments.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="appointment-grid">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onEdit={openEditForm}
                  onComplete={handleComplete}
                  onCancel={handleCancel}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {showForm && (
        <AppointmentForm
          key={editingAppointment?.id ?? 'new'}
          appointment={editingAppointment}
          onClose={closeForm}
          onSubmit={handleSubmit}
          loading={saving || actionLoading}
        />
      )}
    </div>
  )
}

export default App
