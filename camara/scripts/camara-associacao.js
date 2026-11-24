const timestamp = document.querySelector("#timestamp");
const linksModal = document.querySelectorAll('[data-modal]');
const botoesFechar = document.querySelectorAll('[data-close-modal]');
const local = window.location.search;
const infos = new URLSearchParams(local);

const campos = {
    nome: '#confirmacao-nome',
    sobrenome: '#confirmacao-sobrenome',
    email: '#confirmacao-email',
    celular: '#confirmacao-celular',
    organizacao: '#confirmacao-organizacao',
    timestamp: '#confirmacao-timestamp'
};

if (timestamp) {
    timestamp.value = new Date().toISOString();
}

linksModal.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const idModal = link.dataset.modal;
        const modal = document.querySelector(`#${idModal}`);

        modal.showModal();
    })
})

botoesFechar.forEach(botao => {
    botao.addEventListener("click", () => {
        const modal = botao.closest('dialog');

        modal.close();
    })
})

for (const parametro in campos) {
    const seletor = campos[parametro];
    const elemento = document.querySelector(seletor);
    let valor = infos.get(parametro) || 'Não informado';

    if (parametro === 'timestamp' && valor !== 'Não informado') {
        const data = new Date(valor);

        valor = Number.isNaN(data.getTime())
            ? 'Não informado'
            : data.toLocaleString('pt-BR');
    }

    if (elemento) {
        elemento.textContent = valor;
    }
};
