import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getToken } from '../utils.js';
import usersService from '../api/userService.js';

const headerEl = document.querySelector('header');

export default function showNavPage(ctx, next) {
    const token = getToken();
    render(navTemplate(token), headerEl);
    next();
}

function navTemplate(token) {
    return html`       
       
<!-- Navigation -->
<a id="logo" href="/"><img id="logo-img" src="./images/logo.webp" alt="logo" />
      </a>
      <nav>
        <div>
          <a href="/dashboard">Collection</a>
        </div>

        <!-- Logged-in users -->
        ${token ? html`
        <div class="user">
          <a href="/create">Add Stamp</a>
          <a @click=${logoutUser}>Logout</a>
        </div>`
         :
         html`
        <!-- Guest users -->
        <div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
        `}
      </nav>
      `;
}

async function logoutUser() {
    try {
        await usersService.logout();
        page.redirect('/');
    } catch (err) {
        alert(err.message);
    }
}