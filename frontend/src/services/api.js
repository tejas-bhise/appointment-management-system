const API_URL =
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      data?.detail || 'Something went wrong. Please try again.',
    )
  }

  return data
}

export async function getAppointments(filters = {}) {
  const params = new URLSearchParams()

  if (filters.date) {
    params.set('date', filters.date)
  }

  if (filters.status && filters.status !== 'all') {
    params.set('status', filters.status)
  }

  const query = params.toString()

  return request(
    `/api/appointments${query ? `?${query}` : ''}`,
  )
}

export async function createAppointment(appointment) {
  return request('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(appointment),
  })
}

export async function updateAppointment(id, appointment) {
  return request(`/api/appointments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(appointment),
  })
}

export async function completeAppointment(id) {
  return request(`/api/appointments/${id}/complete`, {
    method: 'PATCH',
  })
}

export async function cancelAppointment(id) {
  return request(`/api/appointments/${id}/cancel`, {
    method: 'PATCH',
  })
}
