"use client"

import React from "react"
import { juices } from "@/lib/juice-data"
import JuiceCard from "./juice-card"

export default function ProductsPage() {
  return (
    <section className="juice-section">
      <h1 className="juice-page-title">Naši Proizvodi</h1>
      <p className="juice-page-subtitle">Svaki sok je priča o prirodi, suncu i ljubavi prema voću.</p>
      <div className="juice-grid">
        {juices.map((juice) => (
          <JuiceCard key={juice.id} juice={juice} />
        ))}
      </div>
    </section>
  )
}
