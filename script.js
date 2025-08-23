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
    const main = document.querySelector('main');
    let textoOriginal = main.innerHTML;

    // Botões de leitura
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

    let spans, index;

    function iniciarLeitura() {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            main.innerHTML = textoOriginal;
        }

        const textoParaLer = main.innerText;
        const palavras = textoParaLer.split(/\s+/);
        main.innerHTML = palavras.map(p => `<span class="leitura-palavra">${p}</span>`).join(" ");
        spans = main.querySelectorAll("span.leitura-palavra");
        index = 0;

        fala = new SpeechSynthesisUtterance(textoParaLer);
        fala.rate = seletorVelocidade.value;
        fala.pitch = 1;

        fala.onboundary = function(event) {
            if (event.charIndex !== undefined && index < spans.length) {
                spans.forEach(s => s.style.background = "");
                spans[index].style.background = "yellow";
                index++;
            }
        };

        fala.onend = function() {
            main.innerHTML = textoOriginal;
            lendo = false;
        };

        window.speechSynthesis.speak(fala);
        lendo = true;
    }

    botaoLer.addEventListener('click', iniciarLeitura);

    botaoPausar.addEventListener('click', () => {
        if (!fala) return;
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        } else {
            window.speechSynthesis.pause();
        }
    });

    seletorVelocidade.addEventListener('input', () => {
        if (fala) {
            alert("Velocidade só vai aplicar na próxima leitura.");
        }
    });
});

// ScrollReveal
ScrollReveal().reveal('#inicio', { delay: 500 });
ScrollReveal().reveal('#FreddieMercury', { delay: 500 });
ScrollReveal().reveal('#galeria', { delay: 500 });
ScrollReveal().reveal('#contato', { delay: 500 });
