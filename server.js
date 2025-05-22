const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth"); // ← doit bien être un routeur

const app = express();

console.log("✅ Fichier auth.js bien chargé");
console.log("✅ Lancement du serveur...");
console.log("⏳ Connexion MongoDB en cours...");

// Middleware
app.use(cors());
app.use(express.json());

// Route API
app.use("/api/auth", authRoutes); // ← ici, authRoutes doit être un router, pas un objet

// Fichiers statiques
app.use(express.static(path.join(__dirname)));

// Connexion MongoDB
mongoose.connect("mongodb+srv://maklf:21052006@cluster0.ketnbto.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connecté avec succès");
  app.listen(5000, () => {
    console.log("🚀 Serveur lancé sur http://localhost:5000");
  });
})
.catch(err => {
  console.error("❌ Erreur MongoDB :", err.message);
});
