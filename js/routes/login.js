const email = document.querySelector('#login_email');
const senha = document.querySelector('#login_senha');
const login = document.querySelector('#login');

function validadeLogin() {
    fetch(`http://localhost:8080/usuarios/${email.value}/validar-senha`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            senha: senha.value
        }) // Converte os dados para JSON e envia no corpo da requisição
    })
        .then(response => {
            if (response.ok) {
                const name = email.split('@')
                // Se a resposta foi bem sucedida, manipula os dados recebidos
                alert(`Seja bem-vindo ${name[0]}`);
            } else {
                // Se a resposta foi mal sucedida, lança um erro
                throw new Error("Usuário não localizado");
            }
        })
        .catch(error => {
            // Trata os erros
            console.error(error);
        });
}

login.addEventListener('submit', (event) => {
    event.defaultPrevented();
    validadeLogin();
})