// const COMENTARIOS = document.querySelector('#comentario').value
// const BTN_ADICIONAR = document.querySelector('#adicionar')
const CONTAINER = document.querySelector('.container')
const FORM = document.querySelector('form').elements

console.log(FORM.cor)

FORM.adicionar.addEventListener('click', criar_nota)

function criar_nota() {
    if (FORM.cor.value) {}
    let divNota = document.createElement("div")
    divNota.setAttribute('class', 'nota' )
    divNota.innerHTML = `
    <h3>${FORM.titulo.value}</h3>
    <p>${FORM.comentario.value}</p>
    `
    CONTAINER.appendChild(divNota)
    if (FORM.cor.value == 'branco') {divNota.style.backgroundColor = 'white'}
    if (FORM.cor.value == 'amarelo') {divNota.style.backgroundColor = 'var(--cor1)'}
    if (FORM.cor.value == 'verde') {divNota.style.backgroundColor = 'var(--cor2)'}
    if (FORM.cor.value == 'vermelho') {divNota.style.backgroundColor = 'var(--cor3)'}
    if (FORM.cor.value == 'azul') {divNota.style.backgroundColor = 'var(--cor4)'}

    let btnApagaNota = document.createElement("input")
    btnApagaNota.setAttribute('type', 'button')
    btnApagaNota.setAttribute('value', 'Apagar')
    btnApagaNota.setAttribute('class', 'apagar')
    divNota.appendChild(btnApagaNota)

    FORM.titulo.value = ''
    FORM.comentario.value = ''
}


{/* <div class="nota" style="background-color: #FFD899">
    <h3>Lorem, ipsum dolor</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum vitae nostrum deserunt rerum repellendus ipsam quisquam, minus iure obcaecati natus</p>
    <input type="button" value="Apagar" class="apagar">
</div> */}