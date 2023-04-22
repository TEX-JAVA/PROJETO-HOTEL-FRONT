export async function buscaServicos() {
	const response = await fetch("http://localhost:8080/hoteis/1/servicos", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Erro na solicitação");
	}

	const data = await response.json();
	const servicos = JSON.parse(JSON.stringify(data)).servicos;

	return servicos;
}
