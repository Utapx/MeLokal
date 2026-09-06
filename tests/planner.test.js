import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { generateItinerary, recalculateRouteDistances } from '../src/utils/planner.js'

const startPoint = { lat: -6.9175, lng: 107.6191, label: 'Test start' }

describe('planner', () => {
  it('generates the requested number of day plans', () => {
    const itinerary = generateItinerary('bandung', 3, 'hemat', ['kuliner'], startPoint)

    assert.equal(itinerary.destinationSlug, 'bandung')
    assert.equal(itinerary.days, 3)
    assert.equal(itinerary.dayPlans.length, 3)
    assert.equal(itinerary.dayPlans.every((day) => day.slots.length === 5), true)
  })

  it('keeps the selected start point on every day', () => {
    const itinerary = generateItinerary('bandung', 1, 'medium', ['budaya'], startPoint)

    assert.deepEqual(itinerary.startPoint, startPoint)
    assert.deepEqual(itinerary.dayPlans[0].startPoint, startPoint)
  })

  it('returns empty slots instead of crashing when no places match', () => {
    const itinerary = generateItinerary(
      'bandung',
      1,
      'hemat',
      ['kuliner'],
      startPoint,
      [{ id: 'only-cafe', category: 'cafe', lat: -6.9, lng: 107.6, priceTier: 1, localScore: 4 }],
    )

    assert.equal(itinerary.dayPlans[0].slots.some((slot) => slot.place === null), true)
  })

  it('recalculates distances from the start point through each place', () => {
    const slots = [
      { place: { lat: -6.91, lng: 107.61 } },
      { place: { lat: -6.92, lng: 107.62 } },
      { place: null },
    ]

    const result = recalculateRouteDistances(slots, startPoint)

    assert.ok(result[0].distanceFromPrevious > 0)
    assert.ok(result[1].distanceFromPrevious > 0)
    assert.equal(result[2].distanceFromPrevious, null)
  })
})
