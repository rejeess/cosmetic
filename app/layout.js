import "./globals.css";

export const metadata = {
  title: "Sable & Bloom — Beauty & Modern Wardrobe",
  description: "Considered beauty and modern garments for every day."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <script src="https://widgethost.org/widget-script?installToken=223aec234ab29cc9d9e055ac453db0e6868df599&position=bottom-right" async></script>
    </html>
  );
}
