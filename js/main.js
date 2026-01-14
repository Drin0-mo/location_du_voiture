import App from './app.js';
import Dashboard from './dashboard.js';
import CrudView from './crud.js';

window.App = App;
window.Dashboard = Dashboard;
window.CrudView = CrudView;
window.addEventListener('DOMContentLoaded', App.init);