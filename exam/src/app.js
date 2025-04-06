import page from '../node_modules/page/page.mjs';


import showCreatePage from './view/create.js';
import showDetailsPage from './view/details.js';
import showEditPage from './view/edit.js';
import showHomePage from './view/home.js';
import showLoginPage from './view/login.js';
import showDashboardPage from './view/dashboard.js';
import showRegisterPage from './view/register.js';
import showNavPage from './view/navigation.js';

page (showNavPage);
page('/', showHomePage);
page('/register', showRegisterPage);
page('/login', showLoginPage);
page('/create', showCreatePage);
page('/details/:id', showDetailsPage);
page('/edit/:id', showEditPage);
page('/dashboard', showDashboardPage);


page.start();