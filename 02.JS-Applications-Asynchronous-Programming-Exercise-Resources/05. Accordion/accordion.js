async function solution() {
  let baseUrl = 'http://localhost:3030/jsonstore/advanced/articles'
  const mainSection = document.getElementById('main');

  const artRespons = await fetch(`${baseUrl}/list`);
  const articlesData = await artRespons.json();

  //const objectarticle = Object.keys(articlesData);

  //console.log(articlesData);

  for (const element of articlesData) {
    //console.log(element._id);
    const paragRespons = await fetch(`${baseUrl}/details/${element._id}`);
    const pData = await paragRespons.json();
    

    const accordionDivEl = document.createElement('div');
    accordionDivEl.className = 'accordion';
  
    const headDivEl = document.createElement('div');
    headDivEl.className = 'head';

    const nameArticleSpan = document.createElement('span');
    nameArticleSpan.textContent = element.title;

    const buttonEl = document.createElement('button');
    buttonEl.className = 'button';
    buttonEl.id = element._id;
    buttonEl.textContent = 'More';

    const extraDivEl = document.createElement('div');
    extraDivEl.className = 'extra';

    const pEl = document.createElement('p');
    pEl.innerHTML = `${pData.content}`
  
    headDivEl.appendChild(nameArticleSpan);
    headDivEl.appendChild(buttonEl);
 
    extraDivEl.appendChild(pEl);
    
    accordionDivEl.appendChild(headDivEl);
    accordionDivEl.appendChild(extraDivEl);
    mainSection.appendChild(accordionDivEl);
    
    const buttonElId = document.getElementById(`${element._id}`);
    buttonElId.addEventListener('click', moreInfo);

    function moreInfo (){
        if(buttonElId.textContent ==='More'){
            extraDivEl.style.display = 'block';
            buttonElId.textContent = 'Less';
        }else{
            extraDivEl.style.display = 'none';
            buttonElId.textContent = 'More';
        }
    }
  }




  
 
}
solution();