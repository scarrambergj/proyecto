let cotizaciones;
let cotizacion = $('#cotizacion');
let fecha = new Date().toLocaleString();

let traer = async () => {
    await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then(res => res.json())
    .then(data => {
          cotizaciones = data.filter(element => {
          return element.casa.nombre == 'Dolar Oficial' || 
          element.casa.nombre == 'Dolar Blue' ||
          element.casa.nombre == 'Dolar Contado con Liqui' ||
          element.casa.nombre == 'Dolar' ||
          element.casa.nombre == 'Dolar Bolsa' ||
          element.casa.nombre == 'Dolar turista'
        })
       });
};


let cargar = async () => {
  traer();
  await traer();
  enviar();
}

cargar();

let enviar = () => {
  for (const i of cotizaciones) {
    let nombre = i.casa.nombre;
    cotizacion.append(`<div class="col-4 my-3">
    <div class="px-5 cotizacion">
    <div class="row">
      <img src="/public/images/dolaroficial.png">
      <h1> ${nombre.toUpperCase()}</h1>
    </div>
    <div class="row">
      <div class="col">
        <p>COMPRA</p>
        <p> ${i.casa.compra} </p>
      </div>
      <div class="col">
        <p>VENTA</p>
        <p> ${i.casa.venta} </p>
      </div>
    </div>
    <div class="row">
      <p>VARIACION</p>
      <p> ${i.casa.variacion} </p>
    </div>
    <div class="row">
      <p>ACTUALIZADO: ${fecha}</p>
    </div>
    </div>       
  </div>`)
  }
}


  







/* <div class="col-sm w-75" id="cotizacion">
          <div class="row">
            <img src="/public/images/dolaroficial.png">
            <h1>DOLAR OFICIAL</h1>
          </div>
          <div class="row">
            <div class="col">
              <p>COMPRA</p>
            </div>
            <div class="col">
              <p>VENTA</p>
            </div>
          </div>
          <div class="row">
            <p>VARIACION</p>
          </div>
          <div class="row">
            <p>ACTUALIZADO:</p>
          </div>       
        </div> */
