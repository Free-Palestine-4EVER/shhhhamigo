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

import { db } from "@/lib/firebase"
import { ref, get } from "firebase/database"
import { updateLastAccessTime, setSessionVerified, CURRENT_PASSCODE_VERSION } from "@/lib/passcode-utils"

function SecretChatInner({ onClose }: { onClose: () => void }) {
  const { user, loading } = useFirebase()
  const [selectedServer, setSelectedServer] = useState<string | null>(null)
  const [showServerSelection, setShowServerSelection] = useState(false)
  const [showPasscode, setShowPasscode] = useState(false)
  const [showPasscodeSetup, setShowPasscodeSetup] = useState(false)
  const [passcodeVerified, setPasscodeVerified] = useState(false)

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
        <button className="secret-chat-close" onClick={onClose}>✕ Zatvori</button>
        <PasscodeScreen userId={user.uid} onVerified={() => { setShowPasscode(false); setPasscodeVerified(true); updateLastAccessTime() }} />
      </div>
    )
  }

  if (user && showPasscodeSetup) {
    return (
      <div className="secret-chat-overlay">
        <button className="secret-chat-close" onClick={onClose}>✕ Zatvori</button>
        <PasscodeSetup userId={user.uid} onComplete={() => { setShowPasscodeSetup(false); setPasscodeVerified(true); updateLastAccessTime() }} />
      </div>
    )
  }

  return (
    <div className="secret-chat-overlay">
      <button className="secret-chat-close" onClick={onClose}>✕ Zatvori</button>
      <div className="secret-chat-container">
        {!user ? (
          <div className="secret-chat-auth">
            <AuthScreen />
          </div>
        ) : (
          <>
            <ChatLayout selectedServer={selectedServer} />
            <ServerSelectionModal isOpen={showServerSelection} onServerSelect={(id: string) => { setSelectedServer(id); setShowServerSelection(false) }} />
            <OneSignalInitializer />
            <OneSignalModalManager />
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
