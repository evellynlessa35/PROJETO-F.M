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

    // -------- LEITOR DE TELA ---------
    let fala;
    let lendo = false;

    const botaoLer = document.createElement('button');
    botaoLer.textContent = '▶ Ler página';
    botaoLer.classList.add('btn', 'btn-primary', 'fw-bold');
    opcoesDeAcessibilidade.appendChild(botaoLer);

    const botaoPausar = document.createElement('button');
    botaoPausar.textContent = '⏸ Pausar/Retomar';
    botaoPausar.classList.add('btn', 'btn-secondary', 'fw-bold');
    opcoesDeAcessibilidade.appendChild(botaoPausar);

    const seletorVelocidade = document.createElement('input');
    seletorVelocidade.type = 'range';
    seletorVelocidade.min = 0.5;
    seletorVelocidade.max = 2;
    seletorVelocidade.step = 0.1;
    seletorVelocidade.value = 1;
    seletorVelocidade.title = "Velocidade da leitura";
    opcoesDeAcessibilidade.appendChild(seletorVelocidade);

    const main = document.querySelector('main');
    const textoParaLer = main.innerText;

    botaoLer.addEventListener('click', () => {
        // cancela leitura atual
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }

        fala = new SpeechSynthesisUtterance(textoParaLer);
        fala.rate = seletorVelocidade.value;
        fala.pitch = 1;

        // criar highlights sem modificar main
        const palavras = textoParaLer.split(/\s+/);
        const overlay = document.createElement('div');
        overlay.classList.add('leitura-overlay');
        overlay.style.position = 'absolute';
        overlay.style.top = main.offsetTop + 'px';
        overlay.style.left = main.offsetLeft + 'px';
        overlay.style.width = main.offsetWidth + 'px';
        overlay.style.height = main.offsetHeight + 'px';
        overlay.style.pointerEvents = 'none';
        overlay.style.fontSize = window.getComputedStyle(main).fontSize;
        overlay.style.lineHeight = window.getComputedStyle(main).lineHeight;
        overlay.style.zIndex = 1000;

        document.body.appendChild(overlay);

        palavras.forEach((p, i) => {
            const span = document.createElement('span');
            span.textContent = p + ' ';
            overlay.appendChild(span);
        });

        const spans = overlay.querySelectorAll('span');
        let index = 0;

        fala.onboundary = function(event) {
            if (event.charIndex !== undefined) {
                let parcial = textoParaLer.slice(0, event.charIndex);
                index = parcial.split(/\s+/).length - 1;
                spans.forEach(s => s.style.background = '');
                if (spans[index]) spans[index].style.background = 'yellow';
            }
        };

        fala.onend = function() {
            overlay.remove(); // remove highlights ao final
        };

        window.speechSynthesis.speak(fala);
        lendo = true;
    });

    botaoPausar.addEventListener('click', () => {
        if (lendo) {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            } else {
                window.speechSynthesis.pause();
            }
        }
    });

    seletorVelocidade.addEventListener('input', () => {
        if (fala) {
            fala.rate = seletorVelocidade.value;
        }
    });
});

// ScrollReveal
ScrollReveal().reveal('#inicio', { delay: 500 });
ScrollReveal().reveal('#FreddieMercury', { delay: 500 });
ScrollReveal().reveal('#galeria', { delay: 500 });
ScrollReveal().reveal('#contato', { delay: 500 });
