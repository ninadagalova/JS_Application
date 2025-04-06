import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import stampsService from '../api/stampsService.js';

const mainEl = document.querySelector('main');

export default async function showDashboardPage() {
    const stamps = await stampsService.getAll();
    console.log(stamps);
    render(dashboardTemplate(stamps), mainEl);
}

function dashboardTemplate(stamps) {
    return html`    <!-- Dashboard page -->
    <h2>Collection</h2>

   ${stamps.length > 0 ? html `
    <section id="collection">
        ${stamps.map(s => stampsTemplate(s))} 
    </section>
    ` : html `
    <h2 id="no-stamp">No Stamps Added.</h2> ` }
    `;
}

function stampsTemplate(stamps) {
    return html`
      <div class="stamp">
        <img src=${stamps.imageUrl} alt="example3" />
        <div class="stamp-info">
          <h3 class="name">${stamps.name}</h3>
          <p class="year-description">
            Year of oldest stamps - <span class="year">${stamps.year}</span> 
          </p>
          <a class="learn-more-btn" href="/details/${stamps._id}">Learn More</a>
        </div>
      </div> 
    `;
}