const input = document.querySelector('.login__input')
const button = document.querySelector('.login__button')
const form = document.querySelector('.login__form')

const validarInput = ({target}) => {
    if(target.value.length >= 1){
        button.removeAttribute('disabled')
        return;
    }
    button.setAttribute('disabled', '')
}

const submitPlay = (event) => {
    event.preventDefault();
    localStorage.setItem('player', input.value)
    window.location = 'pages/game.html'
}

input.addEventListener('input', validarInput);
form.addEventListener('submit', submitPlay);