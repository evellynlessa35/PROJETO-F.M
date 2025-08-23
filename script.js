document.addEventListener('DOMContentLoaded', function(){
const botaoDeAcessibilidade = document.getElementById('botao-acessibilidade')
const opcoesDeAcessibilidade = document.getElementById('opcoes-acessibilidade')

botaoDeAcessibilidade.addEventListener('click', function (){  
 botaoDeAcessibilidade.classList.toggle('rotacao-botao');  
 opcoesDeAcessibilidade.classList.toggle('apresenta-lista')  

 const botaoSelecionado = botaoDeAcessibilidade.getAttribute('aria-expanded') === 'true';  
 botaoDeAcessibilidade.setAttribute('aria-expanded', !botaoSelecionado)  
 
})  

 const aumentaFonteBotao = document.getElementById('aumentar-fonte');  
 const diminuiFonteBotao = document.getElementById('diminuir-fonte');  
   
 const alternaContraste = document.getElementById('alterna-contraste')  

 let tamanhoAtualFonte = 1;  

 aumentaFonteBotao.addEventListener('click', function(){  
     tamanhoAtualFonte += 0.1;  
     document.body.style.fontSize = `${tamanhoAtualFonte}rem`  

 })  

 diminuiFonteBotao.addEventListener('click', function(){  
     tamanhoAtualFonte -= 0.1;  
     document.body.style.fontSize = `${tamanhoAtualFonte}rem`  

 })  

 alternaContraste.addEventListener('click', function(){  
     document.body.classList.toggle('alto-contraste')  
 })

})

ScrollReveal().reveal('#inicio', { delay: 500 });
ScrollReveal().reveal('#FreddieMercury', { delay: 500 });
ScrollReveal().reveal('#galeria', { delay: 500 });
ScrollReveal().reveal('#contato', { delay: 500 });


const galeria = document.querySelector('#galeria');
const emojis = ['⭐','🎵','✨','🎶'];
const numEmojis = 30; 

for (let i = 0; i < numEmojis; i++) {
    const span = document.createElement('span');
    span.classList.add('particle');
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
   
    span.style.top = Math.random() * galeria.offsetHeight + 'px';
    span.style.left = Math.random() * galeria.offsetWidth + 'px';
    
    galeria.appendChild(span);
 
    const speedX = (Math.random() - 0.5) * 2; 
    const speedY = (Math.random() - 0.5) * 2;

    function move() {
        let top = parseFloat(span.style.top);
        let left = parseFloat(span.style.left);

        top += speedY;
        left += speedX;

        if (top < 0 || top > galeria.offsetHeight - 20) span.style.top = Math.random() * galeria.offsetHeight + 'px';
        else span.style.top = top + 'px';

        if (left < 0 || left > galeria.offsetWidth - 20) span.style.left = Math.random() * galeria.offsetWidth + 'px';
        else span.style.left = left + 'px';

        requestAnimationFrame(move);
    }

    move();
}
