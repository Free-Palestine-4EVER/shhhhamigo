import type React from "react"

export const metadata = {
  title: "Server Suspended",
  description: "This server has been suspended due to non-payment.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              * { margin: 0; padding: 0; box-sizing: border-box; }
              html, body { height: 100%; width: 100%; }
              body {
                background-color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              }
              .suspended-container {
                text-align: center;
                padding: 40px 20px;
                max-width: 600px;
              }
              .suspended-icon {
                font-size: 64px;
                margin-bottom: 24px;
              }
              .suspended-title {
                color: #dc2626;
                font-size: 32px;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 24px;
              }
              .suspended-message {
                color: #dc2626;
                font-size: 18px;
                line-height: 1.6;
                font-weight: 500;
              }
              .suspended-divider {
                width: 80px;
                height: 4px;
                background-color: #dc2626;
                margin: 24px auto;
                border-radius: 2px;
              }
            `,
          }}
        />
      </head>
      <body>
        <div className="suspended-container">
          <div className="suspended-icon">⚠️</div>
          <h1 className="suspended-title">Server Suspended</h1>
          <div className="suspended-divider"></div>
          <p className="suspended-message">
            Please pay the due balance to reactivate your server.<br /><br />
            Failing to do so will terminate the registered account and will result in loss of data.
          </p>
        </div>
      </body>
    </html>
  )
}
