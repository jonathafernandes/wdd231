const anoAtual = document.querySelector('#anoAtual')
const ultimaModificacao = document.querySelector('#ultimaModificacao')

function exibeAnoAtual() {
    dataAtual = new Date()
    ano = dataAtual.getFullYear()

    anoAtual.innerHTML = ano
}

function exibeUltimaModficicao() {
    data = new Date(document.lastModified)
    dataFormatada = data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    ultimaModificacao.textContent = dataFormatada

    if (ultimaModificacao.tagName === 'TIME') {
        ultimaModificacao.setAttribute('datetime', data.toISOString())
    }
}

exibeAnoAtual()
exibeUltimaModficicao()
