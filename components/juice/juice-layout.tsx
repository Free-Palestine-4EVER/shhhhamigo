"use client"

import React, { useEffect, useState } from "react"
import { CartProvider, useCart } from "./cart-context"
import Navbar from "./navbar"
import Footer from "./footer"
import dynamic from "next/dynamic"

const SecretChatWrapper = dynamic(() => import("./secret-chat-wrapper"), {
  ssr: false,
  loading: () => <div className="secret-chat-loading">Učitavanje...</div>,
})

function SecretTrigger({ children }: { children: React.ReactNode }) {
  const { secretUnlocked } = useCart()
  const [showChat, setShowChat] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    if (secretUnlocked && !hasShown) {
      setShowChat(true)
      setHasShown(true)
    }
  }, [secretUnlocked, hasShown])

  if (showChat) {
    return <SecretChatWrapper onClose={() => setShowChat(false)} />
  }

  return <>{children}</>
}

export default function JuiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SecretTrigger>
        <div className="juice-site">
          <Navbar />
          <main className="juice-main">{children}</main>
          <Footer />
        </div>
      </SecretTrigger>
    </CartProvider>
  )
}
