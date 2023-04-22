export async function buscaQuartos() {
	const response = await fetch("http://localhost:8080/hoteis/1/quartos", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Erro na solicitação");
	}

	const data = await response.json();
	const quartos = JSON.parse(JSON.stringify(data)).quartos;

	return quartos;
}
