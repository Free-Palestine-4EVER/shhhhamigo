"use client"

import React from "react"
import Image from "next/image"
import { juices } from "@/lib/juice-data"
import JuiceCard from "./juice-card"
import Link from "next/link"

export default function HomePage() {
  const featured = juices.filter((j) => j.featured)

  return (
    <>
      {/* Hero */}
      <section className="juice-hero">
        <div className="juice-hero-bg">
          <Image
            src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=1200"
            alt="Fresh organic juices"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="juice-hero-bg-overlay" />
        </div>
        <div className="juice-hero-content">
          <span className="juice-hero-badge">🌿 100% Prirodno · Bez Konzervansa</span>
          <h1>Okus Prirode<br />u Svakom Gutljaju</h1>
          <p>
            Domaći sokovi od svježeg voća, bez konzervansa i dodanog šećera.
            Pravo iz našeg voćnjaka do vašeg stola.
          </p>
          <div className="juice-hero-buttons">
            <Link href="/proizvodi" className="juice-btn-primary">
              Pogledaj Proizvode
            </Link>
            <Link href="/o-nama" className="juice-btn-secondary juice-btn-secondary-light">
              Naša Priča
            </Link>
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

      {/* How It Works */}
      <section className="juice-how-it-works">
        <h2 className="juice-section-title">Kako Funkcionira</h2>
        <div className="juice-steps">
          <div className="juice-step">
            <div className="juice-step-number">01</div>
            <h3>Odaberite Sokove</h3>
            <p>Pregledajte naš izbor premium domaćih sokova i dodajte omiljene u košaricu.</p>
          </div>
          <div className="juice-step-divider" />
          <div className="juice-step">
            <div className="juice-step-number">02</div>
            <h3>Mi Pripremamo</h3>
            <p>Svaki sok se cijeđi svježe za vašu narudžbu — nikad iz koncetrata.</p>
          </div>
          <div className="juice-step-divider" />
          <div className="juice-step">
            <div className="juice-step-number">03</div>
            <h3>Dostava na Vrata</h3>
            <p>Brza i pouzdana dostava do vaših vrata u rashladnom pakiranju.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="juice-section">
        <h2 className="juice-section-title">Najpopularniji Sokovi</h2>
        <p className="juice-section-subtitle">Naši najomiljeniji okusi koje kupci obožavaju</p>
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

      {/* Benefits */}
      <section className="juice-benefits">
        <div className="juice-benefits-content">
          <h2>Zašto Naši Sokovi?</h2>
          <div className="juice-benefits-grid">
            <div className="juice-benefit">
              <span>🍊</span>
              <div>
                <h4>Svježe Cijeđeno</h4>
                <p>Svaki sok pripreman je dan pred dostavu za maksimalnu svježinu i okus.</p>
              </div>
            </div>
            <div className="juice-benefit">
              <span>🌍</span>
              <div>
                <h4>Lokalno Voće</h4>
                <p>Koristimo voće iz hrvatskih voćnjaka — podržavamo lokalne uzgajivače.</p>
              </div>
            </div>
            <div className="juice-benefit">
              <span>❤️</span>
              <div>
                <h4>Bez Aditiva</h4>
                <p>Nema šećera, konzervansa ni bojila. Samo čisto voće i ništa drugo.</p>
              </div>
            </div>
            <div className="juice-benefit">
              <span>♻️</span>
              <div>
                <h4>Eko Pakiranje</h4>
                <p>Staklene boce koje možete vratiti i reciklirati. Brinemo za planet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="juice-testimonial">
        <blockquote>
          &ldquo;Najbolji sokovi koje sam ikada probala! Osjeti se razlika kada je voće stvarno domaće i svježe.&rdquo;
        </blockquote>
        <cite>— Marija K., Zagreb</cite>
      </section>

      {/* CTA */}
      <section className="juice-cta-section">
        <h2>Spremni za Okus Prirode?</h2>
        <p>Naručite danas i doživite razliku domaćeg, svježe cijeđenog soka.</p>
        <Link href="/proizvodi" className="juice-btn-primary juice-btn-large">
          Naručite Sada →
        </Link>
      </section>
    </>
  )
}
