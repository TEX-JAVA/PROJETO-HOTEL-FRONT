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

	let servicos = parseInt(localStorage.getItem("totalServicos"));

	let apartamento = parseInt(localStorage.getItem("apartamento"));

	let valorApartamento = JSON.parse(localStorage.getItem("quartos")).find(
		(item) => {
			return item.id === apartamento;
		}
	).preco;

	let pessoas = parseInt(localStorage.getItem("pessoas"));
	total = (valorApartamento + servicos) * diffDias * pessoas;
	localStorage.setItem("total", total);
	document.getElementById("total-reserva").innerHTML = `R$ ${total.toFixed(
		2
	)}`;

	return total;
}

let reservar = document.getElementById("cadastrar");
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
localStorage.setItem("servicosSelecionados", []);
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

reservar.onclick = async () => {
	calculaTotal();
	await cadastrar();
	location.reload();
};

async function cadastrar() {
	let servicosSelecionados = localStorage.getItem("servicosSelecionados");
	let servicos = [];

	if (servicosSelecionados) {
		servicos = JSON.parse(servicosSelecionados);
	}

	console.log({
		idUsuario: JSON.parse(localStorage.getItem("usuario")).id,
		idHotel: 1,
		idQuarto: parseInt(localStorage.getItem("apartamento")),
		qtdPessoas: parseInt(localStorage.getItem("pessoas")),
		dataEntrada: localStorage.getItem("checkin"),
		dataSaida: localStorage.getItem("checkout"),
		total: parseInt(localStorage.getItem("total")),
		servicos: servicos,
	});

	await fetch("http://localhost:8080/reservas", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		body: JSON.stringify({
			idUsuario: JSON.parse(localStorage.getItem("usuario")).id,
			idHotel: 1,
			idQuarto: parseInt(localStorage.getItem("apartamento")),
			qtdPessoas: parseInt(localStorage.getItem("pessoas")),
			dataEntrada: localStorage.getItem("checkin"),
			dataSaida: localStorage.getItem("checkout"),
			total: parseInt(localStorage.getItem("total")),
			servicos: servicos,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			alert(
				`Parabéns ${
					data["usuario"]
				}!!\nReserva agendada com Sucesso!!\nReserva nº: ${
					data["numeroDaReserva"]
				}\nValor: R$ ${data["total"].toFixed(2)}`
			);
		})
		.catch((error) => {
			alert();
		});
}
