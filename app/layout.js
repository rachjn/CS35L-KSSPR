import "./globals.css";
import { ClickSound } from "../components/ClickSound";
import ImageCursor from "../components/ImageCursor";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="stylesheet" href="https://use.typekit.net/org5cfx.css" />
        <link rel="stylesheet" href="https://use.typekit.net/cdd6oyg.css" />
      </head>
      <body className="font-greycliff cursor-none">
        <ImageCursor />
        <ClickSound />
        {children}
      </body>
    </html>
  );
}