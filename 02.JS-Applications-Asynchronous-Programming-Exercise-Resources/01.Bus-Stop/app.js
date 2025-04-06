 async function getInfo() {
    let stopIDInput = document.getElementById('stopId').value;
    let stopName = document.getElementById('stopName');

    let busesUL = document.getElementById('buses');

   // console.log(stopIDInput);
    try {
        const stopResponse = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopIDInput}`);
        const stopData = await stopResponse.json();
        //console.log(stopData);
        stopName.textContent = stopData.name;
        //console.log(stopData.name);

        const busesObj = stopData.buses;
        const busesEntries = Object.entries(busesObj);

        busesUL.innerHTML = '';

    

        for (const [busId, time] of busesEntries) {
            const busLiEl = document.createElement('li');
            busLiEl.textContent = `Bus ${busId} arrives in ${time} minutes`;
            busesUL.appendChild(busLiEl);
        }
    } catch (err) {
        busesUL.innerHTML = '';
        stopName.textContent = 'Error';
    }

}