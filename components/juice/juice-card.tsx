"use client"

import React from "react"
import { Juice } from "@/lib/juice-data"
import { useCart } from "./cart-context"

export default function JuiceCard({ juice, large }: { juice: Juice; large?: boolean }) {
  const { addToCart } = useCart()

  return (
    <div className={`juice-card ${large ? "juice-card-large" : ""}`}>
      <div
        className="juice-card-image"
        style={{ background: `linear-gradient(135deg, ${juice.color1}, ${juice.color2})` }}
      >
        <span className="juice-card-emoji">{juice.emoji}</span>
      </div>
      <div className="juice-card-body">
        <h3 className="juice-card-title">{juice.name}</h3>
        <p className="juice-card-desc">{juice.description}</p>
        <div className="juice-card-footer">
          <span className="juice-card-price">{juice.price.toFixed(2)} €</span>
          <span className="juice-card-volume">{juice.volume}</span>
        </div>
        <button className="juice-add-btn" onClick={() => addToCart(juice)}>
          Dodaj u košaricu
        </button>
      </div>
    </div>
  )
}
