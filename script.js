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
    const main = document.querySelector('main');
    let textoOriginal = main.innerHTML;

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

    let fala;
    let lendo = false;
    let pausado = false;
    let palavras = [];
    let spans = [];
    let index = 0;

    function iniciarLeitura() {
        // Cancela qualquer leitura em andamento
        window.speechSynthesis.cancel();
        main.innerHTML = textoOriginal;

        const textoParaLer = main.innerText;
        palavras = textoParaLer.split(/\s+/);
        main.innerHTML = palavras.map(p => `<span class="leitura-palavra">${p}</span>`).join(" ");
        spans = main.querySelectorAll("span.leitura-palavra");
        index = 0;

        fala = new SpeechSynthesisUtterance(textoParaLer);
        fala.rate = parseFloat(seletorVelocidade.value);
        fala.pitch = 1;

        fala.onboundary = function(event) {
            if (event.name === "word" || event.charIndex !== undefined) {
                let pos = event.charIndex || 0;
                let parcial = textoParaLer.slice(0, pos);
                let idx = parcial.split(/\s+/).length - 1;
                if (idx >= 0 && idx < spans.length) {
                    spans.forEach(s => s.style.background = "");
                    spans[idx].style.background = "yellow";
                    index = idx + 1;
                }
            }
        };

        fala.onend = function() {
            main.innerHTML = textoOriginal;
            lendo = false;
            pausado = false;
        };

        window.speechSynthesis.speak(fala);
        lendo = true;
        pausado = false;
    }

    botaoLer.addEventListener('click', iniciarLeitura);

    botaoPausar.addEventListener('click', () => {
        if (!lendo) return;

        if (!pausado) {
            window.speechSynthesis.pause();
            pausado = true;
        } else {
            window.speechSynthesis.resume();
            pausado = false;
        }
    });

    // Atualiza velocidade em tempo real
    seletorVelocidade.addEventListener('input', () => {
        if (lendo && fala) {
            // Pega palavras restantes
            const textoRestante = palavras.slice(index).join(" ");
            window.speechSynthesis.cancel();

            fala = new SpeechSynthesisUtterance(textoRestante);
            fala.rate = parseFloat(seletorVelocidade.value);
            fala.pitch = 1;

            fala.onboundary = function(event) {
                if (event.name === "word" || event.charIndex !== undefined) {
                    let pos = event.charIndex || 0;
                    let parcial = textoRestante.slice(0, pos);
                    let idx = parcial.split(/\s+/).length - 1;
                    if (idx >= 0 && idx < spans.length) {
                        spans.forEach(s => s.style.background = "");
                        spans[index + idx].style.background = "yellow";
                    }
                }
            };

            fala.onend = function() {
                main.innerHTML = textoOriginal;
                lendo = false;
                pausado = false;
            };

            window.speechSynthesis.speak(fala);
        }
    });
});

// ScrollReveal
ScrollReveal().reveal('#inicio', { delay: 500 });
ScrollReveal().reveal('#FreddieMercury', { delay: 500 });
ScrollReveal().reveal('#galeria', { delay: 500 });
ScrollReveal().reveal('#contato', { delay: 500 });
