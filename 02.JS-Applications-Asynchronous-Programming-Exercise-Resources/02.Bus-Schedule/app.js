function solve() {
    let infoDivEl = document.querySelector('.info');
    let buttonDepart = document.getElementById('depart');
    let buttonArrive = document.getElementById('arrive');
    let stopData = {
        name: '',
        next: 'depot'
    }
    

   async function depart() {
    
       

        try {
            buttonDepart.disabled = true;
            const stopResponse = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stopData.next}`);
             stopData = await stopResponse.json();
            //console.log(stopData);
            //stopIDInput = stopData.next;
            infoDivEl.textContent = `Next stop ${stopData.name}`;
            
            buttonArrive.disabled = false;
            if(!stopResponse.ok) throw new Error;
            
    
            
        } catch (err) {
           
            infoDivEl.textContent = 'Error';
            buttonDepart.disabled = true;
            buttonArrive.disabled = true;
        }
       // console.log(infoDivEl);
    }

    async function arrive() {

        
        try {
            if(!stopData.name) throw new Error 
            infoDivEl.textContent = `Arriving at ${stopData.name}`;
            buttonArrive.disabled = true;
            buttonDepart.disabled = false;
        
            
    
            
        } catch (err) {
           
            infoDivEl.textContent = 'Error';
            buttonDepart.disabled = true;
            buttonArrive.disabled = true;
        }
       
    }
        
    

    return {
        depart,
        arrive
    };

}

let result = solve();