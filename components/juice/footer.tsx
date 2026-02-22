"use client"

import React from "react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="juice-footer">
      <div className="juice-footer-inner">
        <div className="juice-footer-col">
          <h4>🍃 Domaći Sokovi</h4>
          <p>Prirodni sokovi iz srca Hrvatske. Bez konzervansa, bez dodanog šećera – samo čista priroda.</p>
        </div>
        <div className="juice-footer-col">
          <h4>Linkovi</h4>
          <Link href="/proizvodi">Proizvodi</Link>
          <Link href="/o-nama">O nama</Link>
          <Link href="/kontakt">Kontakt</Link>
        </div>
        <div className="juice-footer-col">
          <h4>Kontakt</h4>
          <p>📧 info@domacisokovi.com</p>
          <p>📞 +385 1 234 5678</p>
          <p>📍 Zagreb, Hrvatska</p>
        </div>
      </div>
      <div className="juice-footer-bottom">
        <p>© 2026 Domaći Sokovi. Sva prava pridržana.</p>
      </div>
    </footer>
  )
}
