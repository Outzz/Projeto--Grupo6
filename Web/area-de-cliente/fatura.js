document.addEventListener("DOMContentLoaded", () => {
  const pagarBtn = document.querySelector(".btn.pagar");
  const recibo = document.getElementById("recibo");
  const reciboData = document.getElementById("recibo-data");
  const fecharBtn = document.getElementById("fechar-recibo");

  pagarBtn.addEventListener("click", () => {
    const hoje = new Date();
    reciboData.textContent = hoje.toLocaleDateString("pt-BR");
    recibo.classList.remove("hidden");

    pagarBtn.disabled = true;
    pagarBtn.textContent = "Pago ✅";
    pagarBtn.style.background = "#4caf50";
    const status = document.querySelector(".status.pendente");
    status.textContent = "Pago";
    status.style.background = "rgba(76, 175, 80, 0.3)";
    status.style.color = "#4caf50";
  });

  fecharBtn.addEventListener("click", () => {
    recibo.classList.add("hidden");
  });
});
