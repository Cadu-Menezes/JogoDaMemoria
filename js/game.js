const grid = document.querySelector('.grid')
const personagens = ['beth', 'jerry', 'jessica', 'morty', 'pessoa-passaro', 'pickle-rick', 'rick', 'summer', 'meeseeks', 'scroopy'];

const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

let primeiraCarta = '';
let segundaCarta = '';

lista_jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];

const checarVitoria= () => {

    const cartasDesabilitadas = document.querySelectorAll('.desabilitarCarta')

    if(cartasDesabilitadas.length == 20){
        
        clearInterval(this.loop)
        alert(`Parabens, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos!`)
        
        Jogador = {
            nome : spanPlayer.innerHTML,
            tempo : timer.innerHTML
        }

        lista_jogadores.push(Jogador);
        console.log(lista_jogadores);

        localStorage.setItem('jogadores', JSON.stringify(lista_jogadores))
    }

   
}

const checarCartas = () => {
    const primeiroPersonagem = primeiraCarta.getAttribute('data-personagem')
    const segundoPersonagem = segundaCarta.getAttribute('data-personagem')

    if(primeiroPersonagem == segundoPersonagem){
        primeiraCarta.firstChild.classList.add('desabilitarCarta')
        segundaCarta.firstChild.classList.add('desabilitarCarta')

        primeiraCarta = '';
        segundaCarta = '';

        checarVitoria();
    }else{
        
        setTimeout(() => {
            primeiraCarta.classList.remove('revelarCarta')
            segundaCarta.classList.remove('revelarCarta')
            
            primeiraCarta = '';
            segundaCarta = '';
        }, 500);
        
    }
}

const criarElemento = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className
    return element;
}

const revelarCarta = ({target}) => {
    
    if(target.parentNode.className.includes('revelarCarta')){
        return;
    }

    if(primeiraCarta === ''){
        target.parentNode.classList.add('revelarCarta')
        primeiraCarta = target.parentNode;
    }
    else if(segundaCarta === ''){
        target.parentNode.classList.add('revelarCarta')
        segundaCarta = target.parentNode;
    }

    checarCartas()
}

const criarCartas = (personagem) =>{
    const card = criarElemento('div', 'card')
    const front = criarElemento('div', 'face front')
    const back = criarElemento('div', 'face back')
    
    front.style.backgroundImage = `url('../images/${personagem}.png')`;

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revelarCarta);
    card.setAttribute('data-personagem', personagem)

    return card;
}

const loadGame = () => {
    
    const duplicarPersonagens = [...personagens, ...personagens]

    const embaralharPersonagens =  duplicarPersonagens.sort(() => Math.random() - 0.5);

    embaralharPersonagens.forEach((personagem) => {
        
        const card = criarCartas(personagem);
        grid.appendChild(card)
    
    })
}

const startTimer = () => {

    this.loop = setInterval(() => {

        const tempoAtual = +timer.innerHTML;
        timer.innerHTML = tempoAtual + 1

    }, 1000);
}

window.onload = () =>{

    spanPlayer.innerHTML = localStorage.getItem('player')
    startTimer();
    loadGame();
}

