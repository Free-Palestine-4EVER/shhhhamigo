"use client"

import React from "react"
import { juices } from "@/lib/juice-data"
import JuiceCard from "./juice-card"
import Link from "next/link"

export default function HomePage() {
  const featured = juices.filter((j) => j.featured)

  return (
    <>
      {/* Hero */}
      <section className="juice-hero">
        <div className="juice-hero-content">
          <h1>Okus Prirode u Svakom Gutljaju</h1>
          <p>
            Domaći sokovi od svježeg voća, bez konzervansa i dodanog šećera.
            Pravo iz našeg voćnjaka do vašeg stola.
          </p>
          <div className="juice-hero-buttons">
            <Link href="/proizvodi" className="juice-btn-primary">
              Pogledaj Proizvode
            </Link>
            <Link href="/o-nama" className="juice-btn-secondary">
              Naša Priča
            </Link>
          </div>
        </div>
        <div className="juice-hero-visual">
          <div className="juice-hero-emoji-grid">
            <span>🍓</span><span>🍊</span><span>🍎</span>
            <span>🥭</span><span>🍃</span><span>🫐</span>
            <span>🍒</span><span>🍋</span><span>🌿</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="juice-features">
        <div className="juice-feature">
          <span className="juice-feature-icon">🌱</span>
          <h3>100% Prirodno</h3>
          <p>Bez konzervansa, bojila i umjetnih aroma</p>
        </div>
        <div className="juice-feature">
          <span className="juice-feature-icon">🏡</span>
          <h3>Domaća Proizvodnja</h3>
          <p>Voće iz naših voćnjaka u srcu Hrvatske</p>
        </div>
        <div className="juice-feature">
          <span className="juice-feature-icon">🚚</span>
          <h3>Brza Dostava</h3>
          <p>Dostavljamo svježe na vašu adresu</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="juice-section">
        <h2 className="juice-section-title">Najpopularniji Sokovi</h2>
        <div className="juice-grid">
          {featured.map((juice) => (
            <JuiceCard key={juice.id} juice={juice} large />
          ))}
        </div>
        <div className="juice-section-cta">
          <Link href="/proizvodi" className="juice-btn-primary">
            Svi Proizvodi →
          </Link>
        </div>
      </section>

      {/* Testimonial */}
      <section className="juice-testimonial">
        <blockquote>
          &ldquo;Najbolji sokovi koje sam ikada probala! Osjeti se razlika kada je voće stvarno domaće i svježe.&rdquo;
        </blockquote>
        <cite>— Marija K., Zagreb</cite>
      </section>
    </>
  )
}
