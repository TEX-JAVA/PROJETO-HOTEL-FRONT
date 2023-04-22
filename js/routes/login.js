const formularioLogin = document.querySelector(".form-login");
const email = document.querySelector("#login_email");
const senha = document.querySelector("#login_senha");

document.addEventListener("DOMContentLoaded", function () {
	const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
	if (usuarioSalvo !== null) {
		document.getElementById(
			"visitante"
		).innerHTML = `Olá! ${usuarioSalvo.nome}`;
		document.getElementById("menu-sidebar-visitante").innerHTML =
			usuarioSalvo.nome;
	}
});

function validarLogin() {
	if (!email.value || !senha.value) {
		return alert("Preencha todos os campos");
	}

	fetch(`http://localhost:8080/usuarios/validar-senha`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: email.value,
			senha: senha.value,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			localStorage.setItem("usuario", JSON.stringify(data));
			const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
			document.getElementById(
				"visitante"
			).innerHTML = `Olá! ${usuarioSalvo.nome}`;
			document.getElementById("menu-sidebar-visitante").innerHTML =
				usuarioSalvo.nome;
		})
		.catch((error) => {
			alert(error);
		});
}

formularioLogin.addEventListener("submit", (event) => {
	event.preventDefault();
	validarLogin();
});
