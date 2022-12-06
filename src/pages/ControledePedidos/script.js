function renderPedido(pedido, id) {
  const {name, quant, image} = pedido;

  let containerGeral = document.getElementById(`content-mesa-${id}`)
  let divPedido = ""

  divPedido += 
    `
    <div class="content-pedido">
    <div class="name-img">
      <div class="img">
        <img src=${image} alt="">
      </div>
      <div class="text">
        <p>${name}</p>
        <p>${quant}</p>
      </div>
    </div>
    <button class="button">Pedido pronto</button>
    </div>
  `

  containerGeral.insertAdjacentHTML("beforeend", divPedido)
}

function renderMesas(pedidos){ 
    let container = document.getElementById("container");

    pedidos.map((pedido) => {
      const idDiv = Math.floor(Math.random()*1000);

      const generalTemplate=`
        <div id="content-mesa-${idDiv}" class="content-mesa">
          <h2>Mesa ${pedido["id-mesa"]}</h2>
        </div>`
        container.insertAdjacentHTML("beforeend", generalTemplate)

        pedido.orders.map((el)=> renderPedido(el, idDiv))
    });

}

async function getOrders(){
  try {
    const response = await fetch("http://localhost:3000/orders");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

window.onload = async function () {
  const pedidos = await getOrders();

  renderMesas(pedidos);  
}