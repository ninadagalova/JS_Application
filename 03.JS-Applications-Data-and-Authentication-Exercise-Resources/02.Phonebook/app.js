function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';
    const ulEl = document.getElementById('phonebook');
    const personInputEl = document.getElementById('person');
    const phoneInputEl = document.getElementById('phone');
    const btnLoad = document.getElementById('btnLoad');
    const btnCreate = document.getElementById('btnCreate');


    btnLoad.addEventListener('click', loadFunction);
    btnCreate.addEventListener('click', creatFunction);

    async function loadFunction(){
        ulEl.innerHTML = '';

        const getResponse = await fetch(baseUrl);
        const getData = await getResponse.json();

        const phoneBook = Object.values(getData);
        console.log(phoneBook);

        for (const {person, phone, _id} of phoneBook) {

            const liEl = document.createElement('li');
            liEl.textContent= `${person}: ${phone}`;

            const btnDelete = document.createElement('button');
            btnDelete.textContent = 'Delete';

            liEl.appendChild(btnDelete);
            ulEl.appendChild(liEl);

            btnDelete.addEventListener('click', (e) => deleteFunc(_id));
            
        }
        async function deleteFunc(_id) {
            await fetch(`${baseUrl}/${_id}`,{
                method: 'DELETE'
            });
        }


    }

   async function creatFunction(){

        const person = personInputEl.value;
        const phone = phoneInputEl.value;

        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ person, phone })
        });

        const data = await response.json();
        console.log(data);

    }

}

attachEvents();