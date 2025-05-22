const API_URL = "http://127.0.0.1:5000/api/auth";

// Vérification que le fichier JS est bien chargé
console.log("✅ Fichier auth.js bien chargé");

// 🔐 Inscription
async function signUp() {
  console.log("🚀 Fonction signUp appelée");

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  console.log("📧 Email saisi :", email);
  console.log("🔑 Mot de passe saisi :", password);

  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("📩 Réponse serveur :", data);

    if (res.ok) {
      alert("✅ Compte créé avec succès !");
      toggleForms();
    } else {
      alert("❌ Erreur pendant l'inscription : " + (data.message || "Inconnue"));
    }
  } catch (err) {
    console.error("❌ Erreur Fetch :", err);
    alert("❌ Erreur pendant l'inscription (fetch)");
  }
}

// 🔑 Connexion
async function signIn() {
  console.log("🚪 Fonction signIn appelée");

  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;
  console.log("📧 Email connexion :", email);
  console.log("🔐 Password connexion :", password);

  try {
    const res = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("📥 Réponse serveur :", data);

    if (res.ok) {
      alert("✅ Connexion réussie !");
      
    } else {
      alert("❌ Connexion échouée : " + (data.message || "Inconnue"));
    }
  } catch (err) {
    console.error("❌ Erreur Fetch Connexion :", err);
    alert("❌ Erreur pendant la connexion (fetch)");
  }
}

// 🔄 Toggle Formulaires
function toggleForms() {
  const signUp = document.getElementById("signup-form");
  const signIn = document.getElementById("signin-form");

  if (signUp.style.display === "none") {
    signUp.style.display = "block";
    signIn.style.display = "none";
  } else {
    signUp.style.display = "none";
    signIn.style.display = "block";
  }
}

// ℹ️ Modale Info
function toggleInfo() {
  document.getElementById("infoPanel").style.display = "flex";
}
function closeInfo() {
  document.getElementById("infoPanel").style.display = "none";
}
