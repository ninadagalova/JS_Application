import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import usersService from '../api/userService.js';

const mainEl = document.querySelector('main');

export default function showRegisterPage() {
    render(registerTemplate(), mainEl);
}

function registerTemplate() {
    return html`
         <!-- Register Page (Only for Guest users) -->
         <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form  @submit=${registerUser} class="register-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>
    `;
}
async function registerUser(e){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData);
    console.log(userData);

    if (!userData.email || !userData.password || !userData['re-password']) {
        return alert('All fields are required!');
    }

    if (userData['password'] !== userData['re-password']) {
        return alert('Passwords must match!');
    }


    try {
        const result = await usersService.register(userData);
        console.log(result);
        page.redirect('/');
    } catch (err) {
        alert(err.message);
    }
}