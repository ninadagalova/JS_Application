function solve() {

  const baseUrl = 'http://localhost:3030';

// Function to load furniture
async function loadFurniture() {
    const response = await fetch(`${baseUrl}/data/furniture`);
    const furniture = await response.json();
    renderFurniture(furniture);
}

// Function to render furniture in a table
function renderFurniture(furniture) {
    const tableBody = document.querySelector('#furnitureTable tbody');
    tableBody.innerHTML = '';
    
    furniture.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.img}" width="100"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.factor}</td>
            <td><input type="checkbox" disabled></td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to handle login
async function login(email, password) {
    const response = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.accessToken) {
        sessionStorage.setItem('userToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        window.location.href = 'index.html';
    }
}

// Function to handle registration
async function register(email, password) {
    const response = await fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return await response.json();
}

// Function to create furniture
async function createFurniture(name, price, factor, img) {
    const token = sessionStorage.getItem('userToken');
    if (!token) return;
    
    await fetch(`${baseUrl}/data/furniture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': token },
        body: JSON.stringify({ name, price, factor, img })
    });
    loadFurniture();
}

// Function to buy furniture
async function buyFurniture() {
    const token = sessionStorage.getItem('userToken');
    if (!token) return;
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const orders = Array.from(checkboxes).map(cb => cb.closest('tr').querySelector('td:nth-child(2)').textContent);
    
    await fetch(`${baseUrl}/data/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': token },
        body: JSON.stringify({ orders })
    });
}

// Function to list bought furniture
async function listBoughtFurniture() {
    const userId = sessionStorage.getItem('userId');
    const response = await fetch(`${baseUrl}/data/orders?where=_ownerId%3D${userId}`);
    const orders = await response.json();
    
    let totalPrice = 0;
    orders.forEach(order => totalPrice += order.price);
    
    document.querySelector('#orderSummary').textContent = `Total: ${totalPrice.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', loadFurniture);
}

solve();