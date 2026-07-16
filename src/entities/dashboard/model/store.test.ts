import { beforeEach, describe, expect, it } from 'vitest'
import { useDashboardStore } from './store'

const getItems = () => useDashboardStore.getState().items

describe('dashboard store', () => {
  beforeEach(() => {
    useDashboardStore.getState().resetDashboard()
  })

  it('добавляет виджет с уникальным id', () => {
    const before = getItems().length
    useDashboardStore.getState().addWidget('products-table')
    const items = getItems()
    expect(items).toHaveLength(before + 1)
    expect(items.at(-1)?.type).toBe('products-table')
    expect(new Set(items.map((item) => item.id)).size).toBe(items.length)
  })

  it('удаляет виджет по id', () => {
    const target = getItems()[0]
    useDashboardStore.getState().removeWidget(target.id)
    expect(getItems().find((item) => item.id === target.id)).toBeUndefined()
  })

  it('меняет порядок виджетов (move)', () => {
    const [first, second] = getItems()
    useDashboardStore.getState().moveWidget(first.id, second.id)
    expect(getItems()[0].id).toBe(second.id)
    expect(getItems()[1].id).toBe(first.id)
  })

  it('игнорирует move с неизвестным id', () => {
    const before = getItems()
    useDashboardStore.getState().moveWidget('unknown-id', before[0].id)
    expect(getItems()).toEqual(before)
  })

  it('сбрасывает конфигурацию к виду по умолчанию', () => {
    useDashboardStore.getState().removeWidget(getItems()[0].id)
    useDashboardStore.getState().resetDashboard()
    expect(getItems().map((item) => item.id)).toEqual([
      'default-stats',
      'default-chart',
      'default-table',
      'default-news',
    ])
  })
})
