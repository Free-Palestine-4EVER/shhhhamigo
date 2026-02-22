"use client"

import React from "react"
import Image from "next/image"
import { Juice } from "@/lib/juice-data"
import { useCart } from "./cart-context"

export default function JuiceCard({ juice, large }: { juice: Juice; large?: boolean }) {
  const { addToCart } = useCart()

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
        <button className="juice-add-btn" onClick={() => addToCart(juice)}>
          Dodaj u košaricu
        </button>
      </div>
    </div>
  )
}
