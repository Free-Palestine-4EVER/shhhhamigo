"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { Juice } from "@/lib/juice-data"

export interface CartItem {
  juice: Juice
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (juice: Juice) => void
  removeFromCart: (juiceId: string) => void
  updateQuantity: (juiceId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  secretUnlocked: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [secretUnlocked, setSecretUnlocked] = useState(false)

  // Check if any item has exactly 3
  const checkSecret = useCallback((cartItems: CartItem[]) => {
    const hasThree = cartItems.some((item) => item.quantity === 3)
    if (hasThree && !secretUnlocked) {
      setSecretUnlocked(true)
    }
  }, [secretUnlocked])

  const addToCart = useCallback((juice: Juice) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.juice.id === juice.id)
      let newItems: CartItem[]
      if (existing) {
        newItems = prev.map((item) =>
          item.juice.id === juice.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        newItems = [...prev, { juice, quantity: 1 }]
      }
      checkSecret(newItems)
      return newItems
    })
  }, [checkSecret])

  const removeFromCart = useCallback((juiceId: string) => {
    setItems((prev) => prev.filter((item) => item.juice.id !== juiceId))
  }, [])

  const updateQuantity = useCallback((juiceId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.juice.id !== juiceId))
      return
    }
    setItems((prev) => {
      const newItems = prev.map((item) =>
        item.juice.id === juiceId ? { ...item, quantity } : item
      )
      checkSecret(newItems)
      return newItems
    })
  }, [checkSecret])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.juice.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, secretUnlocked }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
