
  
 

let cotizaciones = [];

let traer = () => {
  fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then(res => res.json())
    .then(data => {
        for (const i of data) {
            cotizaciones.push(i)
            
        }
    
    });
};

traer();

function algo() {
  for (const i of cotizaciones) {
    console.log(i.casa)    
  }
}

algo();












