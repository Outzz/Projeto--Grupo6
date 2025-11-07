// Função para simular o pagamento
function payNow() {
    alert("Pagamento realizado com sucesso! Obrigado por escolher a Renova.");
    document.getElementById("payNowBtn").disabled = true; // Desativa o botão após o pagamento
    document.getElementById("payNowBtn").innerText = "Pagamento Concluído"; // Altera o texto do botão
}

// Função para navegação do menu
function navigateTo(section) {
    // Pode ser expandido para carregar diferentes conteúdos conforme a navegação
    alert(`Você foi direcionado para a seção: ${section}`);
    // Exemplo de como mudar o título da página conforme a seção
    document.querySelector('.dashboard-title').innerText = `Você está em ${capitalizeFirstLetter(section)}`;
}

// Função para redirecionar para a página de pagamento
function redirectToPayment() {
    window.location.href = 'pagamentoo.html?plano=musculacao&valor=199';
}
