
    const baseUrl = 'http://localhost:3030/jsonstore/collections/students'
    const tableEl = document.querySelector('tbody');
    const formEl = document.getElementById("form");

    formEl.addEventListener("submit", submitFunc)
    
   async function submitFunc(event) {

      event.preventDefault();
      

      try{
      const formData = new FormData(event.currentTarget);

      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const facultyNumber = formData.get("facultyNumber");
      const grade = formData.get("grade");

      const students = Object.fromEntries(formData);

    if(!students) throw new Error;
    if(!firstName) throw new Error;
    if(!lastName) throw new Error;
    if(!facultyNumber) throw new Error;
    if(!grade) throw new Error;
    
      
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, facultyNumber, grade })
    });

    if (!response.ok) {
        throw new Error('Invalid data');
    }

    const postdata = await response.json();

    }catch{
        console.log(err);
    }
  

   }

   async function getData() {

    const getResponse = await fetch(baseUrl);
    const getData = await getResponse.json();

     const studentInfo = Object.values(getData);

     if (!getResponse.ok) {
         throw new Error('Invalid getData');
     }

     for (const {firstName, lastName, facultyNumber, grade} of studentInfo) {
         
         const trEl = document.createElement('tr');
         
         const firstNameThEl = document.createElement('td')
         firstNameThEl.textContent = firstName;

         const lastNameThEl = document.createElement('td')
         lastNameThEl.textContent = lastName;

         const facultyNumberThEl = document.createElement('td')
         facultyNumberThEl.textContent = facultyNumber;

         const gradeThEl = document.createElement('td')
         gradeThEl.textContent = grade;

         trEl.appendChild(firstNameThEl);
         trEl.appendChild(lastNameThEl);
         trEl.appendChild(facultyNumberThEl);
         trEl.appendChild(gradeThEl);

         tableEl.appendChild(trEl);

     }
    
   }
   getData();