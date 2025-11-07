// app.js

// Função de verificação simples para simular um usuário logado
document.addEventListener("DOMContentLoaded", function () {
    const isAdmin = true; // Substitua com sua lógica de autenticação real

    // Verifica se o usuário é admin e exibe o link de admin
    if (isAdmin) {
        document.querySelectorAll('.admin-only').forEach(link => {
            link.style.display = 'block';  // Torna visível o link do admin
        });
    } else {
        document.querySelectorAll('.admin-only').forEach(link => {
            link.style.display = 'none';  // Esconde o link do admin
        });
    }
});
