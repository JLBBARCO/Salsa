const nomeProjeto = "Tecnoverde: Cultivando o Futuro";

// Função que mostra ou oculta as opções de acessibilidade
function acessibilidade() {
  var opcoes = document.querySelector(".opcoes-acessibilidade");
  opcoes.style.display = opcoes.style.display === "block" ? "none" : "block";
}

// Função que aplica o tamanho da fonte salvo no localStorage ao carregar a página
function aplicarFonteSalva() {
  var tamanhoSalvo = localStorage.getItem("tamanhoFonte");
  if (tamanhoSalvo) {
    document.querySelector("body").style.fontSize = tamanhoSalvo + "px";
  } else {
    document.querySelector("body").style.fontSize = "1em"; // Define o tamanho padrão caso não haja nada salvo
  }
}

// Função que aumenta a fonte do site
function aumentarFonte() {
  var body = document.querySelector("body");
  var currentSize = window.getComputedStyle(body).fontSize;
  var newSize = parseFloat(currentSize) * 1.2; // Aumenta o tamanho da fonte em 20%
  body.style.fontSize = newSize + "px";
  localStorage.setItem("tamanhoFonte", newSize); // Salva o novo tamanho no localStorage
}

// Função que diminui a fonte do site
function diminuirFonte() {
  var body = document.querySelector("body");
  var currentSize = window.getComputedStyle(body).fontSize;
  var newSize = parseFloat(currentSize) * 0.8; // Diminui o tamanho da fonte em 20%
  body.style.fontSize = newSize + "px";
  localStorage.setItem("tamanhoFonte", newSize); // Salva o novo tamanho no localStorage
}

function resetarFonte() {
  var body = document.querySelector("body");
  body.style.fontSize = "1em"; // Define o tamanho padrão da fonte
  localStorage.removeItem("tamanhoFonte"); // Remove o tamanho salvo no localStorage
}

// Aplica o tamanho da fonte salvo ao carregar a página
document.addEventListener("DOMContentLoaded", aplicarFonteSalva);

// Função que mostra ou oculta o menu do site
function menuToggle() {
  var menu = document.querySelector(".menu");
  if (menu.style.display === "flex") {
    menu.style.display = "none";
    document.querySelector("span.burger").innerHTML = "menu";
  } else {
    menu.style.display = "flex";
    document.querySelector("span.burger").innerHTML = "close";
  }
}

// Função que arruma os bugs ao redimensionar a janela
function mudouTamanhoJanela() {
  const itens = document.querySelector(".menu");
  const burger = document.querySelector(".burger");
  if (window.innerWidth >= 768) {
    itens.style.display = "flex";
  } else {
    itens.style.display = "none";
    burger.innerHTML = "menu";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Sistema de Compartilhamento
  const shareBtn = document.getElementById("share");
  if (shareBtn) {
    shareBtn.addEventListener("click", async function (e) {
      e.preventDefault();
      // Tenta compartilhar o arquivo PNG
      if (navigator.canShare && window.fetch) {
        try {
          const response = await fetch(shareBtn.href);
          const blob = await response.blob();
          const file = new File([blob], "qrcode.png", { type: "image/png" });

          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: "QR Code",
              text: "Veja este QR Code!",
            });
            return; // Sucesso ao compartilhar o arquivo, não faz mais nada
          }
        } catch (err) {
          // Se falhar, cai para o fallback abaixo
        }
      }
      // Fallback: compartilha o link
      if (navigator.share) {
        navigator
          .share({
            title: "QR Code",
            text: "Veja este QR Code!",
            url: shareBtn.href,
          })
          .catch(() => {
            // Usuário cancelou ou não compartilhou
          });
      } else {
        alert("O compartilhamento não é suportado neste navegador.");
      }
    });
  }

  // Adiciona a barra de navegação ao topo da página
  const navBar = document.querySelector("nav");
  // Obtém o nome do arquivo atual
  const currentPage = window.location.pathname.split("/").pop();

  // Lista de links do menu
  const links = [
    { href: "index.html", label: "Início" },
    { href: "sobre.html", label: "Sobre" },
    { href: "curiosidades.html", label: "Curiosidades" },
    { href: "materiais.html", label: "Materiais" },
    { href: "passo_a_passo.html", label: "Passo a Passo" },
    { href: "cuidados.html", label: "Cuidados" },
    { href: "galeria.html", label: "Galeria" },
    { href: "colaboradores.html", label: "Colaboradores" },
  ];

  // Gera os links com a classe active no link da página atual
  const menuLinks = links
    .map(
      (link) =>
        `<a href="${link.href}"${
          link.href === currentPage ? ' class="active"' : ""
        }>${link.label}</a>`
    )
    .join("");

  navBar.innerHTML = `
    <div class="tema">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-leaf h-6 w-6 text-white" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
      <h1>${nomeProjeto}</h1>
    </div>
    <menu>
      <button onclick="menuToggle()" class="menu-button">
        <span class="material-symbols-outlined burger"> menu </span>
      </button>
      <div class="menu">
        ${menuLinks}
      </div>
    </menu>
  `;

  // Adiciona o rodapé à todas as páginas
  const footer = document.querySelector("footer");
  footer.innerHTML = `
    <div class="acessibilidade">
      <div class="opcoes-acessibilidade">
        <button id="aumentar-fonte" onclick="aumentarFonte()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        </button>
        <button id="diminuir-fonte" onclick="diminuirFonte()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-440v-80h560v80H200Z"/></svg>
        </button>
        <button id="resetar-fonte" onclick="resetarFonte()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"/></svg>
        </button>
      </div>
      <button id="acessibilidade" onclick="acessibilidade()">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-720q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720ZM360-80v-520q-60-5-122-15t-118-25l20-80q78 21 166 30.5t174 9.5q86 0 174-9.5T820-720l20 80q-56 15-118 25t-122 15v520h-80v-240h-80v240h-80Z"/></svg>
      </button>
    </div>
    <p>
      &copy; 2025 <br>
      Projeto desenvolvido pelos alunos das turmas 3º A e 3º B do Colégio Adolpho
    </p>
  `;
});
