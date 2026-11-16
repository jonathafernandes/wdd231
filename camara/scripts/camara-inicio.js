const temperaturaAtual = document.querySelector('#temperatura-atual');
const descricao = document.querySelector('#descricao-clima');
const previsaoClima = document.querySelector('#previsao-clima');
const destaquesMembros = document.querySelector('#destaques-membros');

const urlTemperatura = 'https://api.openweathermap.org/data/2.5/weather?lat=-9.6658&lon=-35.7353&units=metric&lang=pt_br&appid=b16e1490950298e1a4637b50b8bf77e1';
const urlPrevisao =
    'https://api.openweathermap.org/data/2.5/forecast' +
    '?lat=-9.6658' +
    '&lon=-35.7353' +
    '&units=metric' +
    '&lang=pt_br' +
    '&appid=b16e1490950298e1a4637b50b8bf77e1';

async function buscaTemperatura() {
    try {
        const resposta = await fetch(urlTemperatura);

        if (resposta.ok) {
            const dados = await resposta.json();
            exibirTemperatura(dados);
        } else {
            throw new Error(await resposta.text());
        }
    } catch (erro) {
        console.log(erro)
    }
}

async function buscaPrevisao() {
    try {
        const resposta = await fetch(urlPrevisao);

        if (resposta.ok) {
            const dados = await resposta.json();
            const previsaoTresDias = dados.list.filter(item => item.dt_txt.includes('15:00:00'))
                .slice(0, 3);

            exibirPrevisao(previsaoTresDias);
        } else {
            throw new Error(await resposta.text());
        }
    } catch (erro) {
        console.log(erro)
    }
}

async function buscarMembros() {
    try {
        const resposta = await fetch('./dados/membros.json');

        if (!resposta.ok) {
            throw new Error(`Não foi possível carregar os membros: ${resposta.status}`);
        }

        const dados = await resposta.json();
        const membrosDestaque = dados
            .filter(membro => ['gold', 'silver'].includes(membro.membershipLevel))
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        exibirMembros(membrosDestaque)
    } catch (erro) {
        console.log(erro)
    }
}

function exibirTemperatura(temperatura) {
    temperaturaAtual.textContent = `${temperatura.main.temp.toFixed(1)} °C`;
    descricao.textContent = `${temperatura.weather[0].description}`;
}

function exibirPrevisao(previsoes) {
    previsoes.forEach(previsao => {
        const item = document.createElement('div');
        item.classList.add('forecast-item');

        const data = new Date(previsao.dt * 1000);

        const dia = document.createElement('span');
        dia.textContent = data.toLocaleDateString('pt-BR', {
            weekday: 'short'
        });

        const temperatura = document.createElement('strong');
        temperatura.textContent =
            `${previsao.main.temp.toFixed(1)} °C`;

        item.append(dia, temperatura);
        previsaoClima.appendChild(item);
    });
}

function exibirMembros(membros) {
    membros.forEach(membro => {
        const card = document.createElement('article');
        card.classList.add('member-card');

        const imagem = document.createElement('img');
        imagem.classList.add('member-logo');
        imagem.src = `./imagens/${membro.image}`;
        imagem.alt = `Logotipo da ${membro.name}`;
        imagem.width = 320;
        imagem.height = 180;
        imagem.loading = 'lazy';

        const informacoes = document.createElement('div');
        informacoes.classList.add('member-info');

        const nivel = document.createElement('p');
        nivel.classList.add('member-level', `level-${membro.membershipLevel}`);
        nivel.textContent = {
            gold: 'Membro Gold',
            silver: 'Membro Silver',
            nonprofit: 'Membro sem fins lucrativos'
        }[membro.membershipLevel] ?? 'Membro';

        const nome = document.createElement('h3');
        nome.textContent = membro.name;

        const endereco = document.createElement('address');
        endereco.textContent = membro.address;

        const telefone = document.createElement('a');
        telefone.href = `tel:${membro.phone}`;
        telefone.textContent = membro.phone;

        const site = document.createElement('a');
        site.href = membro.website;
        site.target = '_blank';
        site.rel = 'noopener noreferrer';
        site.textContent = membro.website.replace(/^https?:\/\//, '');

        informacoes.append(nivel, nome, endereco, telefone, site);
        card.append(imagem, informacoes);
        destaquesMembros.appendChild(card);
    });
}

buscaTemperatura();
buscaPrevisao();
buscarMembros();



