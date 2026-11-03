const botaoMenu = document.querySelector('#menu')
const navegacao = document.querySelector('#navegacao-principal')

botaoMenu.addEventListener('click', () => {
    const estaAberto = navegacao.classList.toggle('open')

    botaoMenu.innerHTML = `${estaAberto ? '<span aria-hidden="true">🗙</span>' : '<span aria-hidden="true">☰</span>'}`
    botaoMenu.setAttribute('aria-expanded', 'true')
})