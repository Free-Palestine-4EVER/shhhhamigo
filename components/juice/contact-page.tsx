"use client"

import React from "react"

export default function ContactPage() {
  return (
    <section className="juice-section juice-contact">
      <h1 className="juice-page-title">Kontakt</h1>
      <p className="juice-page-subtitle">Imate pitanje? Javite nam se!</p>

      <div className="juice-contact-grid">
        <div className="juice-contact-info">
          <div className="juice-contact-item">
            <span>📧</span>
            <div>
              <h3>Email</h3>
              <p>info@domacisokovi.com</p>
            </div>
          </div>
          <div className="juice-contact-item">
            <span>📞</span>
            <div>
              <h3>Telefon</h3>
              <p>+385 1 234 5678</p>
            </div>
          </div>
          <div className="juice-contact-item">
            <span>📍</span>
            <div>
              <h3>Adresa</h3>
              <p>Ulica voćnjaka 42<br />10000 Zagreb, Hrvatska</p>
            </div>
          </div>
          <div className="juice-contact-item">
            <span>🕐</span>
            <div>
              <h3>Radno Vrijeme</h3>
              <p>Pon - Pet: 08:00 - 16:00<br />Sub: 09:00 - 13:00</p>
            </div>
          </div>
        </div>

        <form className="juice-contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="juice-form-group">
            <label>Ime i prezime</label>
            <input type="text" placeholder="Vaše ime" />
          </div>
          <div className="juice-form-group">
            <label>Email</label>
            <input type="email" placeholder="vas@email.com" />
          </div>
          <div className="juice-form-group">
            <label>Poruka</label>
            <textarea rows={5} placeholder="Vaša poruka..." />
          </div>
          <button type="submit" className="juice-btn-primary">Pošalji Poruku</button>
        </form>
      </div>
    </section>
  )
}
