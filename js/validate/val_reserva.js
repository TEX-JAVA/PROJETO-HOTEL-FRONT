function formatarData(data, qtd) {
	let dataFormatada = new Date(data);
	dataFormatada.setDate(
		dataFormatada.getDate() + (dataFormatada.getHours() >= 14 ? 1 : 0)
	);
	dataFormatada.setDate(dataFormatada.getDate() + (qtd != 0 ? qtd : 0));
	return `${dataFormatada.getFullYear()}-${String(
		dataFormatada.getMonth() + 1
	).padStart(2, 0)}-${String(dataFormatada.getDate()).padStart(2, 0)}`;
}

function calculaTotal() {
	let total = 0;
	let checkin = new Date(localStorage.getItem("checkin"));
	let checkout = new Date(localStorage.getItem("checkout"));
	const umDia = 24 * 60 * 60 * 1000;
	const diffDias = Math.round(Math.abs((checkout - checkin) / umDia));

	let servicos = parseInt(localStorage.getItem("total"));

	let apartamento = parseInt(localStorage.getItem("apartamento"));

	let valorApartamento = JSON.parse(localStorage.getItem("quartos")).find(
		(item) => {
			return item.id === apartamento;
		}
	).preco;

	let pessoas = parseInt(localStorage.getItem("pessoas"));
	total = (valorApartamento + servicos) * diffDias * pessoas;
	localStorage.setItem("total", total);
	return total;
}

let selectApartamento = document.getElementById("apartamento");
let qtd_pessoas = document.getElementById("n-adultos");
let inputCheckin = document.getElementById("checkin-data");
let inputCheckout = document.getElementById("checkout-data");
let totalReserva = document.getElementById("calcular-btn");
let data_atual = new Date();

localStorage.setItem("apartamento", 1);
localStorage.setItem("pessoas", 1);
localStorage.setItem("checkin", formatarData(data_atual, 0));
localStorage.setItem("checkout", "");
localStorage.setItem("servicos", "");
localStorage.setItem("total", 0);

inputCheckin.setAttribute("min", localStorage.getItem("checkin"));
inputCheckin.onchange = () => {
	inputCheckout.value = "";
	localStorage.setItem("checkin", inputCheckin.value);
};

inputCheckout.onclick = () => {
	inputCheckin.value == ""
		? alert("Selecione uma data de Checkin")
		: inputCheckout.setAttribute(
				"min",
				formatarData(localStorage.getItem("checkin"), 1)
		  );
};

inputCheckout.onchange = () => {
	localStorage.setItem("checkout", inputCheckout.value);
};

qtd_pessoas.onchange = () => {
	localStorage.setItem("pessoas", qtd_pessoas.value);
};

selectApartamento.onchange = () => {
	localStorage.setItem("apartamento", selectApartamento.value);
};

totalReserva.onclick = () => {
	document.getElementById(
		"total-reserva"
	).innerHTML = `R$ ${calculaTotal().toFixed(2)}`;
};
