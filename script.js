<!-- Evellyn Lessa 2E 13/08 -->  
    document.addEventListener('DOMContentLoaded', function() {

const botaoDeAcessibilidade = document.getElementById('botao-acessibilidade');  
const opcoesDeAcessibilidade = document.getElementById('opcoes-acessibilidade');  

if (botaoDeAcessibilidade && opcoesDeAcessibilidade) {  
    botaoDeAcessibilidade.addEventListener('click', function() {  
        botaoDeAcessibilidade.classList.toggle('rotacao-botao');  
        opcoesDeAcessibilidade.classList.toggle('apresenta-lista');  

        const botaoSelecionado = botaoDeAcessibilidade.getAttribute('aria-expanded') === 'true';  
        botaoDeAcessibilidade.setAttribute('aria-expanded', !botaoSelecionado);  
    });  
}  

  
const aumentaFonteBotao = document.getElementById('aumentar-fonte');  
const diminuiFonteBotao = document.getElementById('diminuir-fonte');  
const alternaContraste = document.getElementById('alterna-contraste');  

let tamanhoAtualFonte = 1;  

if (aumentaFonteBotao) {  
    aumentaFonteBotao.addEventListener('click', function() {  
        tamanhoAtualFonte += 0.1;  
        document.body.style.fontSize = `${tamanhoAtualFonte}rem`;  
    });  
}  

if (diminuiFonteBotao) {  
    diminuiFonteBotao.addEventListener('click', function() {  
        tamanhoAtualFonte -= 0.1;  
        document.body.style.fontSize = `${tamanhoAtualFonte}rem`;  
    });  
}  

if (alternaContraste) {  
    alternaContraste.addEventListener('click', function() {  
        document.body.classList.toggle('alto-contraste');  
    });  
}  

  
ScrollReveal().reveal('#inicio', { delay: 500 });  
ScrollReveal().reveal('#FreddieMercury', { delay: 500 });  
ScrollReveal().reveal('#galeria', { delay: 500 });  
ScrollReveal().reveal('#contato', { delay: 500 });  

  
const estrela = document.getElementById('estrela-musica');  
const musica = document.getElementById('musica-freddie');  

if (estrela && musica) {  
    estrela.addEventListener('click', () => {  
        if (musica.paused) {  
            musica.play();  
            estrela.style.backgroundColor = '#ffdd00';  
        } else {  
            musica.pause();  
            estrela.style.backgroundColor = 'gold';  
        }  
    });  
}  

  
document.querySelectorAll('.imagem-container').forEach(container => {  
    const emojis = ['⭐','🎵','✨','🎶'];  
    const numEmojis = 5;  

    const { width, height } = container.getBoundingClientRect();  

    for (let i = 0; i < numEmojis; i++) {  
        const span = document.createElement('span');  
        span.classList.add('particle');  
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];  

        container.appendChild(span);  

        span.style.top = Math.random() * height + 'px';  
        span.style.left = Math.random() * width + 'px';  

        const speedX = (Math.random() - 0.5) * 2;  
        const speedY = (Math.random() - 0.5) * 2;  

        function move() {  
            let top = parseFloat(span.style.top);  
            let left = parseFloat(span.style.left);  

            top += speedY;  
            left += speedX;  

            if (top < 0) top = 0;  
            if (top > height - 20) top = height - 20;  
            if (left < 0) left = 0;  
            if (left > width - 20) left = width - 20;  

            span.style.top = top + 'px';  
            span.style.left = left + 'px';  

            requestAnimationFrame(move);  
        }  

        move();  
    }  
});

});

                                       
