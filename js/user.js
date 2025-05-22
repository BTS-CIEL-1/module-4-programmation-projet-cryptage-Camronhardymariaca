console.log("✅ user.js chargé");

window.addEventListener("DOMContentLoaded", () => {
  const statusDiv = document.getElementById("status");

  const isLoggedIn = localStorage.getItem("loggedIn");
  const userEmail = localStorage.getItem("userEmail");

  if (isLoggedIn === "true") {
    statusDiv.innerText = `👤 Connecté en tant que ${userEmail}`;
  } else {
    statusDiv.innerText = "⚠️ Vous n'êtes pas connecté.";
    // Tu peux rediriger :
    // window.location.href = "/html/auth.html";
  }
});
