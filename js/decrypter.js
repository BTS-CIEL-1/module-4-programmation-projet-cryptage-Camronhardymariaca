function decrypter() {
  const message = document.getElementById("message").value;
  const key = parseInt(document.getElementById("key").value);
  if (isNaN(key)) return alert("Entrez une clé valide.");

  let resultat = '';
  for (let i = 0; i < message.length; i++) {
    let code = message.charCodeAt(i);
    if (code >= 65 && code <= 90) code = ((code - 65 - key + 26) % 26) + 65;
    else if (code >= 97 && code <= 122) code = ((code - 97 - key + 26) % 26) + 97;
    else {
      resultat += message[i];
      continue;
    }
    resultat += String.fromCharCode(code);
  }

  document.getElementById("resultat").innerText = resultat;
}

function convertToBase64() {
  const file = document.getElementById('imageInput').files[0];
  if (!file) return alert("Sélectionne une image.");
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById('base64Output').value = reader.result;
  };
  reader.readAsDataURL(file);
}

function afficherImage() {
  const data = document.getElementById('base64Output').value;
  if (!data.startsWith("data:image")) return alert("Code base64 invalide.");
  document.getElementById('imageAffichee').src = data;
}

function afficherNomFichier() {
  const input = document.getElementById("imageInput");
  const label = document.getElementById("nomFichier");
  label.textContent = input.files.length > 0 ? input.files[0].name : "Aucun fichier choisi";
}

function toggleInfo() {
  document.getElementById("infoPanel").style.display = "flex";
}

function closeInfo() {
  document.getElementById("infoPanel").style.display = "none";
}
