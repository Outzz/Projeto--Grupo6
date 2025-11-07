// Exemplo básico de alertas de envio de formulário
document.getElementById('formContato')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
});

document.getElementById('formLogin')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login realizado com sucesso!');
});

document.getElementById('formRegistro')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Registro realizado com sucesso!');
});
