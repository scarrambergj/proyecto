let cotizaciones;
let cotizacion = $("#cotizacion");
let fecha = new Date().toLocaleString();

let traer = async () => {
  await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then((res) => res.json())
    .then((data) => {
      cotizaciones = data.filter((element) => {
        return (
          element.casa.nombre == "Dolar Oficial" ||
          element.casa.nombre == "Dolar Blue" ||
          element.casa.nombre == "Dolar Contado con Liqui" ||
          element.casa.nombre == "Dolar" ||
          element.casa.nombre == "Dolar Bolsa" ||
          element.casa.nombre == "Dolar turista"
        );
      });
    });
};



let agregarImagenes = () => {
  cotizaciones.forEach((element, i) => {
    element.casa.img = "/public/images/dolar" + i + ".png";
  });
};

let agregarReferencia = () => {
  cotizaciones.map((element) => {
    if (
      element.casa.nombre === "Dolar Oficial" ||
      element.casa.nombre === "Dolar Blue" ||
      element.casa.nombre === "Dolar"
    ) {
      element.casa.referencia = "compraventa";
    } else if (
      element.casa.nombre === "Dolar Bolsa" ||
      element.casa.nombre === "Dolar Contado con Liqui"
    ) {
      element.casa.referencia = "referencia";
    } else {
      element.casa.referencia = "venta";
    }
  });
};

let promedio = () => {
  let dolares = cotizaciones.filter((element) => "variacion" in element.casa);
  let promedioDeVariaciones = () => {
    let variaciones = [];
    for (const i of dolares) {
      variaciones.push(i.casa.variacion);
    }
    return (variaciones.reduce((acc, val) => acc + val) / variaciones.length).toFixed(2);
  };
  return promedioDeVariaciones();
};

let modificarArray = () => {
  agregarImagenes();
  agregarReferencia();
  cotizaciones.map((element) =>
    element.casa.nombre === "Dolar"
      ? (element.casa.nombre = "dolar promedio")
      : ""
  );
  cotizaciones.map((element) =>
    "variacion" in element.casa
      ? (element.casa.variacion = parseFloat(
          element.casa.variacion.replace(",", ".")
        ))
      : ""
  );
  cotizaciones.map((element) =>
    element.casa.nombre === "dolar promedio"
      ? (element.casa.variacion = promedio())
      : ""
  );
};

let signoVariacion = (object) => {
  let numero = object.casa.variacion;
  if (numero < 0) {
    return `<i class="bi bi-caret-down-fill text-danger"></i>`;
  } else if (numero > 0) {
    return `<i class="bi bi-caret-up-fill text-success"></i>`;
  } else {
    return `<i class="bi bi-dash text-secondary"></i>`;
  }
};

let enviarReferencia = (object) => {
  if (object.casa.referencia === "compraventa") {
    return ` <div class="col">
    <p>COMPRA</p>
    <p> $ ${object.casa.compra} </p>
  </div>
  <div class="col">
    <p>VENTA</p>
    <p> $ ${object.casa.venta} </p>
  </div> `;
  } else if (object.casa.referencia === "venta") {
    return ` <div class="col">
        <p>VENTA</p>
        <p> $ ${object.casa.venta} </p>
     </div>`;
  } else {
    return ` <div class="col">
        <p>REFERENCIA</p>
        <p> $ ${object.casa.compra} </p>
     </div>`;
  }
};

let enviar = () => {
  for (const i of cotizaciones) {
    let nombre = i.casa.nombre;
    cotizacion.append(`<div class="col-4 my-3">
    <div class="px-5 py-3 bg-light border border-dark shadow-sm rounded">
    <div class='row'>
      <img src='${i.casa.img}'>
      <h1> ${nombre.toUpperCase()}</h1>
    </div>
    <div class="row referencia">
      ${enviarReferencia(i)}
    </div>
    <div class="row">
      <p>VARIACIÓN</p>
     ${signoVariacion(i)}
      <p> ${i.casa.variacion}% </p>
    </div>
    <div class="row">
      <p>ACTUALIZADO: ${fecha}</p>
    </div>
    </div>       
  </div>`);
  }
};

let cargar = async () => {
  await traer();
  modificarArray();
  enviar();
};

cargar();