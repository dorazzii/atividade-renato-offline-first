
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(erro => console.error("Erro no SW:", erro));
}


function atualizarStatus() {
  const status = document.querySelector("#status");
  if (navigator.onLine) {
    status.textContent = "Online";
    status.className = "online";
  } else {
    status.textContent = "Offline";
    status.className = "offline";
  }
}

window.addEventListener("online", atualizarStatus);
window.addEventListener("offline", atualizarStatus);
atualizarStatus();


function carregarCompromissos() {
  const area = document.querySelector("#compromissos") || document.querySelector("#conteudo");
  fetch("./dados.json")
    .then(resposta => resposta.json())
    .then(lista => {
      area.innerHTML = lista
        .map(c => `<p>${c.hora} — ${c.titulo}</p>`)
        .join("");
    })
    .catch(() => {
      area.innerHTML = "<p>Sem conexão. Tente mais tarde.</p>";
    });
}

carregarCompromissos();
