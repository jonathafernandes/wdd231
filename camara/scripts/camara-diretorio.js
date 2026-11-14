const listaMembros = document.querySelector("#lista-membros");
const statusDiretoria = document.querySelector("#status-diretorio");

const botoesVisualizacao = document.querySelector('.view-switcher');

async function obterDadosMembros() {
    const resposta = await fetch('./dados/membros.json');

    if (!resposta.ok) {
        throw new Error(`Não foi possível carregar os membros: ${resposta.status}`);
    }

    const dados = await resposta.json();

    exibirMembros(dados);
    statusDiretoria.textContent = `${dados.length} membros carregados.`;
}

function exibirMembros(membros) {
    listaMembros.replaceChildren();

    membros.forEach(m => {
        const card = document.createElement('article');
        card.classList.add('member-card');

        const imagem = document.createElement('img');
        imagem.classList.add('member-logo');
        imagem.src = `./imagens/${m.image}`;
        imagem.alt = `Logotipo da ${m.name}`;
        imagem.width = 320;
        imagem.height = 180;
        imagem.loading = 'lazy';

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
        card.append(imagem, informacoes);
        listaMembros.appendChild(card);
    });
}

obterDadosMembros().catch((erro) => {
    console.error(erro);
    statusDiretoria.classList.remove('visually-hidden');
    statusDiretoria.textContent = 'Não foi possível carregar o diretório de membros.';
});

botoesVisualizacao.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-view]');

    if (!botao) return;

    const visualizacao = botao.dataset.view;

    listaMembros.classList.toggle('is-list', visualizacao === 'list');

    const botaoAtivo = botoesVisualizacao.querySelector('[aria-pressed="true"]');

    botaoAtivo?.setAttribute('aria-pressed', 'false');
    botao.setAttribute('aria-pressed', 'true');
});
