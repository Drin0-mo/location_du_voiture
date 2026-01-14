export const CONFIG = {
    users: [
        { email: 'admin@app.com', password: 'admin123', role: 'admin', name: 'Admin User', initials: 'AD' },
        { email: 'user@app.com', password: 'user123', role: 'user', name: 'nour', initials: 'NS' }
    ],
    entities: {
        dashboard: { label: {fr: 'Tableau de bord', en: 'Dashboard', ar: 'لوحة التحكم'}, icon: 'fa-chart-pie' },
        vehicles: { label: {fr: 'Véhicules', en: 'Vehicles', ar: 'المركبات'}, icon: 'fa-car' },
        clients: { label: {fr: 'Clients', en: 'Clients', ar: 'العملاء'}, icon: 'fa-users' },
        rentals: { label: {fr: 'Locations', en: 'Rentals', ar: 'الإيجارات'}, icon: 'fa-key' },
        agencies: { label: {fr: 'Agences', en: 'Agencies', ar: 'الوكالات'}, icon: 'fa-building' },
        payments: { label: {fr: 'Paiements', en: 'Payments', ar: 'الدفعات'}, icon: 'fa-credit-card' }
    }
};

export const TRANSLATIONS = {
    fr: {
        appName: 'AutoLoc Pro', loginSubtitle: 'Connectez-vous à votre compte', email: 'Email', password: 'Mot de passe', loginBtn: 'Se connecter',
        dashboard: 'Tableau de bord', logout: 'Déconnexion', actions: 'Actions', search: 'Rechercher...',
        add: 'Ajouter', edit: 'Modifier', delete: 'Supprimer', view: 'Détails', save: 'Enregistrer', cancel: 'Annuler',
        confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet élément ?', yes: 'Oui', no: 'Non',
        exportCSV: 'Export CSV', exportPDF: 'Export PDF', prev: 'Précédent', next: 'Suivant',
        kpiVehicles: 'Total Véhicules', kpiRentals: 'Locations en cours', kpiRevenue: 'Revenus Mensuel',
        kpiClients: 'Clients', kpiAgencies: 'Agences', kpiPending: 'En attente',
        chartStatus: 'État du parc', chartPayment: 'Moyens de paiement',
        chartRevenue: 'Revenus Mensuels', chartTrend: 'Tendance Locations',
        chartAgency: 'Performance Agences',
        make: 'Marque', model: 'Modèle', plate: 'Immatriculation', price: 'Prix/Jour', status: 'État',
        clientName: 'Nom Client', phone: 'Téléphone', license: 'Permis',
        startDate: 'Début', endDate: 'Fin', amount: 'Montant',
        city: 'Ville', address: 'Adresse', method: 'Méthode',
        msgCreated: 'Créé avec succès', msgUpdated: 'Mis à jour', msgDeleted: 'Supprimé', msgLoginError: 'Identifiants invalides'
    },
    en: {
        appName: 'AutoLoc Pro', loginSubtitle: 'Sign in to your account', email: 'Email', password: 'Password', loginBtn: 'Login',
        dashboard: 'Dashboard', logout: 'Logout', actions: 'Actions', search: 'Search...',
        add: 'Add', edit: 'Edit', delete: 'Delete', view: 'View', save: 'Save', cancel: 'Cancel',
        confirmDelete: 'Are you sure you want to delete this item?', yes: 'Yes', no: 'No',
        exportCSV: 'Export CSV', exportPDF: 'Export PDF', prev: 'Previous', next: 'Next',
        kpiVehicles: 'Total Vehicles', kpiRentals: 'Active Rentals', kpiRevenue: 'Monthly Revenue',
        kpiClients: 'Clients', kpiAgencies: 'Agencies', kpiPending: 'Pending',
        chartStatus: 'Fleet Status', chartPayment: 'Payment Methods',
        chartRevenue: 'Monthly Revenue', chartTrend: 'Rentals Trend',
        chartAgency: 'Agency Performance',
        make: 'Make', model: 'Model', plate: 'Plate', price: 'Price/Day', status: 'Status',
        clientName: 'Client Name', phone: 'Phone', license: 'License',
        startDate: 'Start', endDate: 'End', amount: 'Amount',
        city: 'City', address: 'Address', method: 'Method',
        msgCreated: 'Created successfully', msgUpdated: 'Updated', msgDeleted: 'Deleted', msgLoginError: 'Invalid credentials'
    },
    ar: {
        appName: 'أوتولوك برو', loginSubtitle: 'سجل الدخول إلى حسابك', email: 'البريد الإلكتروني', password: 'كلمة المرور', loginBtn: 'دخول',
        dashboard: 'لوحة التحكم', logout: 'خروج', actions: 'إجراءات', search: 'بحث...',
        add: 'إضافة', edit: 'تعديل', delete: 'حذف', view: 'عرض', save: 'حفظ', cancel: 'إلغاء',
        confirmDelete: 'هل أنت متأكد من الحذف؟', yes: 'نعم', no: 'لا',
        exportCSV: 'تصدير CSV', exportPDF: 'تصدير PDF', prev: 'السابق', next: 'التالي',
        kpiVehicles: 'إجمالي المركبات', kpiRentals: 'إيجارات نشطة', kpiRevenue: 'الإيرادات الشهرية',
        kpiClients: 'العملاء', kpiAgencies: 'الوكالات', kpiPending: 'قيد الانتظار',
        chartStatus: 'حالة الأسطول', chartPayment: 'طرق الدفع',
        chartRevenue: 'الإيرادات الشهرية', chartTrend: 'اتجاه الإيجارات',
        chartAgency: 'أداء الوكالات',
        make: 'الشركة', model: 'الموديل', plate: 'اللوحة', price: 'السعر/يوم', status: 'الحالة',
        clientName: 'اسم العميل', phone: 'الهاتف', license: 'الرخصة',
        startDate: 'بداية', endDate: 'نهاية', amount: 'المبلغ',
        city: 'المدينة', address: 'العنوان', method: 'الطريقة',
        msgCreated: 'تم الإنشاء بنجاح', msgUpdated: 'تم التحديث', msgDeleted: 'تم الحذف', msgLoginError: 'بيانات الدخول غير صحيحة'
    }
};

export const MOCK_DATA = {
    vehicles: [
        { id: 1, make: 'Renault', model: 'Clio 5', plate: '12345 A 10', price: 350, status: 'Available' },
        { id: 2, make: 'Peugeot', model: '3008', plate: '98765 B 20', price: 600, status: 'Rented' },
        { id: 3, make: 'Dacia', model: 'Duster', plate: '45678 C 30', price: 400, status: 'Available' },
        { id: 4, make: 'BMW', model: 'X3', plate: '11223 D 40', price: 1200, status: 'Maintenance' },
    ],
    clients: [
        { id: 1, name: 'Ahmed Benali', email: 'ahmed@mail.com', phone: '0612345678', license: 'B123456' },
        { id: 2, name: 'Sara Idrissi', email: 'sara@mail.com', phone: '0698765432', license: 'B654321' },
        { id: 3, name: 'Omar Kabbaj', email: 'omar@mail.com', phone: '0555555555', license: 'B999888' },
    ],
    rentals: [
        { id: 1, clientId: 1, vehicleId: 2, startDate: '2025-05-01', endDate: '2025-05-05', amount: 2400, status: 'Active' },
        { id: 2, clientId: 3, vehicleId: 1, startDate: '2025-06-10', endDate: '2025-06-12', amount: 700, status: 'Completed' }
    ],
    agencies: [
        { id: 1, name: 'Agence Centre', city: 'Casablanca', address: 'Bd Mohammed V' },
        { id: 2, name: 'Aéroport Agency', city: 'Casablanca', address: 'Terminal 1' },
        { id: 3, name: 'Sud Agency', city: 'Agadir', address: 'Front de Mer' }
    ],
    payments: [
        { id: 1, rentalId: 1, amount: 2400, date: '2025-05-01', method: 'Credit Card' },
        { id: 2, rentalId: 2, amount: 700, date: '2025-06-10', method: 'Cash' }
    ]
};