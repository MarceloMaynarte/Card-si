window.onload = function () {
    const items = getLocalStorageItems("pedido");
    const orders = getLocalStorageItems("cozinha");

    if (!orders) localStorage.setItem("cozinha", JSON.stringify([]));

    renderItems(items);
    renderOrders(orders);
}

function getLocalStorageItems(key) {
    const items = JSON.parse(localStorage.getItem(key))

    return items;
}

function renderItems(items) {
    let containerItems = document.getElementById("grid-pedidos");
    let generalTemplate = ""

    items.map((product) => {
        const price = product.quant * parseInt(product.price);

        generalTemplate +=
            `
        <div class="produto_valor">
            <div class="imagem_nome">
                <img src=${product.image} alt="foto do produto">
                <h1>${product.name}</h1>
            </div>
            <p id="vis_price${product.id}">R$ ${price}</p>
        </div>
        <div class="contagem_pedidos">
            <button onclick="remover(${product.id})" id="bt1">-</button>
            <div id="vis_id${product.id}">
            <input type="text" value=${product.quant} disabled="disabled">
            </div>
            <button  onclick="adicionar(${product.id})" id="bt2">+</button>
        </div>
        `
    });

    containerItems.insertAdjacentHTML("beforeend", generalTemplate)

}

function adicionar(objid) {
    let pedidos = getLocalStorageItems("pedido")
    let ident = `vis_id${objid}`
    let divvis = document.getElementById(ident)
    let identprice = `vis_price${objid}`
    let divprice = document.getElementById(identprice)
    pedidos.map((itm) => {
        if (itm.id == objid) {
            itm.quant++
            txt = `<input type="text" value=${itm.quant} disabled="disabled">`

            const price = itm.quant * parseInt(itm.price);
            prc = `R$ ${price}`
        }
        localStorage.setItem("pedido", JSON.stringify(pedidos));
        divvis.innerHTML = txt
        divprice.innerHTML = prc
    })
}

function remover(objid) {
    let pedidos = getLocalStorageItems("pedido")
    let ident = `vis_id${objid}`
    let divvis = document.getElementById(ident)
    let identprice = `vis_price${objid}`
    let divprice = document.getElementById(identprice)
    pedidos.map((itm) => {
        if (itm.id == objid) {
            if (itm.quant == 0) return
            itm.quant--
            txt = `<input type="text" value=${itm.quant} disabled="disabled">`

            const price = itm.quant * parseInt(itm.price);
            prc = `R$ ${price}`
        }
        localStorage.setItem("pedido", JSON.stringify(pedidos));
        divvis.innerHTML = txt
        divprice.innerHTML = prc
    })
}


function clearItems() {
    let containerItems = document.getElementById("grid-pedidos");

    localStorage.setItem("pedido", JSON.stringify([]));

    containerItems.innerHTML = "";

}


async function postOrders(order) {
    const fetchConfig = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    }

    try {
        const response = await fetch("http://localhost:3000/orders", fetchConfig);

        const data = await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function tableExists(idTable) {
    try {
        const response = await fetch(`http://localhost:3000/orders?id-mesa=${idTable}`);

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getExistingOrderId(idTable) {
    const table = await tableExists(idTable);

    if (table.length === 0) {
        return false;
    } else {
        return table[0].id;
    }

}

async function updateOrderById(id, idTable, orders) {
    const fetchConfig = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id-mesa": parseInt(idTable), orders: orders })
    }

    try {
        const response = await fetch(`http://localhost:3000/orders/${id}`, fetchConfig);

        const data = await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function addOrders() {
    const urlParams = new URLSearchParams(window.location.search);
    const idTable = urlParams.get("id-mesa");

    const items = getLocalStorageItems("pedido");

    if (!items.length) return;

    const orders = getLocalStorageItems("cozinha");

    const merge = [...items, ...orders]

    const orderPayload = {
        "id-mesa": parseInt(idTable),
        orders: items
    }

    const id = await getExistingOrderId(idTable);

    localStorage.setItem("cozinha", JSON.stringify(merge));

    if (id) {
        await updateOrderById(id, idTable, merge);

        renderOrders(items);

        clearItems();

        return;
    }

    postOrders(orderPayload);

    renderOrders(items);

    clearItems();
}

function renderOrders(orders) {
    let containerOrders = document.getElementById("carrinho-conta");
    let generalTemplate = "";

    orders.map((order) => {
        const price = order.quant * parseInt(order.price);

        generalTemplate +=
            `<div class="produto_valor2">
            <div class="imagem_nome">
                <img src=${order.image} alt="foto do produto">
                <h1>${order.name}</h1>
            </div>
            <p>R$ ${price}</p>
        </div>`
    })

    containerOrders.insertAdjacentHTML("beforeend", generalTemplate)
}

function goBack() {
    window.history.back()
}