import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      token,
      title,
      body: messageBody,
      icon,
      clickAction,
      chatId,
      imageUrl,
    } = body

    if (!title || !messageBody) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Use FCM implementation
    if (token) {
      const message = {
        notification: {
          title,
          body: messageBody,
          icon: icon || "/icons/icon-192x192.png",
          click_action: clickAction || "/",
          image: imageUrl || undefined,
        },
        webpush: {
          fcm_options: {
            link: clickAction || "/",
          },
          notification: {
            icon: icon || "/icons/icon-192x192.png",
            badge: "/icons/icon-72x72.png",
            vibrate: [100, 50, 100],
            actions: [
              {
                action: "view",
                title: "View",
              },
            ],
            data: {
              chatId,
            },
          },
        },
        token,
      }

      console.log("Would send notification:", message)
      return NextResponse.json({ success: true, provider: "fcm" })
    }

    return NextResponse.json({ error: "No valid notification method available" }, { status: 400 })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}
