import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';


import stampService from '../api/stampsService.js';

const mainEl = document.querySelector('main');

export default async function showEditPage(ctx) {
    const stampId = ctx.params.id;
    const stamp = await stampService.getById(stampId);
    render(editTemplate(stamp), mainEl);
}

function editTemplate(stamp) {
    return html`
           <!-- Edit Page (Only for logged-in users) -->
           <section id="edit">
        <div class="form">
          <h2>Edit Post Stamp</h2>
          <form @submit=${(e) => editStamp(e, stamp._id)} class="edit-form">
            <input type="text" name="name-input" id="name" placeholder="Stamp Name"  value=${stamp.name} />
            <input type="text" name="image-url-input" id="image-url" placeholder="Image URL" value=${stamp.imageUrl} />
            <input type="number" id="year-input" name="year-input" placeholder="Year" value=${stamp.year} />
            <textarea id="more-info" name="more-info-textarea" placeholder="More Info" rows="8" cols="10"> ${stamp.learnMore}  </textarea>
            <button type="submit">Edit</button>
          </form>
        </div>
      </section>
    `;
}

async function editStamp(e, stampId) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (Object.values(data).some(val => val === '')) {
        return alert('All fields are required!');
    }

    try {
        const result = await stampService.update(stampId, data);
        console.log(result);
        page.redirect(`/details/${stampId}`);
    } catch (err) {
        alert(err.message);
    }
}