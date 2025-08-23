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


document.querySelectorAll('.imagem-container').forEach(container => {
  const particles = container.querySelector('.particles');
  const symbols = ['⭐','✨','🎵','🎶'];
  for(let i=0;i<15;i++){
    const span = document.createElement('span');
    span.innerText = symbols[Math.floor(Math.random()*symbols.length)];
    span.style.left = Math.random()*100 + '%';
    span.style.fontSize = (Math.random()*1.2+0.8) + 'rem';
    span.style.animationDuration = (Math.random()*3+3) + 's';
    particles.appendChild(span);
  }
});
