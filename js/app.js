import { CONFIG, TRANSLATIONS, MOCK_DATA } from './config.js';
import Dashboard from './dashboard.js';
import CrudView from './crud.js';

const App = {
    state: {
        user: JSON.parse(localStorage.getItem('user')),
        lang: localStorage.getItem('lang') || 'fr',
        currentEntity: 'dashboard',
        data: {}
    },
    init: async () => {
        App.loadData();
        App.applyLanguage();
        App.setupListeners();

        if (App.state.user) {
            App.showLayout();
        } else {
            document.getElementById('auth-screen').classList.remove('hidden');
        }
    },

    loadData: () => {
        const stored = localStorage.getItem('app_data');
        App.state.data = stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(MOCK_DATA));
    },

    saveData: () => {
        localStorage.setItem('app_data', JSON.stringify(App.state.data));
    },

    setupListeners: () => {
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const pass = document.getElementById('password').value;
            const user = CONFIG.users.find(u => u.email === email && u.password === pass);

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                App.state.user = user;
                document.getElementById('auth-screen').classList.add('hidden');
                App.showLayout();
            } else {
                App.showToast(App.t('msgLoginError'), 'error');
            }
        });
    },
    showLayout: () => {
        document.getElementById('app-layout').classList.remove('hidden');
        document.getElementById('nav-username').textContent = App.state.user.name;
        document.getElementById('user-avatar').textContent = App.state.user.initials;
        App.renderSidebar();
        App.navigate(App.state.currentEntity);
    },

    renderSidebar: () => {
        const nav = document.getElementById('nav-links');
        nav.innerHTML = '';

        Object.keys(CONFIG.entities).forEach(key => {
            const ent = CONFIG.entities[key];
            const isActive = App.state.currentEntity === key ? 'active' : '';

            const item = document.createElement('div');
            item.className = `nav-item ${isActive}`;
            item.innerHTML = `<i class="fas ${ent.icon}"></i> <span>${App.t(ent.label)}</span>`;
            item.onclick = () => App.navigate(key);
            nav.appendChild(item);
        });
    },

    navigate: (entity) => {
        App.state.currentEntity = entity;
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        const activeItem = Array.from(document.querySelectorAll('.nav-item')).find(el => el.onclick.toString().includes(`'${entity}'`));
        if(activeItem) activeItem.classList.add('active');
        const labelKey = CONFIG.entities[entity]?.label || 'dashboard';
        document.getElementById('page-title').textContent = App.t(labelKey);
        const container = document.getElementById('content-area');
        if (entity === 'dashboard') {
            Dashboard.render(container);
        } else {
            CrudView.render(container, entity);
        }
        if (window.innerWidth < 768) {
            document.getElementById('sidebar').classList.remove('open');
        }
    },
    t: (key) => {
        if (typeof key === 'object') return key[App.state.lang] || key['fr'];
        return TRANSLATIONS[App.state.lang][key] || key;
    },

    setLanguage: (lang) => {
        App.state.lang = lang;
        localStorage.setItem('lang', lang);
        App.applyLanguage();
        App.renderSidebar();
        App.navigate(App.state.currentEntity);
    },

    applyLanguage: () => {
        const html = document.documentElement;
        html.lang = App.state.lang;
        if (App.state.lang === 'ar') {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = App.t(key);
        });

        document.getElementById('lang-selector').value = App.state.lang;
    },
    logout: () => {
        localStorage.removeItem('user');
        location.reload();
    },
    toggleSidebar: () => {
        document.getElementById('sidebar').classList.toggle('open');
    },
    showToast: (msg, type = 'success') => {
        const container = document.getElementById('toast-container');
        const el = document.createElement('div');
        el.className = `toast ${type}`;
        el.innerHTML = `<span>${msg}</span> <i class="fas ${type === 'success' ? 'fa-check' : 'fa-exclamation-circle'}"></i>`;
        container.appendChild(el);
        setTimeout(() => {
            el.style.opacity = '0';
            setTimeout(() => el.remove(), 300);
        }, 3000);
    },

    openModal: (title, body, footer) => {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-body').innerHTML = body;
        document.getElementById('modal-footer').innerHTML = footer;
        const overlay = document.getElementById('modal-overlay');
        overlay.classList.add('open');
    },
    closeModal: () => {
        document.getElementById('modal-overlay').classList.remove('open');
    }
};

export default App;