import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import DataModel from "./models/DataModel.js"; // ✅ Tu modelo correcto

dotenv.config();

const app = express();
const upload = multer(); // almacenamiento temporal en memoria
app.use(cors());
app.use(express.json());

// 🔹 Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// 🔹 Ruta para subir el archivo Excel
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!data || data.length === 0) {
      return res.status(400).json({ message: "El archivo está vacío o no tiene datos válidos." });
    }

    // ✅ Guardar los datos del Excel en MongoDB
    await DataModel.insertMany(data);

    mongoose.connection.on("connected", () => {
  console.log("📡 Base de datos activa:", mongoose.connection.name);
});


    console.log("📊 Datos guardados en MongoDB:", data);
    res.status(200).json({ message: "Archivo recibido y guardado en MongoDB", data });
  } catch (error) {
    console.error("❌ Error al procesar el archivo:", error);
    res.status(500).json({ message: "Error al subir el archivo", error: error.message });
  }
});

// 🔹 Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`));
