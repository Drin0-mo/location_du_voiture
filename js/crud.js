import App from './app.js';

const CrudView = {
    page: 1,
    limit: 5,
    sort: 'id',
    asc: true,
    search: '',

    render: (container, entity) => {
        CrudView.page = 1;
        CrudView.search = '';
        let data = App.state.data[entity];
        const cols = data.length ? Object.keys(data[0]).filter(k => k !== 'id') : ['name'];

        container.innerHTML = `
                <div class="card">
                    <div class="table-actions">
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" id="crud-search" class="form-control" placeholder="${App.t('search')}..." oninput="CrudView.filter()">
                        </div>
                        <div class="flex gap-2">
                            <button class="btn btn-outline btn-sm" onclick="CrudView.exportCSV('${entity}')"><i class="fas fa-file-csv"></i> CSV</button>
                            <button class="btn btn-primary btn-sm" onclick="CrudView.openForm('${entity}')"><i class="fas fa-plus"></i> ${App.t('add')}</button>
                        </div>
                    </div>
                    <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr><th>ID</th>
                                ${cols.map(c => `<th onclick="CrudView.sort('${c}')">${App.t(c) || c} <i class="fas fa-sort text-muted"></i></th>`).join('')}
                                <th>${App.t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody id="tb-body"></tbody>
                        </table>
                    </div>
                    <div class="pagination">
                        <span id="page-info" class="text-sm text-muted"></span>
                        <div class="flex gap-2">
                            <button class="btn btn-outline btn-sm" onclick="CrudView.change(-1)">${App.t('prev')}</button>
                            <button class="btn btn-outline btn-sm" onclick="CrudView.change(1)">${App.t('next')}</button>
                        </div>
                    </div>
                </div>
            `;
        CrudView.update(entity);
    },

    filter: () => {
        CrudView.search = document.getElementById('crud-search').value.toLowerCase();
        CrudView.page = 1;
        CrudView.update(App.state.currentEntity);
    },

    update: (entity) => {
        let data = App.state.data[entity];
        const cols = data.length ? Object.keys(data[0]).filter(k => k !== 'id') : [];

        if (CrudView.search) {
            data = data.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(CrudView.search)));
        }

        data.sort((a, b) => {
            let vA = a[CrudView.sort] || '';
            let vB = b[CrudView.sort] || '';
            return CrudView.asc ? (vA > vB ? 1 : -1) : (vA < vB ? 1 : -1);
        });

        const total = data.length;
        const start = (CrudView.page - 1) * CrudView.limit;
        const pageData = data.slice(start, start + CrudView.limit);

        const tbody = document.getElementById('tb-body');
        tbody.innerHTML = pageData.map(r => `
                <tr>
                    <td class="text-muted">#${r.id}</td>
                    ${cols.map(c => {
            let val = r[c];
            if(c === 'status') {
                const cl = val === 'Active' || val === 'Available' ? 'status-active' : 'status-inactive';
                return `<td><span class="status-badge ${cl}">${App.t(val) || val}</span></td>`;
            }
            return `<td>${val}</td>`;
        }).join('')}
                    <td>
                        <button class="btn btn-sm btn-outline" onclick="CrudView.openForm('${entity}', ${r.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-outline" style="border-color:#ef4444; color:#ef4444" onclick="CrudView.confirm('${entity}', ${r.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');

        document.getElementById('page-info').textContent = `Page ${CrudView.page} / ${Math.ceil(total/CrudView.limit) || 1}`;
    },

    sort: (col) => {
        if(CrudView.sort === col) CrudView.asc = !CrudView.asc;
        else { CrudView.sort = col; CrudView.asc = true; }
        CrudView.update(App.state.currentEntity);
    },

    change: (d) => {
        const entity = App.state.currentEntity;
        const total = App.state.data[entity].filter(r => !CrudView.search || Object.values(r).some(v => String(v).toLowerCase().includes(CrudView.search))).length;
        const max = Math.ceil(total / CrudView.limit);
        const n = CrudView.page + d;
        if (n >= 1 && n <= max) { CrudView.page = n; CrudView.update(entity); }
    },

    openForm: (entity, id = null) => {
        const isEdit = id !== null;
        const item = isEdit ? App.state.data[entity].find(i => i.id === id) : {};
        const cols = Object.keys(App.state.data[entity][0] || {}).filter(k => k !== 'id');

        let form = `<form id="f-form"><div class="flex flex-col gap-4">`;
        cols.forEach(c => {
            form += `
                    <div class="form-group">
                        <label>${App.t(c) || c}</label>
                        <input name="${c}" class="form-control" value="${item[c] || ''}" required>
                    </div>`;
        });
        form += `</div></form>`;

        const footer = `
                <button class="btn btn-outline" onclick="App.closeModal()">${App.t('cancel')}</button>
                <button class="btn btn-primary" onclick="CrudView.save('${entity}', ${id})">${App.t('save')}</button>
            `;
        App.openModal(isEdit ? App.t('edit') : App.t('add'), form, footer);
    },

    save: (entity, id) => {
        const f = document.getElementById('f-form');
        if(!f.checkValidity()) return f.reportValidity();

        const d = Object.fromEntries(new FormData(f));
        if(id) {
            const idx = App.state.data[entity].findIndex(i => i.id === id);
            App.state.data[entity][idx] = { ...App.state.data[entity][idx], ...d };
            App.showToast(App.t('msgUpdated'));
        } else {
            d.id = Date.now();
            App.state.data[entity].push(d);
            App.showToast(App.t('msgCreated'));
        }
        App.saveData();
        App.closeModal();
        CrudView.update(entity);
    },

    confirm: (entity, id) => {
        const footer = `
                <button class="btn btn-outline" onclick="App.closeModal()">${App.t('no')}</button>
                <button class="btn btn-danger" onclick="CrudView.del('${entity}', ${id})">${App.t('yes')}</button>
            `;
        App.openModal(App.t('confirmDelete'), `<p>${App.t('confirmDelete')}</p>`, footer);
    },

    del: (entity, id) => {
        App.state.data[entity] = App.state.data[entity].filter(i => i.id !== id);
        App.saveData();
        App.showToast(App.t('msgDeleted'));
        App.closeModal();
        CrudView.update(entity);
    },

    exportCSV: (entity) => {
        const d = App.state.data[entity];
        const headers = Object.keys(d[0]).join(',');
        const rows = d.map(i => Object.values(i).join(',')).join('\n');
        const blob = new Blob([headers + '\n' + rows], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${entity}.csv`;
        a.click();
    }
};

export default CrudView;