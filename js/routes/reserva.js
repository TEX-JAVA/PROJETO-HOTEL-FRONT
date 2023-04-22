function cadastrar() {
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

	fetch("http://localhost:8080/reservas", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
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
		.then((data) => {})
		.catch((error) => {
			alert(error);
		});
}
