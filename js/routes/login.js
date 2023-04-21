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
        .then((response) => response.json())
        .then((data) => {
            alert(
                data["nome"] +
                `\n Seja bem-vindo ${data["nome"]}`
            );
        })
        .catch((error) => {
            alert(error);
        });
}

login.addEventListener('submit', (event) => {
    event.defaultPrevented();
    validadeLogin();
})