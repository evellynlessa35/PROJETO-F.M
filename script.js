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

    // Botão Ler
    const botaoLer = document.createElement('button');
    botaoLer.textContent = '▶ Ler página';
    botaoLer.classList.add('btn', 'btn-primary', 'fw-bold');
    opcoesDeAcessibilidade.appendChild(botaoLer);

    // Botão Pausar/Retomar
    const botaoPausar = document.createElement('button');
    botaoPausar.textContent = '⏸ Pausar/Retomar';
    botaoPausar.classList.add('btn', 'btn-secondary', 'fw-bold');
    opcoesDeAcessibilidade.appendChild(botaoPausar);

    // Controle de velocidade
    const seletorVelocidade = document.createElement('input');
    seletorVelocidade.type = 'range';
    seletorVelocidade.min = 0.5;
    seletorVelocidade.max = 2;
    seletorVelocidade.step = 0.1;
    seletorVelocidade.value = 1;
    seletorVelocidade.title = "Velocidade da leitura";
    opcoesDeAcessibilidade.appendChild(seletorVelocidade);

    const velocidadeLabel = document.createElement('span');
    velocidadeLabel.textContent = ` Velocidade: ${seletorVelocidade.value}x`;
    opcoesDeAcessibilidade.appendChild(velocidadeLabel);

    seletorVelocidade.addEventListener('input', () => {
        velocidadeLabel.textContent = ` Velocidade: ${seletorVelocidade.value}x`;
        if (fala) {
            fala.rate = parseFloat(seletorVelocidade.value);
        }
    });

    const main = document.querySelector('main');
    let palavras = [];

    botaoLer.addEventListener('click', () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }

        palavras = main.innerText.split(/\s+/);

        fala = new SpeechSynthesisUtterance(main.innerText);
        fala.rate = parseFloat(seletorVelocidade.value);
        fala.pitch = 1;

        let index = 0;

        fala.onboundary = function(event) {
            if (event.name === 'word' || event.charIndex !== undefined) {
                index = event.charIndex !== undefined ? main.innerText.slice(0, event.charIndex).split(/\s+/).length - 1 : index;
                // Remove destaque anterior
                main.querySelectorAll('.leitura-destacado').forEach(el => el.classList.remove('leitura-destacado'));
                // Destaca palavra atual criando um span temporário
                const regex = new RegExp(`\\b${palavras[index]}\\b`);
                main.innerHTML = main.innerHTML.replace(regex, `<span class="leitura-destacado">${palavras[index]}</span>`);
            }
        };

        fala.onend = function() {
            main.innerHTML = main.innerHTML.replace(/<span class="leitura-destacado">(.*?)<\/span>/g, '$1');
            lendo = false;
        };

        window.speechSynthesis.speak(fala);
        lendo = true;
    });

    botaoPausar.addEventListener('click', () => {
        if (!lendo) return;
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        } else {
            window.speechSynthesis.pause();
        }
    });
});

// ScrollReveal
ScrollReveal().reveal('#inicio', { delay: 500 });
ScrollReveal().reveal('#FreddieMercury', { delay: 500 });
ScrollReveal().reveal('#galeria', { delay: 500 });
ScrollReveal().reveal('#contato', { delay: 500 });
