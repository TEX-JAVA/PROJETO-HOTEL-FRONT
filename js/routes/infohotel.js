import { buscaQuartos } from "./quartos.js";
import { buscaServicos } from "./servicos.js";
import { validarLogin, formularioLogin, usuarioSalvo } from "./login.js";

const btnSair = document.getElementById("sair");

export async function preencherLocalStorage() {
	const servicos = await buscaServicos();
	localStorage.setItem("servicos", JSON.stringify(servicos));

	const quartos = await buscaQuartos();
	localStorage.setItem("quartos", JSON.stringify(quartos));
}

window.addEventListener("load", () => {
	preencherLocalStorage();
});

formularioLogin.addEventListener("submit", (event) => {
	event.preventDefault();
	validarLogin();
});

if (usuarioSalvo !== null) {
	document.getElementById(
		"visitante"
	).innerHTML = `Olá! ${usuarioSalvo.nome}`;
	document.getElementById("menu-sidebar-visitante").innerHTML =
		usuarioSalvo.nome;
}
