"use client"

import React from "react"
import { useCart } from "./cart-context"
import Link from "next/link"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <section className="juice-section juice-cart-empty">
        <h1 className="juice-page-title">Košarica</h1>
        <div className="juice-empty-cart">
          <span style={{ fontSize: "64px" }}>🛒</span>
          <p>Vaša košarica je prazna</p>
          <Link href="/proizvodi" className="juice-btn-primary">Pogledaj Proizvode</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="juice-section">
      <h1 className="juice-page-title">Košarica</h1>
      <div className="juice-cart-list">
        {items.map((item) => (
          <div key={item.juice.id} className="juice-cart-item">
            <div
              className="juice-cart-item-image"
              style={{ background: `linear-gradient(135deg, ${item.juice.color1}, ${item.juice.color2})` }}
            >
              <span>{item.juice.emoji}</span>
            </div>
            <div className="juice-cart-item-info">
              <h3>{item.juice.name}</h3>
              <p>{item.juice.price.toFixed(2)} € / kom</p>
            </div>
            <div className="juice-cart-item-controls">
              <button onClick={() => updateQuantity(item.juice.id, item.quantity - 1)}>−</button>
              <span className="juice-cart-qty">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.juice.id, item.quantity + 1)}>+</button>
            </div>
            <div className="juice-cart-item-total">
              {(item.juice.price * item.quantity).toFixed(2)} €
            </div>
            <button className="juice-cart-remove" onClick={() => removeFromCart(item.juice.id)}>✕</button>
          </div>
        ))}
      </div>
      <div className="juice-cart-summary">
        <div className="juice-cart-total">
          <span>Ukupno:</span>
          <strong>{totalPrice.toFixed(2)} €</strong>
        </div>
        <button className="juice-btn-primary juice-btn-checkout">Naruči</button>
      </div>
    </section>
  )
}
