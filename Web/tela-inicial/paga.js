// Captura dados da URL (ex: pagamento.html?plano=Musculação&valor=150)
const params = new URLSearchParams(window.location.search);
const plano = params.get("plano") || "Plano";
const valor = params.get("valor") || "0,00";

// Exibe o valor e o nome do plano
document.getElementById("valor").value = `R$ ${valor}`;
document.querySelector(".pagamento h1").textContent = `Pagamento - ${plano}`;


// Confirmação do pagamento
const form = document.getElementById("form-pagamento");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const cpf = document.getElementById("cpf").value;
  const formaEscolhida = forma.options[forma.selectedIndex].text;
  const recibo = document.getElementById("recibo");

  // Animação de saída do formulário
  form.style.animation = "fadeOut 0.5s ease forwards";

  setTimeout(() => {
    form.classList.add("esconder");
    recibo.classList.remove("esconder");
    recibo.classList.add("fade-in");

    document.getElementById("recibo-cpf").textContent = cpf;
    document.getElementById("recibo-forma").textContent = formaEscolhida;
    document.getElementById("recibo-valor").textContent = `R$ ${valor}`;
  }, 500);
});

// Animação fadeOut
const style = document.createElement("style");
style.textContent = `
@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
}`;
document.head.appendChild(paga);
