const botaoMenu = document.querySelector('#menu');
const navegacaoPrincipal = document.querySelector('#navegacao-principal');
const iconeMenu = botaoMenu.querySelector('span');

botaoMenu.addEventListener('click', () => {
    const menuAberto = navegacaoPrincipal.classList.toggle('open');

    botaoMenu.setAttribute('aria-expanded', String(menuAberto));
    botaoMenu.setAttribute('aria-label', menuAberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    iconeMenu.textContent = menuAberto ? '🗙' : '☰';
});
