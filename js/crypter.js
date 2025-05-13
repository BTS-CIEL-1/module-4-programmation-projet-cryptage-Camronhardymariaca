function crypter() {
  const message = document.getElementById("message").value;
  const key = parseInt(document.getElementById("key").value);
  if (isNaN(key)) {
    alert("Entrez une clé valide.");
    return;
  }

  let resultat = '';
  for (let i = 0; i < message.length; i++) {
    let code = message.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      code = ((code - 65 + key) % 26) + 65;
    } else if (code >= 97 && code <= 122) {
      code = ((code - 97 + key) % 26) + 97;
    } else {
      resultat += message[i];
      continue;
    }
    resultat += String.fromCharCode(code);
  }

  document.getElementById("resultat").innerText = resultat;
}

// Gestion du panneau info
function toggleInfo() {
  document.getElementById("infoPanel").style.display = "flex";
}

function closeInfo() {
  document.getElementById("infoPanel").style.display = "none";
}
