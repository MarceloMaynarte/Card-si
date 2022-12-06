let myInput = 0, myInput2 = 0, myInput3 = 0, myInput4 = 0, inputsValue = 0;
window.onload = () => {
    document.getElementById("btn-add-car").style = "display:none"
    document.getElementById("item-number").style = "display:none"
}

let cardapio;

window.onload = async function () {
    cardapio = await getCardapio();

    renderEntradas(cardapio)
    renderPorcoes(cardapio)
    renderBebidas(cardapio)
    renderPratos(cardapio)
    renderDoces(cardapio)
}

async function getCardapio() {
    try {
        const response = await fetch("http://localhost:3000/products")

        return data = await response.json();

    } catch (error) {
        console.error(error);
    }
}



function view(element) {
    var allButtons = document.getElementsByClassName("btn")
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove("active-btn")
    }

    element.classList.add("active-btn")

    var id = element.getAttribute("id")
    var seletor = "card-" + id

    var allCards = document.getElementsByClassName("cards")
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].classList.remove("active-carrossel")
    }
    document.getElementById(seletor).classList.add("active-carrossel")
}

function addToCar() {
    document.getElementById("item-number").style = "display:show"
    if (inputsValue > 0) document.getElementById("inputCarNumber").value = inputsValue
}

function waiterAlert() {
    alert("O garçom está vindo!")
}

function renderEntradas(cardapio) {
    const entradas = cardapio.filter((entrada) => entrada.categoria === "entradas")

    let containerEntradas = document.getElementById("card-entradas")
    let generalTemplate = ""
    for (let i = 0; i < entradas.length; i++) {
        const name = entradas[i].name
        const image = entradas[i].image
        const id = entradas[i].id
        const description = entradas[i].description
        const price = entradas[i].price
        const quant = entradas[i].quant
        const time = entradas[i].time
        generalTemplate += `<div class="card">
                <div class="content-preco">
                    <div class="preco">
                        <p>R$ ${price},00</p>
                    </div>
                </div>
                <div class="card-content">
                    <figure>
                        <img src="${image}" alt="image">
                    </figure>
                    <div class="card-opaque">
                        <h2>${name}</h2>
                        <p>${description}</p>
                        <p><b>Tempo médio: </b>${time} min</p>
                    </div>
                </div>
                <div class="counter">
                    <button class="btn-counter" onclick="remove(${id})">-</button>
                    <div id="vis_qntde${id}">
                    <input type="text" id="myInput" value="${quant}" disabled="disabled">
                    </div>
                    <button class="btn-counter" onclick="add(${id})">+</button>
                </div>
            </div>`

    }
    containerEntradas.insertAdjacentHTML("beforeend", generalTemplate)
}

function renderPorcoes(cardapio) {
    const porcoes = cardapio.filter((porcoes) => porcoes.categoria === "porcoes")

    let containerPorcoes = document.getElementById("card-porcoes")
    let generalTemplate = ""
    for (let i = 0; i < porcoes.length; i++) {
        const name = porcoes[i].name
        const image = porcoes[i].image
        const id = porcoes[i].id
        const description = porcoes[i].description
        const price = porcoes[i].price
        const quant = porcoes[i].quant
        const time = porcoes[i].time
        const serve = porcoes[i].serve

        generalTemplate += `<div class="card" id="${id}">
                <div class="content-preco">
                    <div class="preco">
                        <p>R$ ${price},00</p>
                    </div>
                </div>
                <div class="card-content">
                    <figure>
                        <img src="${image}" alt="image">
                    </figure>
                    <div class="card-opaque">
                        <h2>${name}</h2>
                        <p>${description}</p>
                        <b>Serve ${serve}</b>
                        <p><b>Tempo médio: </b>${time} min</p>
                    </div>
                </div>
                <div class="counter">
                    <button class="btn-counter" onclick="remove(${id})">-</button>
                    <div id="vis_qntde${id}">
                    <input type="text" id="myInput" value="${quant}" disabled="disabled">
                    </div>    
                    <button class="btn-counter" onclick="add(${id})">+</button>
                </div>
            </div>`

    }
    containerPorcoes.insertAdjacentHTML("beforeend", generalTemplate)
}

function renderBebidas(cardapio) {
    const bebidas = cardapio.filter((bebida) => bebida.categoria === "bebidas")

    let containerBebidas = document.getElementById("card-bebidas")
    let generalTemplate = ""
    for (let i = 0; i < bebidas.length; i++) {
        const name = bebidas[i].name
        const image = bebidas[i].image
        const id = bebidas[i].id
        const description = bebidas[i].description
        const price = bebidas[i].price
        const quant = bebidas[i].quant
        const time = bebidas[i].time
        generalTemplate += `<div class="card">
                <div class="content-preco">
                    <div class="preco">
                        <p>R$ ${price},00</p>
                    </div>
                </div>
                <div class="card-content">
                    <figure>
                        <img src="${image}" alt="image">
                    </figure>
                    <div class="card-opaque">
                        <h2>${name}</h2>
                        <p>${description}</p>
                        <p><b>Tempo médio: </b>${time} min</p>
                    </div>
                </div>
                <div class="counter">
                    <button class="btn-counter" onclick="remove(${id})">-</button>
                    <div id="vis_qntde${id}">
                    <input type="text" id="myInput" value="${quant}" disabled="disabled">
                    </div>
                        <button class="btn-counter" onclick="add(${id})">+</button>
                </div>
            </div>`

    }
    containerBebidas.insertAdjacentHTML("beforeend", generalTemplate)
}

function renderPratos(cardapio) {
    const pratos = cardapio.filter((prato) => prato.categoria === "pratos")

    let containerPratos = document.getElementById("card-pratos")
    let generalTemplate = ""
    for (let i = 0; i < pratos.length; i++) {
        const name = pratos[i].name
        const image = pratos[i].image
        const id = pratos[i].id
        const description = pratos[i].description
        const price = pratos[i].price
        const quant = pratos[i].quant
        const time = pratos[i].time
        generalTemplate += `<div class="card">
                <div class="content-preco">
                    <div class="preco">
                        <p>R$ ${price},00</p>
                    </div>
                </div>
                <div class="card-content">
                    <figure>
                        <img src="${image}" alt="image">
                    </figure>
                    <div class="card-opaque">
                        <h2>${name}</h2>
                        <p>${description}</p>
                        <p><b>Tempo médio: </b>${time} min</p>
                    </div>
                </div>
                <div class="counter">
                    <button class="btn-counter" onclick="remove(${id})">-</button>
                    <div id="vis_qntde${id}">
                    <input type="text" id="myInput" value="${quant}" disabled="disabled">
                    </div>
                        <button class="btn-counter" onclick="add(${id})">+</button>
                </div>
            </div>`
    }
    containerPratos.insertAdjacentHTML("beforeend", generalTemplate)
}

function renderDoces(cardapio) {
    const doces = cardapio.filter((doce) => doce.categoria === "doces")

    let containerDoces = document.getElementById("card-doces")
    let generalTemplate = ""
    for (let i = 0; i < doces.length; i++) {
        const name = doces[i].name
        const image = doces[i].image
        const id = doces[i].id
        const description = doces[i].description
        const price = doces[i].price
        const quant = doces[i].quant
        const time = doces[i].time
        generalTemplate += `<div class="card">
                <div class="content-preco">
                    <div class="preco">
                        <p>R$ ${price},00</p>
                    </div>
                </div>
                <div class="card-content">
                    <figure>
                        <img src="${image}" alt="image">
                    </figure>
                    <div class="card-opaque">
                        <h2>${name}</h2>
                        <p>${description}</p>
                        <p><b>Tempo médio: </b>${time} min</p>
                    </div>
                </div>
                <div class="counter">
                    <button class="btn-counter" onclick="remove(${id})">-</button>
                    <div id="vis_qntde${id}">
                    <input type="text" id="myInput" value="${quant}" disabled="disabled">
                    </div>
                        <button class="btn-counter" onclick="add(${id})">+</button>
                </div>
            </div>`
    }
    containerDoces.insertAdjacentHTML("beforeend", generalTemplate)
}

function add(id) {

    pedido(cardapio[id])
    let ClassID = `vis_qntde${id}`
    DivQuantidade = document.getElementById(ClassID)

    texto = `<input type="text" id="myInput" value="${cardapio[id].quant}" disabled="disabled">`
    DivQuantidade.innerHTML = texto
}
function pedido(objeto) {
    objeto.quant++;
    let prev = JSON.parse(localStorage.getItem("pedido"))
    if (!prev) prev = [];
    let repetido = prev.findIndex(element => element.id == objeto.id)
    if (repetido != -1) {
        prev[repetido].quant++;
        localStorage.setItem("pedido", JSON.stringify(prev));
        addContador(prev.length)
        return
    }

    prev.push(objeto)
    localStorage.setItem("pedido", JSON.stringify(prev))
    addContador(prev.length)
}

function remove(id) {

    if (cardapio[id].quant == 0) return

    delpedido(cardapio[id])
    let ClassID = `vis_qntde${id}`
    DivQuantidade = document.getElementById(ClassID)


    texto = `<input type="text" id="myInput" value="${cardapio[id].quant}" disabled="disabled">`
    DivQuantidade.innerHTML = texto

}

function delpedido(objeto) {

    objeto.quant--;

    let prev = JSON.parse(localStorage.getItem("pedido"))

    let indexObjeto = prev.findIndex(element => element.id == objeto.id)
    prev[indexObjeto].quant--;

    if (prev[indexObjeto].quant == 0) prev.splice(indexObjeto, 1);

    addContador(prev.length)

    localStorage.setItem("pedido", JSON.stringify(prev));
}

function addContador(contador) {

    let divTela = document.getElementById("item-number")
    let valor = `<input id="inputCarNumber" type="text" disabled="disabled" value="${contador}">`

    divTela.innerHTML = valor
}

