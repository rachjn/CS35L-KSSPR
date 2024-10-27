import "./globals.css";

export const metadata = {
  title: "oops! i had an acc(id)ent",
  description: "Fill in later",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/org5cfx.css" />
        <link rel="stylesheet" href="https://use.typekit.net/cdd6oyg.css" />
      </head>
      <body className="font-greycliff">{children}</body>
    </html>
  );
}
