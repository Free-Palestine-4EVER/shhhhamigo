"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useCart } from "./cart-context"

export default function Navbar() {
  const { totalItems } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="juice-navbar">
      <div className="juice-navbar-inner">
        <Link href="/" className="juice-logo">
          🍃 Domaći Sokovi
        </Link>

        {/* Desktop nav */}
        <div className="juice-nav-links">
          <Link href="/" className="juice-nav-link">Početna</Link>
          <Link href="/proizvodi" className="juice-nav-link">Proizvodi</Link>
          <Link href="/o-nama" className="juice-nav-link">O nama</Link>
          <Link href="/kontakt" className="juice-nav-link">Kontakt</Link>
          <Link href="/kosara" className="juice-nav-link juice-cart-link">
            🛒 Košarica
            {totalItems > 0 && <span className="juice-cart-badge">{totalItems}</span>}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="juice-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="juice-mobile-menu">
          <Link href="/" className="juice-mobile-link" onClick={() => setMobileOpen(false)}>Početna</Link>
          <Link href="/proizvodi" className="juice-mobile-link" onClick={() => setMobileOpen(false)}>Proizvodi</Link>
          <Link href="/o-nama" className="juice-mobile-link" onClick={() => setMobileOpen(false)}>O nama</Link>
          <Link href="/kontakt" className="juice-mobile-link" onClick={() => setMobileOpen(false)}>Kontakt</Link>
          <Link href="/kosara" className="juice-mobile-link" onClick={() => setMobileOpen(false)}>
            🛒 Košarica {totalItems > 0 && `(${totalItems})`}
          </Link>
        </div>
      )}
    </nav>
  )
}
