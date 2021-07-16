const CONTAINER = document.querySelector('.container')
const INPUT_PESQUISA = document.querySelector('#inputPesquisa')
const ICONE_PESQUISA = document.querySelector('#search')
const FORM = document.querySelector('form').elements
const AUDIO = document.querySelectorAll('audio')

puxa_notas_localStorage()

function puxa_notas_localStorage() {
    let listaNotas = []
    for (let i = 0; i < localStorage.length; i++) {
        listaNotas.push(Object.keys(localStorage)[i])
    }
    listaNotas.sort()
    for (let i = 0; i < listaNotas.length; i++) {
        exibe_notas_na_tela(JSON.parse(localStorage.getItem(listaNotas[i])))
    }
}

function cria_obj_nota() {
    const NOTA = {
        id: gerar_id_momento_atual(),
        titulo: FORM.titulo.value,
        comentario: FORM.comentario.value,
        cor: cor_escolhida(FORM.cor.value)
    }
    atualiza_local_Storage(NOTA)
    return NOTA
}

function gerar_id_momento_atual() { 
    const DATA = new Date()
    return DATA.getTime()
}

function cor_escolhida(cor) {
    if (cor == 'branco') return 'white'
    if (cor == 'amarelo') return 'var(--cor1)'
    if (cor == 'verde') return 'var(--cor2)'
    if (cor == 'vermelho') return 'var(--cor3)'
    if (cor == 'azul') return 'var(--cor4)'
}

function atualiza_local_Storage(nota) {
    localStorage.setItem(`${nota.id}`, JSON.stringify(nota))
}

function exibe_notas_na_tela(objNota) {
    const DIVNOTA = document.createElement("div")
    DIVNOTA.setAttribute('class', 'nota' )
    DIVNOTA.classList.add('nota_hover' )
    DIVNOTA.style.backgroundColor = `${objNota.cor}`
    DIVNOTA.innerHTML = `
    <h3>${objNota.titulo}</h3>
    <p>${objNota.comentario}</p>
    `
    CONTAINER.appendChild(DIVNOTA)

    const BTNAPAGANOTA = document.createElement("input")
    BTNAPAGANOTA.setAttribute('type', 'button')
    BTNAPAGANOTA.setAttribute('value', 'delete')
    BTNAPAGANOTA.setAttribute('class', 'apagar')
    BTNAPAGANOTA.classList.add(`${objNota.id}`)
    BTNAPAGANOTA.classList.add('material-icons')

    BTNAPAGANOTA.addEventListener("click", (e) => {
        const CLASSE_DO_BOTAO_CLICADO = e.target.classList[1]
        localStorage.removeItem(`${CLASSE_DO_BOTAO_CLICADO}`)
        DIVNOTA.classList.remove('nota_hover')
        DIVNOTA.classList.add('animaApagar')
        tocar_audio(0)
        setTimeout(() => {
            DIVNOTA.remove()
        }, 300);

    })
    DIVNOTA.appendChild(BTNAPAGANOTA)

    reseta_inputs()
}

function tocar_audio(audio) {
    AUDIO[audio].volume = 0.2
    AUDIO[audio].play()
}

function reseta_inputs() {
    FORM.titulo.value = ''
    FORM.comentario.value = ''
}

function pesquisa_notas() {
    const PESQUISA = INPUT_PESQUISA.value
    const NOTAS = document.querySelectorAll('.nota')
    for (let i = 0; i < NOTAS.length; i++) {
        NOTAS[i].remove()
    }
    if (!PESQUISA) {puxa_notas_localStorage()}
    for (let i = 0; i < localStorage.length; i++) {
        nota = JSON.parse(localStorage.getItem(Object.keys(localStorage)[i]))
        if (nota.titulo == PESQUISA || nota.comentario == PESQUISA) {
            exibe_notas_na_tela(nota)
        }
    }
}

INPUT_PESQUISA.addEventListener('input', () => {
    pesquisa_notas()
})

FORM.adicionar.addEventListener('click', (e) => {
    e.preventDefault()
    if (FORM.titulo.value == '' ||FORM.comentario.value == '') return
    tocar_audio(1)
    exibe_notas_na_tela(cria_obj_nota())
    FORM.titulo.focus()
})

function criar_notas_test(qtd) {
    let cont = 1
    let core = ['white', 'var(--cor1)', 'var(--cor2)', 'var(--cor3)', 'var(--cor4)']
    let timer = setInterval(() => {
        if (cont == qtd) {clearInterval(timer)}
        let nota = {
            id: gerar_id_momento_atual(),
            titulo: cont,
            comentario: cont*Math.floor(Math.random() * 1+100),
            cor: core[Math.floor(Math.random() * core.length)]
        }
        exibe_notas_na_tela(nota)
        atualiza_local_Storage(nota)
        ++cont
    }, 50)
}
