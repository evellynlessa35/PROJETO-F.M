document.addEventListener('DOMContentLoaded', function() {
    const botaoDeAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesDeAcessibilidade = document.getElementById('opcoes-acessibilidade');

    botaoDeAcessibilidade.addEventListener('click', function() {
        botaoDeAcessibilidade.classList.toggle('rotacao-botao');
        opcoesDeAcessibilidade.classList.toggle('apresenta-lista');

        const botaoSelecionado = botaoDeAcessibilidade.getAttribute('aria-expanded') === 'true';
        botaoDeAcessibilidade.setAttribute('aria-expanded', !botaoSelecionado);
    });

    const aumentaFonteBotao = document.getElementById('aumentar-fonte');
    const diminuiFonteBotao = document.getElementById('diminuir-fonte');
    const alternaContraste = document.getElementById('alterna-contraste');

    let tamanhoAtualFonte = 1;
    const elementosExtras = document.querySelectorAll('.linha-do-tempo, .video-freddie h3');

    aumentaFonteBotao.addEventListener('click', function() {
        tamanhoAtualFonte += 0.1;
        document.body.style.fontSize = `${tamanhoAtualFonte}rem`;

        elementosExtras.forEach(el => {
            let tamanhoAtual = parseFloat(window.getComputedStyle(el).fontSize);
            el.style.fontSize = `${tamanhoAtual + 1}px`;
        });
    });

    diminuiFonteBotao.addEventListener('click', function() {
        tamanhoAtualFonte -= 0.1;
        document.body.style.fontSize = `${tamanhoAtualFonte}rem`;

        elementosExtras.forEach(el => {
            let tamanhoAtual = parseFloat(window.getComputedStyle(el).fontSize);
            el.style.fontSize = `${tamanhoAtual - 1}px`;
        });
    });

    alternaContraste.addEventListener('click', function() {
        document.body.classList.toggle('alto-contraste');
    });

    const botaoLer = document.createElement('button');
    botaoLer.textContent = 'Ler página';
    botaoLer.classList.add('btn', 'btn-primary', 'fw-bold');
    botaoLer.setAttribute('aria-label', 'Ler o conteúdo da página em voz alta');
    opcoesDeAcessibilidade.appendChild(botaoLer);

    botaoLer.addEventListener('click', () => {
        const textoParaLer = document.querySelector('main').innerText;
        const fala = new SpeechSynthesisUtterance(textoParaLer);
        fala.rate = 1;
        fala.pitch = 1; 
        window.speechSynthesis.speak(fala);
    });
});

ScrollReveal().reveal('#inicio', { delay: 500 });
ScrollReveal().reveal('#FreddieMercury', { delay: 500 });
ScrollReveal().reveal('#galeria', { delay: 500 });
ScrollReveal().reveal('#contato', { delay: 500 });
