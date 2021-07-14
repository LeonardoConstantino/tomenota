const CONTAINER = document.querySelector('.container')
const FORM = document.querySelector('form').elements
const AUDIO = document.querySelectorAll('audio')

function atualiza_local_Storage(nota) {
    localStorage.setItem(`${nota.id}`, JSON.stringify(nota))
}

function gerar_id_aleatorio() { 
    const d = new Date()
    return d.getTime()
}

function reseta_inputs() {
    FORM.titulo.value = ''
    FORM.comentario.value = ''
}

FORM.adicionar.addEventListener('click', (e) => {
    e.preventDefault()
    if (FORM.titulo.value == '' ||FORM.comentario.value == '') return
    AUDIO[1].volume = 0.2
    AUDIO[1].play()
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
    divNota.classList.add('nota_hover' )
    divNota.style.backgroundColor = `${objNota.cor}`
    divNota.innerHTML = `
    <h3>${objNota.titulo}</h3>
    <p>${objNota.comentario}</p>
    `
    CONTAINER.appendChild(divNota)

    let btnApagaNota = document.createElement("input")
    btnApagaNota.setAttribute('type', 'button')
    btnApagaNota.setAttribute('value', 'delete')
    btnApagaNota.setAttribute('class', 'apagar')
    btnApagaNota.classList.add(`${objNota.id}`)
    btnApagaNota.classList.add('material-icons')

    btnApagaNota.addEventListener("click", (e) => {
        const CLASSE_DO_BOTAO_CLICADO = e.target.classList[1]
        localStorage.removeItem(`${CLASSE_DO_BOTAO_CLICADO}`)
        divNota.classList.remove('nota_hover')
        divNota.classList.add('animaApagar')
        AUDIO[0].volume = 0.2
        AUDIO[0].play()
        setTimeout(() => {
            divNota.remove()
        }, 300);

    })
    divNota.appendChild(btnApagaNota)

    reseta_inputs()
}

exibe_notas()