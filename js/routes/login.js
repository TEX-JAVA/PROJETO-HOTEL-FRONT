import { preencherLocalStorage } from "./infohotel.js";

export const formularioLogin = document.querySelector(".form-login");
export let usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
const email = document.querySelector("#login_email");
const senha = document.querySelector("#login_senha");
const btnSair = document.getElementById("sair");

export async function validarLogin() {
	if (!email.value || !senha.value) {
		return alert("Preencha todos os campos");
	}

	try {
		const response = await fetch(
			`http://localhost:8080/usuarios/validar-senha`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email.value,
					senha: senha.value,
				}),
			}
		);

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem("usuario", JSON.stringify(data));
			usuarioSalvo = data;
			atualizarInterfaceUsuario(usuarioSalvo);
		} else {
			throw new Error(`E-mail ou Senha incorretos.`);
		}
	} catch (error) {
		alert(error);
	}
}

function atualizarInterfaceUsuario(usuario) {
	document.getElementById("visitante").innerHTML = `Olá! ${usuario.nome}`;
	document.getElementById("menu-sidebar-visitante").innerHTML = usuario.nome;
	preencherLocalStorage();
	location.reload();
}

btnSair.onclick = () => {
	localStorage.clear("usuario");
	document.getElementById("visitante").innerHTML = `Olá, Visitante!`;
	document.getElementById("menu-sidebar-visitante").innerHTML = "Login";
	location.reload();
};
