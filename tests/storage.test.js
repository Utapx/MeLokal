import assert from 'node:assert/strict'
import { beforeEach, describe, it } from 'node:test'
import {
  deleteJourney,
  getFavoriteIds,
  getSavedJourneys,
  isFavorite,
  saveJourney,
  toggleFavorite,
} from '../src/utils/storage.js'

function createLocalStorage() {
  const values = new Map()
  return {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
    clear: () => values.clear(),
  }
}

describe('storage', () => {
  beforeEach(() => {
    globalThis.window = { localStorage: createLocalStorage() }
  })

  it('toggles favorite ids', () => {
    assert.deepEqual(toggleFavorite('place-1'), ['place-1'])
    assert.equal(isFavorite('place-1'), true)
    assert.deepEqual(toggleFavorite('place-1'), [])
    assert.equal(isFavorite('place-1'), false)
  })

  it('recovers from malformed favorite and journey values', () => {
    window.localStorage.setItem('melokal_favorites', JSON.stringify({ broken: true }))
    window.localStorage.setItem('melokal_journeys', JSON.stringify('broken'))

    assert.deepEqual(getFavoriteIds(), [])
    assert.deepEqual(getSavedJourneys(), [])
  })

  it('saves and deletes journeys', () => {
    const journey = { destinationSlug: 'bandung', days: 1, dayPlans: [] }
    const saved = saveJourney(journey)

    assert.equal(saved.length, 1)
    assert.deepEqual(saved[0], { ...journey, id: saved[0].id, savedAt: saved[0].savedAt })
    assert.equal(getSavedJourneys().length, 1)
    assert.deepEqual(deleteJourney(saved[0].id), [])
  })
})
