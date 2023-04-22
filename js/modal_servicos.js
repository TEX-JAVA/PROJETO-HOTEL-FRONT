const servicos = JSON.parse(localStorage.getItem("servicos"));

function servicosSelecionados() {
	let selecionados = [];
	let servicos = document.getElementsByName("servicos");

	servicos.forEach((i) => {
		if (i.checked) {
			servico = JSON.parse(i.getAttribute("value"));
			selecionados.push(servico);
		}
	});

	localStorage.setItem("servicosSelecionados", JSON.stringify(selecionados));
	let total = selecionados.reduce((acc, servico) => acc + servico.preco, 0);
	localStorage.setItem("totalServicos", total);
	return total;
}

document.querySelector(".a-servicos").onclick = () => {
	let modal_servicos = document.querySelector(".servicos-modal");

	if (modal_servicos == null) {
		let modal = document.querySelector("#modal-davi");

		servicos.forEach((serv, i) => {
			let formModalServicos = document.createElement("form");
			formModalServicos.setAttribute("method", "POST");
			formModalServicos.setAttribute("class", "servicos-modal");

			if (i == 0) {
				modal.appendChild(formModalServicos);
				let titulo = document.createElement("h1");
				titulo.innerText = "Serviços";
				formModalServicos.appendChild(titulo);
			}

			let servDiv = document.createElement("div");
			servDiv.setAttribute("class", `item-${serv}`);

			let servInput = document.createElement("input");
			servInput.setAttribute("type", "checkbox");
			servInput.setAttribute("id", serv.id);
			servInput.setAttribute("name", "servicos");
			servInput.setAttribute(
				"value",
				JSON.stringify({
					id: serv.id,
					nome: serv.nome,
					preco: serv.preco,
				})
			);

			let servLabel = document.createElement("label");
			servLabel.setAttribute("for", serv.nome);
			servLabel.innerText =
				serv.nome.charAt(0).toUpperCase() +
				serv.nome.slice(1) +
				` R$${serv.preco.toFixed(2)}`;

			formModalServicos = document.querySelector(".servicos-modal");
			formModalServicos.appendChild(servDiv);
			servDiv.appendChild(servInput);
			servDiv.appendChild(servLabel);

			servInput.onclick = () => {
				document.querySelector(
					".itens-total"
				).innerText = `Pessoas: ${localStorage.getItem(
					"pessoas"
				)}\nR$ ${(
					servicosSelecionados() * localStorage.getItem("pessoas")
				).toFixed(2)}`;
			};

			if (i + 1 == Object.keys(servicos).length) {
				let divControladora = document.createElement("div");
				divControladora.setAttribute("class", "controladora-servicos");
				let button = document.createElement("button");
				button.setAttribute("type", "button");
				button.setAttribute("class", "servicos_button");
				button.setAttribute("value", "salvar");
				button.innerText = "Salvar";
				button.onclick = () => {
					formModalServicos.style = "display:none";
				};

				formModalServicos.appendChild(divControladora);
				divControladora.appendChild(button);

				let total = document.createElement("label");
				total.setAttribute("class", "itens-total");
				total.innerText = `Pessoas: ${localStorage.getItem(
					"pessoas"
				)}\nR$ 0,00`;
				divControladora.appendChild(total);
			}
		});
	}
	modal_servicos = document.querySelector(".servicos-modal");
	modal_servicos.style = "display:block";
};
