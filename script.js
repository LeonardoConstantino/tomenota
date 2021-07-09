// const COMENTARIOS = document.querySelector('#comentario').value
// const BTN_ADICIONAR = document.querySelector('#adicionar')
const CONTAINER = document.querySelector('.container')
const FORM = document.querySelector('form').elements
// let arrObjNotas = JSON.parse(localStorage.getItem("arrObjNotas"))
// let arrNotas
    // if (arrObjNotas != null) {
    //     arrNotas = arrObjNotas
    // }
    // CONTAINER.children[0].classList
    // JSON.parse(localStorage.getItem("arrObjNotas"))[0].id

// console.log(arrObjNotas?arrObjNotas:[])


exibe_notas()

FORM.adicionar.addEventListener('click', (e) => {
    e.preventDefault()
    if (FORM.titulo.value == '' ||FORM.comentario.value == '') return
    criar_nota(cria_obj_nota())
})

// console.log(FORM.cor)
// console.log(cria_obj_nota())


function exibe_notas() {
    // Object.keys(localStorage).forEach(function(key){
    //     console.log(localStorage.getItem(key))
    //     criar_nota(localStorage.getItem(key))
    // })
    CONTAINER.innerHTML = ''
    for (let i = 0; i < localStorage.length; i++) {
        criar_nota(
            JSON.parse(localStorage.getItem(Object.keys(localStorage)[i]))
        )
    }
}

function atualiza_local_Storage(nota) {
    localStorage.setItem(`${nota.id}`, JSON.stringify(nota))
}

function gerar_id_aleatorio() { 
    return Math.floor(Math.random() * 5000)
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
    console.log(nota)
    atualiza_local_Storage(nota)
    return nota
}



function criar_nota(objNota) {
    let divNota = document.createElement("div")
    divNota.setAttribute('class', 'nota' )
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
        console.log(CLASSE_DO_BOTAO_CLICADO)
        localStorage.removeItem(`${CLASSE_DO_BOTAO_CLICADO}`)
        divNota.remove()
    })
    divNota.appendChild(btnApagaNota)

    FORM.titulo.value = ''
    FORM.comentario.value = ''
}






// function add_event_listener_btn_apagar() {
//     const BTN_APAGAR = document.querySelectorAll('.apagar')
//     for (let i = 0; i < BTN_APAGAR.length; i++) {
//         BTN_APAGAR[i].addEventListener("click", (e) => {
//             const CLASSE_DO_BOTAO_CLICADO = e.target.classList[1]
//             console.log(CLASSE_DO_BOTAO_CLICADO)
//             // localStorage.removeItem(`${CLASSE_DO_BOTAO_CLICADO}`)
//         })
//     }
    
// }




// BTN_CORES[i].addEventListener("click", (e) => {
//     const CLASSE_DO_BOTAO_CLICADO = e.target.classList[1]



/* <div class="nota" style="background-color: #FFD899">
    <h3>Lorem, ipsum dolor</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum vitae nostrum deserunt rerum repellendus ipsam quisquam, minus iure obcaecati natus</p>
    <input type="button" value="Apagar" class="apagar">
</div> */