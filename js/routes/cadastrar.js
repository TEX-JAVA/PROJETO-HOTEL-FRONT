const formulario = document.querySelector('.form-registe');
const Inome = document.querySelector('.name-registe');
const Iemail = document.querySelector('.email-registe');
const Isenha = document.querySelector('.password-registe');

function cadastrar() {
    fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: Inome.value,
            email: Iemail.value,
            senha: Isenha.value,
            classeUsuarioId: 2
        }) // Converte os dados para JSON e envia no corpo da requisição
    })
        .then(response => {
            if (response.ok) {
                // Se a resposta foi bem sucedida, manipula os dados recebidos
                alert("Usuário criado com sucesso!");
            } else {
                // Se a resposta foi mal sucedida, lança um erro
                throw new Error("Não foi possível criar o usuário.");
            }
        })
        .catch(error => {
            // Trata os erros
            console.error(error);
        });
}

function limpar() {
    Inome.value = "";
    Iemail.value = "";
    Isenha.value = "";

}

formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastrar();
    limpar();
})
