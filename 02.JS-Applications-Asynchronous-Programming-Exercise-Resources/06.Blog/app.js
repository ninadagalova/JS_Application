function attachEvents() {
    const btnLoadPosts = document.getElementById('btnLoadPosts');
    const btnViewPost = document.getElementById('btnViewPost');
    const postSelect = document.getElementById('posts');

    const baseURL = 'http://localhost:3030/jsonstore/blog/';

    btnLoadPosts.addEventListener('click', loadPost);

    async function loadPost (){
        const postRespons = await fetch(`${baseURL}posts`);
        const postData = await postRespons.json();
        const postObj = Object.entries(postData);

        //console.log(postObj);

        for (const [id, bodyOb] of postObj) {

            const optionEl = document.createElement('option');
            optionEl.value = id;
            optionEl.innerHTML = `${bodyOb.title}`;

            postSelect.appendChild(optionEl);
            
        }

        btnViewPost.addEventListener('click', viewPost);
        

        async function viewPost(){
           
            //console.log(postSelect.value);
    
            const postRespons = await fetch(`${baseURL}posts`);
            const postData = await postRespons.json();
            const postObj = Object.entries(postData);
    
            const commentRespons = await fetch(`${baseURL}comments`);
            const commentData = await commentRespons.json();
            const commentObj = Object.entries(commentData);

            let findPost = postObj.find(post => post[0] === postSelect.value );
            let findComment = commentObj.find(comment => comment[1].postId === postSelect.value );
    
            //console.log(findPost);
           // console.log(findComment);

            const titleH = document.getElementById('post-title');
            const bodyEl = document.getElementById('post-body');

            titleH.innerHTML = `${findPost[1].title}`;
            bodyEl.innerHTML = `${findPost[1].body}`;

            const commentUlEl = document.getElementById('post-comments');

            
                const liEl = document.createElement('li');
                liEl.id= findComment[0];
                liEl.innerHTML = `${findComment[1].text}`;

            commentUlEl.appendChild(liEl);
    
        }
    }


}

attachEvents();