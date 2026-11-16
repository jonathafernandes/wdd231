const tempoAtual = document.querySelector('#current-temp');
const icone = document.querySelector('#weather-icon');
const legenda = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=b16e1490950298e1a4637b50b8bf77e1';

async function apiFetch() {
    try {
        const resposta = await fetch(url);

        if (resposta.ok) {
            const dados = await resposta.json();
            mostrarResultados(dados);
        } else {
            throw new Error(await resposta.text());
        }
    } catch (erro) {
        console.error(erro);
    }
}

function mostrarResultados(dados) {
    const temperatura = dados.main.temp;
    const descricao = dados.weather[0].description;
    const codigoIcone = dados.weather[0].icon;
    const enderecoIcone = `https://openweathermap.org/img/wn/${codigoIcone}@2x.png`;

    tempoAtual.textContent = `${temperatura.toFixed(1)} °C`;
    icone.setAttribute('src', enderecoIcone);
    icone.setAttribute('alt', descricao);
    legenda.textContent = descricao;
}

apiFetch();
