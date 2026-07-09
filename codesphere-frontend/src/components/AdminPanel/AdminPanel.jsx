// // // import { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { toast } from 'react-toastify';
// // // import {
// // //     FiGrid, FiLayout, FiBriefcase, FiUsers, FiMessageSquare,
// // //     FiMail, FiBarChart2, FiLogOut, FiMenu, FiX
// // // } from 'react-icons/fi';
// // // import { useAuth } from '../../context/AuthContext';

// // // import StatsTab from './tabs/StatsTab';
// // // import HeroTab from './tabs/HeroTab';
// // // import ServicesTab from './tabs/ServicesTab';
// // // import PortfolioTab from './tabs/PortfolioTab';
// // // import TeamTab from './tabs/TeamTab';
// // // import TestimonialsTab from './tabs/TestimonialsTab';
// // // import ContactTab from './tabs/ContactTab';

// // // import './AdminPanel.css';

// // // const TABS = [
// // //     { id: 'stats', label: 'Dashboard', icon: FiBarChart2 },
// // //     { id: 'hero', label: 'Hero Section', icon: FiLayout },
// // //     { id: 'services', label: 'Services', icon: FiGrid },
// // //     { id: 'portfolio', label: 'Portfolio', icon: FiBriefcase },
// // //     { id: 'team', label: 'Team', icon: FiUsers },
// // //     { id: 'testimonials', label: 'Testimonials', icon: FiMessageSquare },
// // //     { id: 'contact', label: 'Messages', icon: FiMail },
// // // ];

// // // export default function AdminPanel() {
// // //     const [active, setActive] = useState('stats');
// // //     const [sidebarOpen, setSidebarOpen] = useState(false);
// // //     const { admin, logout } = useAuth();
// // //     const navigate = useNavigate();

// // //     const handleLogout = () => {
// // //         logout();
// // //         toast.success('Logged out successfully');
// // //         navigate('/admin');
// // //     };

// // //     const renderTab = () => {
// // //         switch (active) {
// // //             case 'stats': return <StatsTab />;
// // //             case 'hero': return <HeroTab />;
// // //             case 'services': return <ServicesTab />;
// // //             case 'portfolio': return <PortfolioTab />;
// // //             case 'team': return <TeamTab />;
// // //             case 'testimonials': return <TestimonialsTab />;
// // //             case 'contact': return <ContactTab />;
// // //             default: return <StatsTab />;
// // //         }
// // //     };

// // //     return (
// // //         <div className="admin-shell">
// // //             <div className="admin-topbar">
// // //                 <button className="admin-burger" onClick={() => setSidebarOpen(!sidebarOpen)}>
// // //                     {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
// // //                 </button>
// // //                 <span className="admin-topbar-title">AMANAH IT Admin</span>
// // //             </div>

// // //             <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
// // //                 <div className="admin-sidebar-brand">
// // //                     <div className="admin-logo-box">A</div>
// // //                     <div>
// // //                         <h3>AMANAH IT</h3>
// // //                         <span>Admin Dashboard</span>
// // //                     </div>
// // //                 </div>

// // //                 <nav className="admin-nav">
// // //                     {TABS.map(t => {
// // //                         const Icon = t.icon;
// // //                         return (
// // //                             <button
// // //                                 key={t.id}
// // //                                 className={`admin-nav-item ${active === t.id ? 'active' : ''}`}
// // //                                 onClick={() => { setActive(t.id); setSidebarOpen(false); }}
// // //                             >
// // //                                 <Icon size={18} />
// // //                                 <span>{t.label}</span>
// // //                             </button>
// // //                         );
// // //                     })}
// // //                 </nav>

// // //                 <div className="admin-sidebar-footer">
// // //                     <div className="admin-user-info">
// // //                         <div className="admin-user-avatar">{(admin?.name || 'A')[0].toUpperCase()}</div>
// // //                         <div>
// // //                             <p className="admin-user-name">{admin?.name || 'Admin'}</p>
// // //                             <p className="admin-user-email">{admin?.email || ''}</p>
// // //                         </div>
// // //                     </div>
// // //                     <button className="admin-logout-btn" onClick={handleLogout}>
// // //                         <FiLogOut size={16} /> Logout
// // //                     </button>
// // //                 </div>
// // //             </aside>

// // //             {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

// // //             <main className="admin-main">
// // //                 {renderTab()}
// // //             </main>
// // //         </div>
// // //     );
// // // }
// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { toast } from 'react-toastify';
// // import {
// //     FiGrid, FiLayout, FiBriefcase, FiUsers, FiMessageSquare,
// //     FiMail, FiBarChart2, FiLogOut, FiMenu, FiX, FiUserPlus
// // } from 'react-icons/fi';
// // import { useAuth } from '../../context/AuthContext';

// // import StatsTab from './tabs/StatsTab';
// // import HeroTab from './tabs/HeroTab';
// // import ServicesTab from './tabs/ServicesTab';
// // import PortfolioTab from './tabs/PortfolioTab';
// // import TeamTab from './tabs/TeamTab';
// // import TestimonialsTab from './tabs/TestimonialsTab';
// // import ContactTab from './tabs/ContactTab';
// // import EmployeesTab from './tabs/EmployeesTab';

// // import './AdminPanel.css';

// // // Kon tab er jonno kon permission lagbe — eita diye filter hobe
// // const TABS = [
// //     { id: 'stats', label: 'Dashboard', icon: FiBarChart2, permission: null }, // shobai dekhte parbe
// //     { id: 'hero', label: 'Hero Section', icon: FiLayout, permission: 'manageHero' },
// //     { id: 'services', label: 'Services', icon: FiGrid, permission: 'manageServices' },
// //     { id: 'portfolio', label: 'Portfolio', icon: FiBriefcase, permission: 'managePortfolio' },
// //     { id: 'team', label: 'Team', icon: FiUsers, permission: 'manageTeam' },
// //     { id: 'testimonials', label: 'Testimonials', icon: FiMessageSquare, permission: 'manageTestimonials' },
// //     { id: 'contact', label: 'Messages', icon: FiMail, permission: 'manageContactMessages' },
// // ];

// // export default function AdminPanel() {
// //     const [active, setActive] = useState('stats');
// //     const [sidebarOpen, setSidebarOpen] = useState(false);
// //     const { admin, logout, can, isSuperAdmin } = useAuth();
// //     const navigate = useNavigate();

// //     const handleLogout = () => {
// //         logout();
// //         toast.success('Logged out successfully');
// //         navigate('/admin');
// //     };

// //     // Employee er permission onujayi tab filter kora, Super Admin shob dekhbe
// //     const visibleTabs = TABS.filter(t => t.permission === null || can(t.permission));

// //     const renderTab = () => {
// //         switch (active) {
// //             case 'stats': return <StatsTab />;
// //             case 'hero': return <HeroTab />;
// //             case 'services': return <ServicesTab />;
// //             case 'portfolio': return <PortfolioTab />;
// //             case 'team': return <TeamTab />;
// //             case 'testimonials': return <TestimonialsTab />;
// //             case 'contact': return <ContactTab />;
// //             case 'employees': return <EmployeesTab />;
// //             default: return <StatsTab />;
// //         }
// //     };

// //     return (
// //         <div className="admin-shell">
// //             <div className="admin-topbar">
// //                 <button className="admin-burger" onClick={() => setSidebarOpen(!sidebarOpen)}>
// //                     {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
// //                 </button>
// //                 <span className="admin-topbar-title">AMANAH IT Admin</span>
// //             </div>

// //             <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
// //                 <div className="admin-sidebar-brand">
// //                     <div className="admin-logo-box">A</div>
// //                     <div>
// //                         <h3>AMANAH IT</h3>
// //                         <span>Admin Dashboard</span>
// //                     </div>
// //                 </div>

// //                 <nav className="admin-nav">
// //                     {visibleTabs.map(t => {
// //                         const Icon = t.icon;
// //                         return (
// //                             <button
// //                                 key={t.id}
// //                                 className={`admin-nav-item ${active === t.id ? 'active' : ''}`}
// //                                 onClick={() => { setActive(t.id); setSidebarOpen(false); }}
// //                             >
// //                                 <Icon size={18} />
// //                                 <span>{t.label}</span>
// //                             </button>
// //                         );
// //                     })}

// //                     {/* Shudhu Super Admin ei tab dekhbe */}
// //                     {isSuperAdmin && (
// //                         <button
// //                             className={`admin-nav-item ${active === 'employees' ? 'active' : ''}`}
// //                             onClick={() => { setActive('employees'); setSidebarOpen(false); }}
// //                         >
// //                             <FiUserPlus size={18} />
// //                             <span>Employees</span>
// //                         </button>
// //                     )}
// //                 </nav>

// //                 <div className="admin-sidebar-footer">
// //                     <div className="admin-user-info">
// //                         <div className="admin-user-avatar">{(admin?.name || 'A')[0].toUpperCase()}</div>
// //                         <div>
// //                             <p className="admin-user-name">{admin?.name || 'Admin'}</p>
// //                             <p className="admin-user-email">{admin?.email || ''}</p>
// //                             {admin?.role && (
// //                                 <p className="admin-user-role">{admin.role === 'superadmin' ? 'Super Admin' : 'Editor'}</p>
// //                             )}
// //                         </div>
// //                     </div>
// //                     <button className="admin-logout-btn" onClick={handleLogout}>
// //                         <FiLogOut size={16} /> Logout
// //                     </button>
// //                 </div>
// //             </aside>

// //             {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

// //             <main className="admin-main">
// //                 {renderTab()}
// //             </main>
// //         </div>
// //     );
// // }
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import {
//     FiGrid, FiLayout, FiBriefcase, FiUsers, FiMessageSquare,
//     FiMail, FiBarChart2, FiLogOut, FiMenu, FiX, FiUserPlus
// } from 'react-icons/fi';
// import { useAuth } from '../../context/AuthContext';

// import StatsTab from './tabs/StatsTab';
// import NavbarTab from './tabs/NavbarTab';
// import HeroTab from './tabs/HeroTab';
// import ServicesTab from './tabs/ServicesTab';
// import PortfolioTab from './tabs/PortfolioTab';
// import TeamTab from './tabs/TeamTab';
// import TestimonialsTab from './tabs/TestimonialsTab';
// import ContactTab from './tabs/ContactTab';
// import EmployeesTab from './tabs/EmployeesTab';

// import './AdminPanel.css';

// // Kon tab er jonno kon permission lagbe — eita diye filter hobe
// const TABS = [
//     { id: 'stats', label: 'Dashboard', icon: FiBarChart2, permission: null }, // shobai dekhte parbe
//     { id: 'navbar', label: 'Navbar / Header', icon: FiLayout, permission: 'manageNavbar' },
//     { id: 'hero', label: 'Hero Section', icon: FiLayout, permission: 'manageHero' },
//     { id: 'services', label: 'Services', icon: FiGrid, permission: 'manageServices' },
//     { id: 'portfolio', label: 'Portfolio', icon: FiBriefcase, permission: 'managePortfolio' },
//     { id: 'team', label: 'Team', icon: FiUsers, permission: 'manageTeam' },
//     { id: 'testimonials', label: 'Testimonials', icon: FiMessageSquare, permission: 'manageTestimonials' },
//     { id: 'contact', label: 'Messages', icon: FiMail, permission: 'manageContactMessages' },
// ];

// export default function AdminPanel() {
//     const [active, setActive] = useState('stats');
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const { admin, logout, can, isSuperAdmin } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         toast.success('Logged out successfully');
//         navigate('/admin');
//     };

//     // Employee er permission onujayi tab filter kora, Super Admin shob dekhbe
//     const visibleTabs = TABS.filter(t => t.permission === null || can(t.permission));

//     const renderTab = () => {
//         switch (active) {
//             case 'stats': return <StatsTab />;
//             case 'navbar': return <NavbarTab />;
//             case 'hero': return <HeroTab />;
//             case 'services': return <ServicesTab />;
//             case 'portfolio': return <PortfolioTab />;
//             case 'team': return <TeamTab />;
//             case 'testimonials': return <TestimonialsTab />;
//             case 'contact': return <ContactTab />;
//             case 'employees': return <EmployeesTab />;
//             default: return <StatsTab />;
//         }
//     };

//     return (
//         <div className="admin-shell">
//             <div className="admin-topbar">
//                 <button className="admin-burger" onClick={() => setSidebarOpen(!sidebarOpen)}>
//                     {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
//                 </button>
//                 <span className="admin-topbar-title">AMANAH IT Admin</span>
//             </div>

//             <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
//                 <div className="admin-sidebar-brand">
//                     <div className="admin-logo-box">A</div>
//                     <div>
//                         <h3>AMANAH IT</h3>
//                         <span>Admin Dashboard</span>
//                     </div>
//                 </div>

//                 <nav className="admin-nav">
//                     {visibleTabs.map(t => {
//                         const Icon = t.icon;
//                         return (
//                             <button
//                                 key={t.id}
//                                 className={`admin-nav-item ${active === t.id ? 'active' : ''}`}
//                                 onClick={() => { setActive(t.id); setSidebarOpen(false); }}
//                             >
//                                 <Icon size={18} />
//                                 <span>{t.label}</span>
//                             </button>
//                         );
//                     })}

//                     {/* Shudhu Super Admin ei tab dekhbe */}
//                     {isSuperAdmin && (
//                         <button
//                             className={`admin-nav-item ${active === 'employees' ? 'active' : ''}`}
//                             onClick={() => { setActive('employees'); setSidebarOpen(false); }}
//                         >
//                             <FiUserPlus size={18} />
//                             <span>Employees</span>
//                         </button>
//                     )}
//                 </nav>

//                 <div className="admin-sidebar-footer">
//                     <div className="admin-user-info">
//                         <div className="admin-user-avatar">{(admin?.name || 'A')[0].toUpperCase()}</div>
//                         <div>
//                             <p className="admin-user-name">{admin?.name || 'Admin'}</p>
//                             <p className="admin-user-email">{admin?.email || ''}</p>
//                             {admin?.role && (
//                                 <p className="admin-user-role">{admin.role === 'superadmin' ? 'Super Admin' : 'Editor'}</p>
//                             )}
//                         </div>
//                     </div>
//                     <button className="admin-logout-btn" onClick={handleLogout}>
//                         <FiLogOut size={16} /> Logout
//                     </button>
//                 </div>
//             </aside>

//             {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

//             <main className="admin-main">
//                 {renderTab()}
//             </main>
//         </div>
//     );
// }
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    FiGrid, FiLayout, FiBriefcase, FiUsers, FiMessageSquare,
    FiMail, FiBarChart2, FiLogOut, FiMenu, FiX, FiUserPlus, FiFileText
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

import StatsTab from './tabs/StatsTab';
import NavbarTab from './tabs/NavbarTab';
import HeroTab from './tabs/HeroTab';
import ServicesTab from './tabs/ServicesTab';
import PortfolioTab from './tabs/PortfolioTab';
import TeamTab from './tabs/TeamTab';
import TestimonialsTab from './tabs/TestimonialsTab';
import ContactTab from './tabs/ContactTab';
import EmployeesTab from './tabs/EmployeesTab';
import BlogTab from './tabs/BlogTab';

import './AdminPanel.css';

// Kon tab er jonno kon permission lagbe — eita diye filter hobe
const TABS = [
    { id: 'stats', label: 'Dashboard', icon: FiBarChart2, permission: null }, // shobai dekhte parbe
    { id: 'navbar', label: 'Navbar / Header', icon: FiLayout, permission: 'manageNavbar' },
    { id: 'hero', label: 'Hero Section', icon: FiLayout, permission: 'manageHero' },
    { id: 'services', label: 'Services', icon: FiGrid, permission: 'manageServices' },
    { id: 'portfolio', label: 'Portfolio', icon: FiBriefcase, permission: 'managePortfolio' },
    { id: 'team', label: 'Team', icon: FiUsers, permission: 'manageTeam' },
    { id: 'blog', label: 'Blog / Articles', icon: FiFileText, permission: 'manageBlog' },
    { id: 'testimonials', label: 'Testimonials', icon: FiMessageSquare, permission: 'manageTestimonials' },
    { id: 'contact', label: 'Messages', icon: FiMail, permission: 'manageContactMessages' },
];

export default function AdminPanel() {
    const [active, setActive] = useState('stats');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { admin, logout, can, isSuperAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/admin');
    };

    // Employee er permission onujayi tab filter kora, Super Admin shob dekhbe
    const visibleTabs = TABS.filter(t => t.permission === null || can(t.permission));

    const renderTab = () => {
        switch (active) {
            case 'stats': return <StatsTab />;
            case 'navbar': return <NavbarTab />;
            case 'hero': return <HeroTab />;
            case 'services': return <ServicesTab />;
            case 'portfolio': return <PortfolioTab />;
            case 'team': return <TeamTab />;
            case 'blog': return <BlogTab />;
            case 'testimonials': return <TestimonialsTab />;
            case 'contact': return <ContactTab />;
            case 'employees': return <EmployeesTab />;
            default: return <StatsTab />;
        }
    };

    return (
        <div className="admin-shell">
            <div className="admin-topbar">
                <button className="admin-burger" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
                <span className="admin-topbar-title">AMANAH IT Admin</span>
            </div>

            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="admin-sidebar-brand">
                    <div className="admin-logo-box">A</div>
                    <div>
                        <h3>AMANAH IT</h3>
                        <span>Admin Dashboard</span>
                    </div>
                </div>

                <nav className="admin-nav">
                    {visibleTabs.map(t => {
                        const Icon = t.icon;
                        return (
                            <button
                                key={t.id}
                                className={`admin-nav-item ${active === t.id ? 'active' : ''}`}
                                onClick={() => { setActive(t.id); setSidebarOpen(false); }}
                            >
                                <Icon size={18} />
                                <span>{t.label}</span>
                            </button>
                        );
                    })}

                    {/* Shudhu Super Admin ei tab dekhbe */}
                    {isSuperAdmin && (
                        <button
                            className={`admin-nav-item ${active === 'employees' ? 'active' : ''}`}
                            onClick={() => { setActive('employees'); setSidebarOpen(false); }}
                        >
                            <FiUserPlus size={18} />
                            <span>Employees</span>
                        </button>
                    )}
                </nav>

                <div className="admin-sidebar-footer">
                    <div className="admin-user-info">
                        <div className="admin-user-avatar">{(admin?.name || 'A')[0].toUpperCase()}</div>
                        <div>
                            <p className="admin-user-name">{admin?.name || 'Admin'}</p>
                            <p className="admin-user-email">{admin?.email || ''}</p>
                            {admin?.role && (
                                <p className="admin-user-role">{admin.role === 'superadmin' ? 'Super Admin' : 'Editor'}</p>
                            )}
                        </div>
                    </div>
                    <button className="admin-logout-btn" onClick={handleLogout}>
                        <FiLogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

            <main className="admin-main">
                {renderTab()}
            </main>
        </div>
    );
}