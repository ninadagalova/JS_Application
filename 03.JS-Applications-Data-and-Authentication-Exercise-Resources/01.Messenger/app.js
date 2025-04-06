function attachEvents() {
    const baseUrl = 'http://localhost:3030/jsonstore/messenge'

    const textArea = document.getElementById('messages');
    const authorInput = document.querySelector('input[name="author"]');
    const contentInput = document.querySelector('input[name="content"]');
    const sendButton = document.getElementById('submit');
    const refreshButton = document.getElementById('refresh');
   

    sendButton.addEventListener('click', sendFunction);
    refreshButton.addEventListener('click', refreshFunc);

    async function sendFunction(){

    const author = authorInput.value;
    const content = contentInput.value;

    try{
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ author, content })
    });
    const data = await response.json();
        console.log(data);
}
    catch(err){
      console.error(err);
    }
        

    }

   async function refreshFunc(){

         
       try{
        const getResponse = await fetch(baseUrl);
         const getData = await getResponse.json();

         const messegeObj = Object.entries(getData);
         
        const messages = [];

         for (const [id , obj] of messegeObj) {
            //console.log(obj);
            
            messages.push( `${obj.author}: ${obj.content}`);
            
         }
         textArea.textContent = messages.join('\n');
        }
        catch(err){
          console.error(err);
        }

    }

}

attachEvents();