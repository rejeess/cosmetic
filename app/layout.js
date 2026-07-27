import "./globals.css";

export const metadata = {
  title: "Sable & Bloom — Beauty & Modern Wardrobe",
  description: "Considered beauty and modern garments for every day."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
