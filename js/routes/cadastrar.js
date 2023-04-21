const formulario = document.querySelector('.form-registe');
const Inome = document.querySelector('.name-registe');
const Iemail = document.querySelector('.email-registe');
const Isenha = document.querySelector('.password-registe');

function cadastrar() {
    fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: Inome.value,
            email: Iemail.value,
            senha: Isenha.value,
            classeUsuarioId: 2,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            alert(
                "Nome: " +
                data["nome"] +
                "\nE-mail: " +
                data["email"] +
                "\nCadastrado com Sucesso!!"
            );
        })
        .catch((error) => {
            alert(error);
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
