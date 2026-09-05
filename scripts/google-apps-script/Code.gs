const SHEET_NAME = 'Submissions'
const ADMIN_TOKEN = PropertiesService.getScriptProperties().getProperty('ADMIN_TOKEN')
const ALLOWED_DESTINATIONS = ['bandung', 'yogyakarta', 'jakarta', 'semarang', 'surabaya']

function doGet(event) {
  const action = event.parameter.action || 'approved'
  if (action === 'approved') return jsonResponse({ ok: true, items: getRows('approved') })
  if (action === 'admin') {
    if (!isAdmin(event.parameter.token)) return jsonResponse({ ok: false, error: 'Unauthorized' }, 401)
    return jsonResponse({ ok: true, items: getRows('pending').concat(getRows('approved')) })
  }
  return jsonResponse({ ok: false, error: 'Unknown action' }, 400)
}

function doPost(event) {
  const body = JSON.parse(event.postData.contents || '{}')
  if (body.action === 'submit') return submit(body.destination || {})
  if (body.action === 'review') {
    if (!isAdmin(body.token)) return jsonResponse({ ok: false, error: 'Unauthorized' }, 401)
    return review(body.id, body.status)
  }
  if (body.action === 'delete') {
    if (!isAdmin(body.token)) return jsonResponse({ ok: false, error: 'Unauthorized' }, 401)
    return removeSubmission(body.id)
  }
  return jsonResponse({ ok: false, error: 'Unknown action' }, 400)
}

function submit(destination) {
  const required = ['name', 'destinationSlug', 'region', 'tagline', 'description', 'address', 'googleMapsUrl', 'submitterName', 'submitterEmail']
  if (required.some((key) => !destination[key])) return jsonResponse({ ok: false, error: 'Required fields are missing.' }, 400)
  if (!ALLOWED_DESTINATIONS.includes(destination.destinationSlug)) return jsonResponse({ ok: false, error: 'Kota tujuan tidak tersedia.' }, 400)

  const coordinates = extractCoordinates(destination.googleMapsUrl)
  if (!coordinates) return jsonResponse({ ok: false, error: 'Google Maps URL tidak berisi koordinat yang valid.' }, 400)

  const sheet = getSheet()
  const id = Utilities.getUuid()
  sheet.appendRow([
    id, new Date().toISOString(), 'pending', destination.name, destination.region,
    destination.tagline, destination.description, destination.category || 'food',
    destination.address, coordinates.latitude, coordinates.longitude,
    destination.heroImage || '', destination.submitterName, destination.submitterEmail, '', destination.googleMapsUrl, destination.destinationSlug,
  ])
  return jsonResponse({ ok: true, id })
}

function review(id, status) {
  if (!['approved', 'rejected'].includes(status)) return jsonResponse({ ok: false, error: 'Invalid status.' }, 400)
  const sheet = getSheet()
  const values = sheet.getDataRange().getValues()
  const idColumn = 0
  for (let index = 1; index < values.length; index += 1) {
    if (values[index][idColumn] === id) {
      sheet.getRange(index + 1, 3).setValue(status)
      sheet.getRange(index + 1, 15).setValue(new Date().toISOString())
      return jsonResponse({ ok: true })
    }
  }
  return jsonResponse({ ok: false, error: 'Submission not found.' }, 404)
}

function removeSubmission(id) {
  const sheet = getSheet()
  const values = sheet.getDataRange().getValues()
  for (let index = 1; index < values.length; index += 1) {
    if (values[index][0] === id) {
      sheet.deleteRow(index + 1)
      return jsonResponse({ ok: true })
    }
  }
  return jsonResponse({ ok: false, error: 'Submission not found.' }, 404)
}

function getRows(status) {
  const values = getSheet().getDataRange().getValues()
  const headers = values.shift()
  return values
    .filter((row) => row[2] === status)
    .map((row) => headers.reduce((item, header, index) => ({ ...item, [header]: row[index] }), {}))
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = spreadsheet.getSheetByName(SHEET_NAME)
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'id', 'createdAt', 'status', 'name', 'region', 'tagline', 'description', 'category',
      'address', 'latitude', 'longitude', 'heroImage', 'submitterName', 'submitterEmail', 'reviewedAt', 'googleMapsUrl', 'destinationSlug',
    ])
  } else {
    const lastColumn = sheet.getLastColumn()
    const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0]
    if (!headers.includes('googleMapsUrl')) sheet.getRange(1, lastColumn + 1).setValue('googleMapsUrl')
    if (!headers.includes('destinationSlug')) sheet.getRange(1, sheet.getLastColumn() + 1).setValue('destinationSlug')
  }
  return sheet
}

function extractCoordinates(value) {
  const url = String(value || '')
  const patterns = [
    /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/,
    /[?&](?:q|query)=(-?\d+(?:\.\d+)?)[,%20]+(-?\d+(?:\.\d+)?)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      const latitude = Number(match[1])
      const longitude = Number(match[2])
      if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180) return { latitude, longitude }
    }
  }
  return null
}

function isAdmin(token) {
  return Boolean(ADMIN_TOKEN && token && token === ADMIN_TOKEN)
}

function jsonResponse(payload, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
}
