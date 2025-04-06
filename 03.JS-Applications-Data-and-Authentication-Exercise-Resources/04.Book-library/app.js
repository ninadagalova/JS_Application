console.log('My requests...') 

const  baseUrl = 'http://localhost:3030/jsonstore/collections/books';

const formEl = document.querySelector("form");
const editBtn = document.querySelectorAll('button[id=editBtn]');
const deleteBtn = document.querySelectorAll('button[id=deleteBtn]');


formEl.addEventListener("submit", submitFunc);
editBtn.forEach(btn => {
    btn.addEventListener("click", editFunc);
});
deleteBtn.forEach(btn => {
    btn.addEventListener("click", deleteFunc)
});

async function submitFunc(event){
    event.preventDefault();
      

    try{
    const formData = new FormData(event.currentTarget);

    const title = formData.get("title");
    const author = formData.get("author");

    const books = Object.fromEntries(formData);

  if(!title) throw new Error;
  if(!author) throw new Error;

  console.log(books);

   const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, author })
});

if (!response.ok) {
    throw new Error('Invalid data');
}

const postdata = await response.json();
 
    }catch{
      console.error(err);
    }
}

function editFunc(e){
    e.preventDefault();

    const target = e.currentTarget;
    const parent = target.parentElement.parentElement;

    console.log(parent);

    const id = target.parentElement.dataset.id;
    const title = parent.children[0].textContent;
    const author = parent.children[1].textContent;


    formEl.querySelector('h3').textContent = 'Edit FORM';
    const savebtn = formEl.querySelector('button').textContent = 'Save';

    const titleEdit = formEl.querySelector('input[name="title"]').value = title;
    const authorEdit = formEl.querySelector('input[name="author"]').value = author;

    formEl.querySelector('input[name="author"]').dataset.id = id;

}

async function deleteFunc(_id) {

    

    await fetch(`${baseUrl}/${id}`,{
        method: 'DELETE'
    });
}