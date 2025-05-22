const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// ✅ Schéma utilisateur
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// ✅ Route de test
router.get("/test", (req, res) => {
  console.log("✅ Route /test appelée");
  res.json({ message: "Le backend répond 👌" });
});

// ✅ Inscription
router.post("/signup", async (req, res) => {
  console.log("📨 Requête POST /signup reçue :", req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();

    res.status(201).json({ message: "Utilisateur créé" });
  } catch (err) {
    console.error("❌ Erreur MongoDB dans /signup :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Connexion
router.post("/signin", async (req, res) => {
  console.log("🔐 Requête POST /signin reçue :", req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    res.status(200).json({ message: "Connexion réussie" });
  } catch (err) {
    console.error("❌ Erreur dans /signin :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
