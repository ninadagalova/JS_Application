import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

import stampsService from '../api/stampsService.js';

const mainEl = document.querySelector('main');

export default async function showCreatePage() {
    render(createTemplate(), mainEl);
}

function createTemplate() {
    return html`
             <!-- Create Page (Only for logged-in users) -->
      <section id="create">
        <div class="form">
          <h2>Add Post Stamp</h2>
          <form @submit=${createStamp}  class="create-form">
            <input type="text" name="name-input" id="name-input" placeholder="Stamp Name" />
            <input type="text" name="image-url-input" id="image-url-input" placeholder="Image URL" />
            <input type="number" id="year-input" name="year-input" placeholder="year" />
            <textarea id="more-info-textarea" name="more-info-textarea" placeholder="More Info" rows="8" cols="10"></textarea>
            <button type="submit">Add Stamp</button>
          </form>
        </div>
      </section>
    `;
}

async function createStamp(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const stampData = Object.fromEntries(formData);

    if (Object.values(stampData).some(val => val === '')) {
        return alert('All fields are required!');
    }

    try {
        const result = await stampsService.create(stampData);
        console.log(result);
        page.redirect('/dashboard');
    } catch (err) {
        alert(err.message);
    }
}