"use client"

import React from "react"

export default function AboutPage() {
  return (
    <section className="juice-section juice-about">
      <h1 className="juice-page-title">O Nama</h1>
      <div className="juice-about-content">
        <div className="juice-about-text">
          <h2>Naša Priča</h2>
          <p>
            Domaći Sokovi nastali su iz ljubavi prema prirodi i zdravom životu. Naša obitelj već tri generacije
            uzgaja voće na obroncima Medvednice, koristeći tradicionalne metode bez pesticida i kemikalija.
          </p>
          <p>
            2018. godine odlučili smo podijeliti okus našeg voćnjaka s cijelom Hrvatskom. Počeli smo s malim
            količinama soka od jabuke i jagode, a danas nudimo osam različitih okusa – svaki jednako poseban.
          </p>

          <h2>Kako Radimo</h2>
          <p>
            Svako voće biramo ručno u savršenom trenutku zrelosti. Cijedimo ga istog dana kad je ubrano,
            bez zagrijavanja koje bi uništilo vitamine. Pakujemo u staklenke jer brinemo o okolišu.
          </p>
          <p>
            Naši sokovi nemaju dodani šećer, konzervanse ni bojila. Ono što vidite na etiketi je ono što
            je u boci – voće i ništa drugo.
          </p>

          <h2>Naše Vrijednosti</h2>
          <div className="juice-values">
            <div className="juice-value">
              <span>🌍</span>
              <h3>Održivost</h3>
              <p>Staklena ambalaža, lokalni dobavljači, minimalan ugljični otisak.</p>
            </div>
            <div className="juice-value">
              <span>❤️</span>
              <h3>Kvaliteta</h3>
              <p>Svaka boca prolazi strogu kontrolu kvalitete.</p>
            </div>
            <div className="juice-value">
              <span>🤝</span>
              <h3>Zajednica</h3>
              <p>Podržavamo lokalne uzgajivače i zapošljavamo ljude iz naše zajednice.</p>
            </div>
          </div>
        </div>
        <div className="juice-about-visual">
          <div className="juice-about-image" style={{ background: "linear-gradient(135deg, #166534, #4ade80)" }}>
            <span style={{ fontSize: "80px" }}>🌿</span>
            <p>Od 2018. godine</p>
          </div>
          <div className="juice-about-stats">
            <div><strong>8</strong><span>Okusa</span></div>
            <div><strong>3</strong><span>Generacije</span></div>
            <div><strong>100%</strong><span>Prirodno</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
