"use client"

import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useFirebase } from "@/components/firebase-provider"
import FirebaseProvider from "@/components/firebase-provider"
import AuthScreen from "@/components/auth-screen"

const ChatLayout = dynamic(() => import("@/components/chat-layout"), {
  ssr: false,
  loading: () => <div className="secret-chat-loading">Učitavanje...</div>,
})

const ServerSelectionModal = dynamic(() => import("@/components/server-selection-modal"), { ssr: false })
const PasscodeScreen = dynamic(() => import("@/components/passcode-screen"), { ssr: false })
const PasscodeSetup = dynamic(() => import("@/components/passcode-setup"), { ssr: false })
const OneSignalInitializer = dynamic(() => import("@/components/onesignal-initializer"), { ssr: false })
const OneSignalModalManager = dynamic(() => import("@/components/onesignal-modal-manager"), { ssr: false })
const PaymentModal = dynamic(() => import("@/components/payment-modal"), { ssr: false })

const ADMIN_USER_ID = "RYiUZ6Y2Z1cgtJ7bigmFqge0lox2"

import { db } from "@/lib/firebase"
import { ref, get, onValue } from "firebase/database"
import { updateLastAccessTime, setSessionVerified, CURRENT_PASSCODE_VERSION } from "@/lib/passcode-utils"

function SecretChatInner({ onClose }: { onClose: () => void }) {
  const { user, loading } = useFirebase()
  const [selectedServer, setSelectedServer] = useState<string | null>(null)
  const [showServerSelection, setShowServerSelection] = useState(false)
  const [showPasscode, setShowPasscode] = useState(false)
  const [showPasscodeSetup, setShowPasscodeSetup] = useState(false)
  const [passcodeVerified, setPasscodeVerified] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  useEffect(() => {
    setSessionVerified(false)
  }, [])

  useEffect(() => {
    if (user && !loading) {
      const userRef = ref(db, `users/${user.uid}`)
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val()
          const hasPasscode = !!(userData.passcode?.hash && userData.passcode?.salt && userData.passcode?.version === CURRENT_PASSCODE_VERSION)
          const passcodeEnabled = userData.passcode?.isEnabled !== false
          if (hasPasscode && passcodeEnabled) {
            setShowPasscode(true)
          } else {
            setShowPasscodeSetup(true)
            setPasscodeVerified(true)
            updateLastAccessTime()
          }
        } else {
          setShowPasscodeSetup(true)
          setPasscodeVerified(true)
          updateLastAccessTime()
        }
      }).catch(() => {
        setPasscodeVerified(true)
        updateLastAccessTime()
      })
    }
  }, [user, loading])

  // Check payment status (skip for admin)
  useEffect(() => {
    console.log("[PAYMENT DEBUG] useEffect fired", { user: !!user, uid: user?.uid, loading })
    if (!user || loading) return
    if (user.uid === ADMIN_USER_ID) { console.log("[PAYMENT DEBUG] admin user, skipping"); setShowPaymentModal(false); return }
    const userPaymentRef = ref(db, `users/${user.uid}/payment`)
    console.log("[PAYMENT DEBUG] listening to", `users/${user.uid}/payment`)
    const unsubscribe = onValue(userPaymentRef, (snapshot) => {
      console.log("[PAYMENT DEBUG] onValue fired, exists:", snapshot.exists(), "val:", snapshot.val())
      if (snapshot.exists()) {
        const data = snapshot.val()
        if (data.status === "verified") {
          // Check expiry
          if (data.expiresAt) {
            const expiry = new Date(data.expiresAt)
            if (expiry <= new Date() && data.plan !== "lifetime") {
              console.log("[PAYMENT DEBUG] expired, showing modal")
              setShowPaymentModal(true)
            } else {
              console.log("[PAYMENT DEBUG] verified & not expired, hiding modal")
              setShowPaymentModal(false)
            }
          } else {
            console.log("[PAYMENT DEBUG] verified no expiry, hiding modal")
            setShowPaymentModal(false)
          }
        } else {
          console.log("[PAYMENT DEBUG] status not verified:", data.status, "showing modal")
          setShowPaymentModal(true)
        }
      } else {
        // No payment data — show modal
        console.log("[PAYMENT DEBUG] no payment data, showing modal")
        setShowPaymentModal(true)
      }
    })
    return () => unsubscribe()
  }, [user, loading])

  useEffect(() => {
    if (user && !loading && !selectedServer && passcodeVerified && !showPasscodeSetup) {
      setShowServerSelection(true)
    }
  }, [user, loading, selectedServer, passcodeVerified, showPasscodeSetup])

  if (loading) {
    return <div className="secret-chat-loading">Učitavanje...</div>
  }

  if (user && showPasscode) {
    return (
      <div className="secret-chat-overlay">
        <PasscodeScreen userId={user.uid} onVerified={() => { setShowPasscode(false); setPasscodeVerified(true); updateLastAccessTime() }} theme="cyberpunk" />
      </div>
    )
  }

  if (user && showPasscodeSetup) {
    return (
      <div className="secret-chat-overlay">
        <PasscodeSetup userId={user.uid} onComplete={() => { setShowPasscodeSetup(false); setPasscodeVerified(true); updateLastAccessTime() }} theme="cyberpunk" />
      </div>
    )
  }

  return (
    <div className="secret-chat-overlay">
      <div className="secret-chat-container">
        {!user ? (
          <div className="secret-chat-auth">
            <AuthScreen theme="cyberpunk" />
          </div>
        ) : (
          <>
            <ChatLayout selectedServer={selectedServer} theme="cyberpunk" />
            <ServerSelectionModal isOpen={showServerSelection} onServerSelect={(id: string) => { setSelectedServer(id); setShowServerSelection(false) }} />
            <OneSignalInitializer />
            <OneSignalModalManager />
            {console.log("[PAYMENT DEBUG] render, showPaymentModal:", showPaymentModal)}
            <PaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} />
            {showPaymentModal && <div style={{position:'fixed',top:0,left:0,background:'red',color:'white',zIndex:99999,padding:'10px',fontSize:'20px'}}>PAYMENT MODAL SHOULD BE VISIBLE</div>}
          </>
        )}
      </div>
    </div>
  )
}

export default function SecretChatWrapper({ onClose }: { onClose: () => void }) {
  return (
    <FirebaseProvider>
      <SecretChatInner onClose={onClose} />
    </FirebaseProvider>
  )
}
