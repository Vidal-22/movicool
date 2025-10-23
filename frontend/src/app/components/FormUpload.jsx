"use client";
import { useState } from "react";

export default function FormUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Por favor selecciona un archivo Excel.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message || "Archivo subido correctamente ✅");
    } catch (error) {
      console.error(error);
      setMessage("Error al subir el archivo ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>📤 Subir archivo Excel</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          style={{ margin: "20px" }}
        />
        <br />
        <button
          type="submit"
          style={{
            backgroundColor: "black",
            color: "gold",
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Subir
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}
