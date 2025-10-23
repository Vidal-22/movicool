import "./globals.css";

export const metadata = {
  title: "Movicool - Carga de Excel",
  description: "Sube tus archivos Excel y guarda los datos en MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#111",
          color: "#FFD700",
          fontFamily: "Arial, sans-serif",
          minHeight: "100vh",
        }}
      >
        <header
          style={{
            backgroundColor: "#000",
            padding: "15px",
            textAlign: "center",
            borderBottom: "2px solid #FFD700",
          }}
        >
          <h1 style={{ margin: 0 }}>📦 Movicool Data Uploader</h1>
        </header>

        <main style={{ padding: "20px" }}>{children}</main>

        <footer
          style={{
            marginTop: "50px",
            textAlign: "center",
            borderTop: "1px solid #FFD700",
            padding: "10px",
            color: "#ccc",
          }}
        >
          <p>© {new Date().getFullYear()} Movicool App</p>
        </footer>
      </body>
    </html>
  );
}
