const CONTAINER = document.querySelector('.container')
const INPUT_PESQUISA = document.querySelector('#pes_conteudo')
const FORM = document.querySelector('form').elements
const AUDIO = document.querySelectorAll('audio')

// INPUT_PESQUISA.addEventListener('input', () => {
//     exibe_notas()
//     let notas = document.querySelectorAll('.nota')
//     for (let i = 0; i < notas.length; i++) {
//         if (notas[i].children[0].innerText != INPUT_PESQUISA.value) {
//             notas[i].remove()
//         }
//     }
//     if (!INPUT_PESQUISA.value) {exibe_notas()}
//     // document.querySelectorAll('.nota')[0].children[0].innerText
// })

function pesquisa_notas() {
    let notas = document.querySelectorAll('.nota')
    for (let i = 0; i < notas.length; i++) {
        notas[i].remove()
    }
    for (let i = 0; i < localStorage.length; i++) {
        nota = JSON.parse(localStorage.getItem(Object.keys(localStorage)[i]))
        if (nota.titulo == INPUT_PESQUISA.value) {
            criar_nota(nota)
        }
    }

    if (!INPUT_PESQUISA.value) {exibe_notas()}
}

INPUT_PESQUISA.addEventListener('input', () => {
    pesquisa_notas()
})

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

// function exibe_notas() {
//     CONTAINER.innerHTML = ''
//     for (let i = 0; i < localStorage.length; i++) {
//         criar_nota(
//             JSON.parse(
//                 localStorage.getItem(Object.keys(localStorage)[i])
//             )
//         )
//     }
// }

function exibe_notas() {
    let listaNotas = []
    for (let i = 0; i < localStorage.length; i++) {
        listaNotas.push(Object.keys(localStorage)[i])
    }
    listaNotas.sort()
    // CONTAINER.innerHTML = ''
    for (let i = 0; i < listaNotas.length; i++) {
        criar_nota(JSON.parse(localStorage.getItem(listaNotas[i])))
    }
}

function criar_notas_test(qtd) {
    let cont = 1
    let core = ['white', 'var(--cor1)', 'var(--cor2)', 'var(--cor3)', 'var(--cor4)']
    let timer = setInterval(() => {
        if (cont == qtd) {clearInterval(timer)}
        let nota = {
            id: gerar_id_aleatorio(),
            titulo: cont,
            comentario: cont,
            cor: core[Math.floor(Math.random() * core.length)]
        }
        criar_nota(nota)
        atualiza_local_Storage(nota)
        ++cont
    }, 50)
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




// function ordem (){
//     let leo = []
//     for (let i = 0; i < localStorage.length; i++) {
//         leo.push(Object.keys(localStorage)[i])
//     }
//     leo.sort()
//     CONTAINER.innerHTML = ''
//     for (let i = 0; i < leo.length; i++) {
//         criar_nota(JSON.parse(localStorage.getItem(leo[i])))
//     }
// }


// let leo = document.querySelectorAll('.nota')
// for (let i = 0; i < leo.length; i++){
//     if(leo[i].style.backgroundColor !== "white"){
//         leo[i].remove()
//     }
// }