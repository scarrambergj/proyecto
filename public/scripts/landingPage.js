let cotizaciones = [];




addEventListener('load', fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    .then(data => data.json())
    .then(data => {
    for (const i of data) {
        cotizaciones.push(i);
        }
}))









