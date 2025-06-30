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
    document.getElementById("menu-icon").src = "assets/icons/menu.svg";
  } else {
    menu.style.display = "flex";
    document.getElementById("menu-icon").src = "assets/icons/close.svg";
  }
}

// Função que arruma os bugs ao redimensionar a janela
function mudouTamanhoJanela() {
  const itens = document.querySelector(".menu");
  const burger = document.querySelector(".burger");
  if (window.innerWidth >= 990) {
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
      <img src="../assets/icons/leaf.svg" alt="Tema" class="icon">
      <h1>${nomeProjeto}</h1>
    </div>
    <menu>
      <button onclick="menuToggle()" class="menu-button">
        <img src="../assets/icons/menu.svg" alt="Menu" class="icon" id='menu-icon'>
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
          <img src="../assets/icons/increase_font.svg" alt="Aumentar Fonte" class="icon">
        </button>
        <button id="diminuir-fonte" onclick="diminuirFonte()">
          <img src="../assets/icons/decrease_font.svg" alt="Diminuir Fonte" class="icon">
        </button>
        <button id="resetar-fonte" onclick="resetarFonte()">
          <img src="../assets/icons/format_clear.svg" alt="Resetar Fonte" class="icon">
        </button>
      </div>
      <button id="acessibilidade" onclick="acessibilidade()">
        <img src="../assets/icons/accessibility.svg" alt="Acessibilidade" class="icon" />
      </button>
    </div>
    <p>
      &copy; 2025 <br>
      Projeto desenvolvido pelos alunos das turmas 3º A e 3º B do Colégio Adolpho
    </p>
  `;
});
