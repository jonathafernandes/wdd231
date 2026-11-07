const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';

const cartoes = document.querySelector('#cartoes');

async function obterDadosDeProfetas() {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    exibirProfetas(dados.profetas)
}

const exibirProfetas = (profetas) => {
    profetas.forEach(p => {
        let cartao = document.createElement('section')
        let nome = document.createElement('h2')
        let foto = document.createElement('img')
        let nascimento = document.createElement('span')
        let morte = document.createElement('span')

        nome.textContent = `${p.nome} ${p.sobrenome}`;
        foto.setAttribute('src', p.urlImagem)
        foto.setAttribute('alt', p.nome)
        foto.setAttribute('loading', 'lazy');
        foto.setAttribute('width', '340');
        foto.setAttribute('height', '440');
        nascimento.textContent = `Nascimento: ${p.nascimento}`
        morte.textContent = p.morte ? `Morte: ${new Date(p.morte).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}` : 'Vivo';

        cartao.appendChild(nome)
        cartao.appendChild(foto)
        cartao.appendChild(nascimento)
        cartao.appendChild(morte)

        cartoes.appendChild(cartao)
    });
}

obterDadosDeProfetas()