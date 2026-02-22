"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Juice } from "@/lib/juice-data"
import { useCart } from "./cart-context"

export default function JuiceCard({ juice, large }: { juice: Juice; large?: boolean }) {
  const { addToCart, items, updateQuantity, removeFromCart } = useCart()
  const [localQty, setLocalQty] = useState(1)

  const cartItem = items.find((i) => i.juice.id === juice.id)
  const cartQty = cartItem?.quantity || 0

  const handleAdd = () => {
    // Add localQty items
    for (let i = 0; i < localQty; i++) {
      addToCart(juice)
    }
    setLocalQty(1)
  }

  return (
    <div className={`juice-card ${large ? "juice-card-large" : ""}`}>
      <div className="juice-card-image">
        <Image
          src={juice.imageUrl}
          alt={juice.name}
          fill
          sizes="(max-width: 768px) 100vw, 350px"
          style={{ objectFit: "cover" }}
        />
        <div className="juice-card-image-overlay" />
      </div>
      <div className="juice-card-body">
        <h3 className="juice-card-title">{juice.name}</h3>
        <p className="juice-card-desc">{juice.description}</p>
        <div className="juice-card-footer">
          <span className="juice-card-price">{juice.price.toFixed(2)} €</span>
          <span className="juice-card-volume">{juice.volume}</span>
        </div>
        <div className="juice-card-actions">
          <div className="juice-qty-picker">
            <button
              className="juice-qty-btn"
              onClick={() => setLocalQty(Math.max(1, localQty - 1))}
              aria-label="Smanji količinu"
            >
              −
            </button>
            <span className="juice-qty-value">{localQty}</span>
            <button
              className="juice-qty-btn"
              onClick={() => setLocalQty(localQty + 1)}
              aria-label="Povećaj količinu"
            >
              +
            </button>
          </div>
          <button className="juice-add-btn" onClick={handleAdd}>
            Dodaj u košaricu
          </button>
        </div>
        {cartQty > 0 && (
          <div className="juice-card-in-cart">
            <span>U košarici: {cartQty}</span>
          </div>
        )}
      </div>
    </div>
  )
}
