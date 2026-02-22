import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, message, userId, url, data } = body

    if (!title || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const payload = {
      app_id: "e6858309-3010-4b12-8641-792d690e8ee3",
      headings: { en: title },
      contents: { en: message },
      url: url || "https://www.domacisokovi.com",
      chrome_web_icon: "https://www.domacisokovi.com/logo.png", // Always use Domaći Sokovi icon
      firefox_icon: "https://www.domacisokovi.com/logo.png",
      chrome_web_image: "https://www.domacisokovi.com/logo.png",
      // These are the correct parameters to override the app name in notifications
      android_channel_id: "domacisokovi-channel",
      android_group: "domacisokovi",
      android_group_message: { en: "New messages from Domaći Sokovi" },
      existing_android_channel_id: "domacisokovi-channel",
      android_accent_color: "FF00FF00",
      // For iOS
      ios_badgeType: "Increase",
      ios_badgeCount: 1,
      // Custom data to identify this as a Domaći Sokovi notification
      data: {
        ...(data || {}),
        appName: "Domaći Sokovi",
        notificationSource: "domacisokovi",
      },
    }

    // If userId is provided, target the notification to that user
    if (userId) {
      payload["include_external_user_ids"] = [userId]
    } else {
      payload["included_segments"] = ["Subscribed Users"]
    }

    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: "Failed to send notification", details: errorData },
        { status: response.status },
      )
    }

    const result = await response.json()
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
