'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  slug: string
  name: string
  price: number
  variant?: string
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  add: (item: Omit<CartItem, 'quantity'>) => void
  remove: (slug: string, variant?: string) => void
  updateQty: (slug: string, quantity: number, variant?: string) => void
  clear: () => void
  toggle: (open?: boolean) => void
  count: () => number
  total: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (incoming) => {
        const key = (i: CartItem) => i.slug + (i.variant ?? '')
        set((state) => {
          const incomingKey = incoming.slug + (incoming.variant ?? '')
          const existing = state.items.find((i) => key(i) === incomingKey)
          if (existing) {
            return {
              items: state.items.map((i) =>
                key(i) === incomingKey ? { ...i, quantity: i.quantity + 1 } : i,
              ),
              isOpen: true,
            }
          }
          return {
            items: [...state.items, { ...incoming, quantity: 1 }],
            isOpen: true,
          }
        })
      },
      remove: (slug, variant) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.slug === slug && (i.variant ?? '') === (variant ?? '')),
          ),
        })),
      updateQty: (slug, quantity, variant) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.slug === slug && (i.variant ?? '') === (variant ?? '')
                ? { ...i, quantity: Math.max(0, quantity) }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      toggle: (open) =>
        set((state) => ({ isOpen: typeof open === 'boolean' ? open : !state.isOpen })),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      total: () => get().items.reduce((sum, i) => sum + i.quantity * i.price, 0),
    }),
    {
      name: 'serum-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
