const botaoMenu = document.querySelector('#menu')
const navegacao = document.querySelector('#navegacao-principal')

botaoMenu.addEventListener('click', () => {
    const estaAberto = navegacao.classList.toggle('open')

    botaoMenu.innerHTML = `${estaAberto ? '<span aria-hidden="true">&times;</span>' : '<span aria-hidden="true">&#9776;</span>'}`
    botaoMenu.setAttribute('aria-expanded', 'true')
})