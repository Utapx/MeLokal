const API_URL = import.meta.env.VITE_SUBMISSIONS_API_URL

async function request(payload) {
  if (!API_URL) {
    throw new Error('API Google Sheets belum dikonfigurasi.')
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  if (!response.ok || data.ok === false) throw new Error(data.error || 'Request gagal.')
  return data
}

export async function submitDestination(destination) {
  return request({ action: 'submit', destination })
}

export async function reviewSubmission(id, status, token) {
  return request({ action: 'review', id, status, token })
}

export async function deleteSubmission(id, token) {
  return request({ action: 'delete', id, token })
}

export async function fetchSubmissions(token) {
  if (!API_URL) return []
  const url = new URL(API_URL)
  url.searchParams.set('action', 'admin')
  url.searchParams.set('token', token)
  const response = await fetch(url)
  const data = await response.json()
  if (!response.ok || data.ok === false) throw new Error(data.error || 'Gagal memuat pengajuan.')
  return data.items || []
}

export async function fetchApprovedDestinations() {
  if (!API_URL) return []
  const url = new URL(API_URL)
  url.searchParams.set('action', 'approved')
  const response = await fetch(url)
  const data = await response.json()
  if (!response.ok || data.ok === false) throw new Error(data.error || 'Gagal memuat destinasi.')
  return data.items || []
}

export function isSubmissionsApiConfigured() {
  return Boolean(API_URL)
}
