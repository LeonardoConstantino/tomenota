const CONTAINER = document.querySelector('.container')
const FORM = document.querySelector('form').elements
const AUDIO = document.querySelector('audio')

function atualiza_local_Storage(nota) {
    localStorage.setItem(`${nota.id}`, JSON.stringify(nota))
}

function gerar_id_aleatorio() { 
    return Math.floor(Math.random() * 50000)
}

function reseta_inputs() {
    FORM.titulo.value = ''
    FORM.comentario.value = ''
}

FORM.adicionar.addEventListener('click', (e) => {
    e.preventDefault()
    if (FORM.titulo.value == '' ||FORM.comentario.value == '') return
    criar_nota(cria_obj_nota())
    FORM.titulo.focus()
})

function exibe_notas() {
    CONTAINER.innerHTML = ''
    for (let i = 0; i < localStorage.length; i++) {
        criar_nota(
            JSON.parse(
                localStorage.getItem(Object.keys(localStorage)[i])
            )
        )
    }
}

function cria_obj_nota() {
    let corEscolhida
    if (FORM.cor.value == 'branco') {corEscolhida = 'white'}
    if (FORM.cor.value == 'amarelo') {corEscolhida = 'var(--cor1)'}
    if (FORM.cor.value == 'verde') {corEscolhida = 'var(--cor2)'}
    if (FORM.cor.value == 'vermelho') {corEscolhida = 'var(--cor3)'}
    if (FORM.cor.value == 'azul') {corEscolhida = 'var(--cor4)'}
    let nota = {
        id: gerar_id_aleatorio(),
        titulo: FORM.titulo.value,
        comentario: FORM.comentario.value,
        cor: corEscolhida
    }
    atualiza_local_Storage(nota)
    return nota
}

function criar_nota(objNota) {
    let divNota = document.createElement("div")
    divNota.setAttribute('class', 'nota' )
    divNota.classList.add('class', 'nota_hover' )
    divNota.innerHTML = `
    <h3>${objNota.titulo}</h3>
    <p>${objNota.comentario}</p>
    `
    CONTAINER.appendChild(divNota)
    divNota.style.backgroundColor = `${objNota.cor}`

    let btnApagaNota = document.createElement("input")
    btnApagaNota.setAttribute('type', 'button')
    btnApagaNota.setAttribute('value', 'Apagar')
    btnApagaNota.setAttribute('class', 'apagar')
    btnApagaNota.classList.add(`${objNota.id}`)
    btnApagaNota.addEventListener("click", (e) => {
        const CLASSE_DO_BOTAO_CLICADO = e.target.classList[1]
        localStorage.removeItem(`${CLASSE_DO_BOTAO_CLICADO}`)
        divNota.classList.remove('nota_hover')
        divNota.classList.add('animaApagar')
        AUDIO.volume = 0.2
        AUDIO.play()
        setTimeout(() => {
            divNota.remove()
        }, 300);

    })
    divNota.appendChild(btnApagaNota)

    reseta_inputs()
}

exibe_notas()