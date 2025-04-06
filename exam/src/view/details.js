import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';


import stampsService from '../api/stampsService.js';
import { checkIsOwner, getUserId} from '../utils.js';

const mainEl = document.querySelector('main');

export default async function showDetailsPage(ctx) {
    const stampId = ctx.params.id;
    const isLogged = getUserId();
    console.log(isLogged);

    //const token = getToken();
    const stamp = await stampsService.getById(stampId);
    const likesStap = await stampsService.getLikes(stampId);

    const isLiked = await stampsService.isLiked(stampId, isLogged);
     
    console.log(likesStap);
    console.log(isLiked);
    const isOwner = checkIsOwner(stamp);
    render(detailsTemplate(stamp, isOwner, likesStap, isLogged, isLiked ), mainEl);
}

function detailsTemplate(stamp, isOwner, likesStap, isLogged, isLiked  ) {
    return html`

      <!-- Details page -->
      <section id="details">
        <div id="details-wrapper">
          <img id="details-img" src=${stamp.imageUrl} alt="example1" />
          <div>
            <p id="details-name">${stamp.name}</p>
            <div id="info-wrapper">
              <div id="details-year-description">
                <p id="year-description">
                  Year of oldest stamps - <span id="year">${stamp.year}</span> 
                </p>
                <p id="more-info">
                ${stamp.learnMore}
                </p>
              </div>
            </div>

            <h3>Stamp total likes:<span id="likes">${likesStap}</span></h3>

            <!--Edit and Delete are only for creator-->
           
            <div id="action-buttons">
               ${isOwner ? html`
              <a href="/edit/${stamp._id}" id="edit-btn">Edit</a>
              <a @click=${() => deleteStamp(stamp._id)} id="delete-btn">Delete</a>`: ''}

              <!--Bonus - Only for logged-in users ( not authors )-->
               ${isLogged && !isOwner && !isLiked ? html`
              <a @click=${() => onLike(stamp._id)} href="javascript:void(0)" id="like-btn">Like</a>`:''}

            </div>
          </div>
        </div>
      </section>
    `;
}

async function deleteStamp(stampId) {
    const confirmDelete = confirm('Are you sure you want to delete this show?');

    if (confirmDelete) {
        try {
            await stampsService.deleteById(stampId);
            page.redirect('/dashboard');
        } catch (err) {
            alert(err.message);
        }
    }
}

async function onLike( stampId) {

  await stampsService.onLike(stampId);
  page.redirect(`/details/${stampId}`);
}