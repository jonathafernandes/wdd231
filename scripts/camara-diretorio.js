const listaMembros = document.querySelector("#lista-membros");
const statusDiretoria = document.querySelector("#status-diretorio");

const botoesVisualizacao = document.querySelector('.view-switcher');

async function obterDadosMembros() {
    const resposta = await fetch('../camara/data/membros.json');
    const dados = await resposta.json();

    exibirMembros(dados);
}

function exibirMembros(membros) {
    membros.forEach(m => {
        const card = document.createElement('article');
        card.classList.add('member-card');

        const marca = document.createElement('div');
        marca.classList.add('member-brand', m.logoClass);
        marca.setAttribute('aria-hidden', 'true');
        marca.textContent = m.initials;

        const informacoes = document.createElement('div');
        informacoes.classList.add('member-info');

        const categoria = document.createElement('p');
        categoria.classList.add('member-category');
        categoria.textContent = m.category;

        const nivel = document.createElement('p');
        nivel.classList.add('member-level', `level-${m.membershipLevel}`);
        nivel.textContent = {
            gold: 'Membro Gold',
            silver: 'Membro Silver',
            nonprofit: 'Membro sem fins lucrativos'
        }[m.membershipLevel];

        const nome = document.createElement('h3');
        nome.textContent = m.name;

        const descricao = document.createElement('p');
        descricao.classList.add('member-description');
        descricao.textContent = m.description;

        const endereco = document.createElement('address');
        endereco.textContent = m.address;

        const telefone = document.createElement('a');
        telefone.href = `tel:${m.phone}`;
        telefone.textContent = m.phone;

        const site = document.createElement('a');
        site.href = m.website;
        site.target = '_blank';
        site.rel = 'noopener noreferrer';
        site.textContent = m.website.replace(/^https?:\/\//, '');

        informacoes.append(categoria, nivel, nome, descricao, endereco, telefone, site);
        card.append(marca, informacoes);
        listaMembros.appendChild(card);
    });
}

obterDadosMembros()

botoesVisualizacao.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-view]');

    if (!botao) return;

    const visulizacao = botao.dataset.view;

    listaMembros.classList.toggle('is-list', visulizacao === 'list')

    const botaoAtivo = botoesVisualizacao.querySelector('[aria-pressed="true"]');

    botaoAtivo?.setAttribute('aria-pressed', 'false');
    botao.setAttribute('aria-pressed', 'true');
})