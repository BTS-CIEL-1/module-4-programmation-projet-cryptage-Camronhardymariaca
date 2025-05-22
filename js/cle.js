// AES (clé symétrique)
function crypterAES() {
  const message = document.getElementById("messageAES").value;
  const key = document.getElementById("keyAES").value;
  if (!message || !key) return alert("Remplis le message et la clé !");
  const encrypted = CryptoJS.AES.encrypt(message, key).toString();
  document.getElementById("resultAES").innerText = encrypted;
}

function decrypterAES() {
  const message = document.getElementById("messageAES").value;
  const key = document.getElementById("keyAES").value;
  if (!message || !key) return alert("Remplis le message et la clé !");
  try {
    const decrypted = CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);
    document.getElementById("resultAES").innerText = decrypted || "(clé incorrecte)";
  } catch (e) {
    document.getElementById("resultAES").innerText = "Erreur lors du décryptage";
  }
}

// RSA simplifié (clé asymétrique)
let rsa = {
  publicKey: null,
  privateKey: null,
};

function genererCle() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  rsa.publicKey = [...Array(16)].map(() => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
  rsa.privateKey = [...Array(16)].map(() => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
  document.getElementById("clePublique").value = rsa.publicKey;
  document.getElementById("clePrivee").value = rsa.privateKey;
}

function chiffrerRSA() {
  const message = document.getElementById("rsaMessage").value;
  const pubKey = document.getElementById("clePublique").value;
  if (!message || !pubKey) return alert("Remplis le message et la clé publique !");
  const encoded = btoa(pubKey + ":" + message);
  document.getElementById("resultRSA").innerText = encoded;
}

function dechiffrerRSA() {
  const encoded = document.getElementById("rsaMessage").value;
  const privKey = document.getElementById("clePrivee").value;
  if (!encoded || !privKey) return alert("Remplis le message et la clé privée !");
  try {
    const decoded = atob(encoded);
    const parts = decoded.split(":");
    if (parts.length < 2) return alert("Format de message invalide.");
    const result = parts.slice(1).join(":"); // Retire la clé publique
    document.getElementById("resultRSA").innerText = result;
  } catch (e) {
    document.getElementById("resultRSA").innerText = "Erreur de décryptage.";
  }
}

// Téléchargement
function telechargerFichier(elementId, nomFichier) {
  const texte = document.getElementById(elementId).innerText;
  if (!texte || texte === "..." || texte === "Aucun résultat") {
    return alert("Aucun texte à sauvegarder !");
  }

  const blob = new Blob([texte], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const lien = document.createElement("a");
  lien.href = url;
  lien.download = nomFichier;
  document.body.appendChild(lien);
  lien.click();
  document.body.removeChild(lien);
  URL.revokeObjectURL(url);
}

// Envoi par mail de la clé AES
function envoyerCleParMail() {
  const key = document.getElementById("keyAES").value;
  if (!key) {
    alert("Merci de saisir une clé pour l'envoyer.");
    return;
  }
  const subject = encodeURIComponent("Clé secrète AES");
  const body = encodeURIComponent(`Voici la clé secrète AES : ${key}`);
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`, "_blank");
}

// Envoi par mail de la clé RSA (publique + privée)
function envoyerCleRSAMail() {
  const pubKey = document.getElementById("clePublique").value;
  const privKey = document.getElementById("clePrivee").value;
  if (!pubKey || !privKey) {
    alert("Merci de générer les clés avant d'envoyer.");
    return;
  }
  const subject = encodeURIComponent("Clés RSA publique et privée");
  const body = encodeURIComponent(`Clé publique : ${pubKey}\nClé privée : ${privKey}`);
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`, "_blank");
}

// Modale info
function toggleInfo() {
  document.getElementById("infoPanel").style.display = "flex";
}

function closeInfo() {
  document.getElementById("infoPanel").style.display = "none";
}
