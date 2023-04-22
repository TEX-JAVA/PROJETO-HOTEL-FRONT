const formulario = document.querySelector(".form-register");
let iNome = document.querySelector(".name-register");
let iEmail = document.querySelector(".email-register");
let iSenha = document.querySelector(".password-register");

function cadastrar() {
	let nomeCompleto = iNome.value;
	let nomeFormatado;
	if (nomeCompleto.indexOf(" ") === -1) {
		nomeFormatado = nomeCompleto;
	} else {
		nomeFormatado = nomeCompleto.split(" ")[0];
	}
	nomeFormatado =
		nomeFormatado.charAt(0).toUpperCase() + nomeFormatado.slice(1);
	iEmail = iEmail.value.toLowerCase();
	iSenha = iSenha.value.toString();

	fetch("http://localhost:8080/usuarios", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			nome: nomeFormatado,
			email: iEmail,
			senha: iSenha,
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
	iNome.value = "";
	iEmail.value = "";
	iSenha.value = "";
}

formulario.addEventListener("submit", function (event) {
	event.preventDefault();
	cadastrar();
	limpar();
});
