import App from './app.js';

const Dashboard = {
    charts: [],

    render: (container) => {
        const data = App.state.data;

        const kpis = [
            { label: 'kpiVehicles', val: data.vehicles.length, icon: 'fa-car', color: 'blue' },
            { label: 'kpiRentals', val: data.rentals.filter(r => r.status === 'Active').length, icon: 'fa-key', color: 'green' },
            { label: 'kpiRevenue', val: data.payments.reduce((s,p) => s + Number(p.amount), 0) + ' DH', icon: 'fa-coins', color: 'yellow' },
            { label: 'kpiClients', val: data.clients.length, icon: 'fa-users', color: 'purple' },
            { label: 'kpiAgencies', val: data.agencies.length, icon: 'fa-building', color: 'orange' },
        ];

        let html = `<div class="kpi-grid">`;
        kpis.forEach(k => {
            html += `
                    <div class="card" style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <div class="text-muted text-sm">${App.t(k.label)}</div>
                            <div class="kpi-value">${k.val}</div>
                        </div>
                        <div class="kpi-icon-bg" style="color:var(--${k.color === 'yellow' ? 'warning' : k.color === 'red' ? 'danger' : k.color === 'green' ? 'success' : k.color === 'purple' ? 'secondary' : 'primary'}); background: #f1f5f9;">
                            <i class="fas ${k.icon}"></i>
                        </div>
                    </div>`;
        });
        html += `</div>`;

        html += `<div class="charts-container">
                <div class="card"><div class="chart-wrapper"><canvas id="c1"></canvas></div></div>
                <div class="card"><div class="chart-wrapper"><canvas id="c2"></canvas></div></div>
                <div class="card"><div class="chart-wrapper"><canvas id="c3"></canvas></div></div>
                <div class="card"><div class="chart-wrapper"><canvas id="c4"></canvas></div></div>
            </div>`;

        container.innerHTML = html;
        setTimeout(Dashboard.initCharts, 50);
    },

    initCharts: () => {
        const d = App.state.data;
        const ctx = id => document.getElementById(id).getContext('2d');
        const commonOpts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } };

        Dashboard.charts.forEach(c => c.destroy());
        Dashboard.charts = [];

        Dashboard.charts.push(new Chart(ctx('c1'), {
            type: 'doughnut',
            data: {
                labels: [
                    App.t('statusActive'),
                    App.t('statusCompleted'),
                    App.t('statusCancelled')
                ],
                datasets: [{
                    data: [
                        d.rentals.filter(r=>r.status==='Active').length,
                        d.rentals.filter(r=>r.status==='Completed').length,
                        d.rentals.filter(r=>r.status==='Cancelled').length
                    ],
                    backgroundColor: ['#10b981', '#3b82f6', '#ef4444']
                }]
            },
            options: { ...commonOpts, cutout: '70%', plugins: { title: { display: true, text: App.t('chartTrend'), align: 'center' }, legend: { display: false } } }
        }));

        const monthlyRevenue = new Array(12).fill(0);
        d.payments.forEach(p => {
            const dateParts = p.date.split('-');
            if(dateParts.length >= 2) {
                const monthIndex = parseInt(dateParts[1], 10) - 1;
                if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12) {
                    monthlyRevenue[monthIndex] += Number(p.amount);
                }
            }
        });

        const monthLabels = Array.from({length: 12}, (_, i) => {
            const date = new Date(2024, i, 1);
            return date.toLocaleString(App.state.lang, { month: 'short' });
        });

        Dashboard.charts.push(new Chart(ctx('c2'), {
            type: 'bar',
            data: {
                labels: monthLabels,
                datasets: [{
                    label: App.t('kpiRevenue'),
                    data: monthlyRevenue,
                    backgroundColor: '#3b82f6',
                    borderRadius: 4
                }]
            },
            options: { ...commonOpts, plugins: { title: { display: true, text: App.t('chartRevenue') } }, scales: { y: { beginAtZero: true, grid: { display: false } }, x: { grid: { display: false } } } }
        }));

        Dashboard.charts.push(new Chart(ctx('c3'), {
            type: 'pie',
            data: {
                labels: [App.t('Available'), App.t('Rented'), App.t('Maintenance')],
                datasets: [{
                    data: [
                        d.vehicles.filter(v=>v.status==='Available').length,
                        d.vehicles.filter(v=>v.status==='Rented').length,
                        d.vehicles.filter(v=>v.status==='Maintenance').length
                    ],
                    backgroundColor: ['#10b981', '#f59e0b', '#ef4444']
                }]
            },
            options: { ...commonOpts, plugins: { title: { display: true, text: App.t('chartStatus') } } }
        }));
        const monthlyRentals = new Array(12).fill(0);

        d.rentals.forEach(r => {
            if (r.startDate) {
                const dateParts = r.startDate.split('-');
                if(dateParts.length >= 2) {
                    const monthIndex = parseInt(dateParts[1], 10) - 1;
                    if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12) {
                        monthlyRentals[monthIndex]++;
                    }
                }
            }
        });

        Dashboard.charts.push(new Chart(ctx('c4'), {
            type: 'line',
            data: {
                labels: monthLabels,
                datasets: [{
                    label: App.t('kpiRentals'),
                    data: monthlyRentals,
                    borderColor: '#8b5cf6',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: { ...commonOpts, plugins: { title: { display: true, text: App.t('chartAgency') } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } }, x: { grid: { display: false } } } }
        }));
    }
};

export default Dashboard;