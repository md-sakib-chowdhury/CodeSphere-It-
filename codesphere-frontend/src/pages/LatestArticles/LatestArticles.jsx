// import { useState, useEffect } from 'react';
// import { FiCalendar, FiArrowUp } from 'react-icons/fi';
// import Navbar from '../../components/Navbar/Navbar';
// import Footer from '../../components/Footer/Footer';
// import api from '../../utils/api';
// import './LatestArticles.css';

// const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80';

// const DEFAULT_BLOGS = [
//     {
//         _id: '1',
//         title: 'Essential Features Your Website Should Have in 2026',
//         excerpt: 'A modern business website needs more than a homepage. Here are the features we recommend to every client before launch.',
//         image: PLACEHOLDER_IMG,
//         tags: ['Web Development'],
//         createdAt: '2026-06-05',
//     },
//     {
//         _id: '2',
//         title: 'Why MERN Stack Is Still a Great Choice for Startups',
//         excerpt: 'React, Node, MongoDB and Express remain one of the fastest ways to go from idea to a working product.',
//         image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
//         tags: ['MERN Stack'],
//         createdAt: '2026-05-28',
//     },
//     {
//         _id: '3',
//         title: 'A Founder\'s Guide to Choosing an E-commerce Platform',
//         excerpt: 'Custom-built vs off-the-shelf — what actually matters when picking a platform for your online store.',
//         image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
//         tags: ['E-commerce'],
//         createdAt: '2026-05-12',
//     },
//     {
//         _id: '4',
//         title: 'Securing Your Web App: A Practical Checklist',
//         excerpt: 'JWT auth, input validation, rate limiting and the other basics every production app needs.',
//         image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
//         tags: ['Security'],
//         createdAt: '2026-04-20',
//     },
// ];

// export default function LatestArticles() {
//     const [blogs, setBlogs] = useState(DEFAULT_BLOGS);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//         api.get('/blogs')
//             .then(r => { if (r.data.length) setBlogs(r.data); })
//             .catch(() => { })
//             .finally(() => setLoading(false));
//     }, []);

//     const formatDate = (d) =>
//         new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

//     const featured = blogs[0];
//     const leftList = blogs.slice(1, 3);
//     const recentList = blogs.slice(0, 7);

//     return (
//         <>
//             <Navbar />

//             <section
//                 className="articles-banner"
//                 style={{ backgroundImage: `linear-gradient(rgba(10,14,12,0.55), rgba(10,14,12,0.7)), url(${PLACEHOLDER_IMG})` }}
//             >
//                 <div className="container">
//                     <h1>Latest Articles</h1>
//                     <div className="breadcrumb">
//                         <a href="/">Home</a> <span>»</span> <span className="current">Blog</span>
//                     </div>
//                 </div>
//             </section>

//             <section className="articles-section">
//                 <div className="container articles-grid">

//                     <div className="articles-col-side">
//                         {leftList.map(b => (
//                             <a key={b._id} href={`#blog-${b._id}`} className="side-card">
//                                 <div className="side-card-img">
//                                     <img src={b.image || PLACEHOLDER_IMG} alt={b.title} />
//                                     {b.tags?.[0] && <span className="tag-badge">{b.tags[0]}</span>}
//                                 </div>
//                                 <h3>{b.title}</h3>
//                                 <div className="date-row"><FiCalendar size={13} /> {formatDate(b.createdAt)}</div>
//                             </a>
//                         ))}
//                     </div>

//                     <div className="articles-col-main">
//                         {featured && (
//                             <a href={`#blog-${featured._id}`} className="main-card">
//                                 <div className="main-card-img">
//                                     <img src={featured.image || PLACEHOLDER_IMG} alt={featured.title} />
//                                     {featured.tags?.[0] && <span className="tag-badge">{featured.tags[0]}</span>}
//                                 </div>
//                                 <h2>{featured.title}</h2>
//                                 <p>{featured.excerpt}</p>
//                                 <div className="date-row"><FiCalendar size={13} /> {formatDate(featured.createdAt)}</div>
//                             </a>
//                         )}
//                     </div>

//                     <div className="articles-col-right">
//                         <h3 className="sidebar-title">Recent Articles</h3>
//                         <div className="sidebar-divider" />
//                         <ul className="sidebar-list">
//                             {recentList.map(b => (
//                                 <li key={b._id}>
//                                     <a href={`#blog-${b._id}`}>{b.title}</a>
//                                     <div className="date-row"><FiCalendar size={12} /> {formatDate(b.createdAt)}</div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                 </div>
//             </section>

//             <section className="articles-cta">
//                 <div className="container cta-inner">
//                     <div className="cta-left">
//                         <span className="section-label cta-label">Our Recent Activities</span>
//                         <h2>Latest Activities From Our Team</h2>
//                     </div>
//                     <div className="cta-right">
//                         <p>Want to work with us on your next project?</p>
//                         <a href="/contact" className="cta-btn">Get In Touch</a>
//                     </div>
//                 </div>
//             </section>

//             <Footer />

//         </>
//     );
// }
// import { useState, useEffect } from 'react';
// import { FiCalendar, FiArrowUp } from 'react-icons/fi';
// import Navbar from '../../components/Navbar/Navbar';
// import Footer from '../../components/Footer/Footer';
// import api from '../../utils/api';
// import './LatestArticles.css';

// const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80';

// const DEFAULT_BLOGS = [
//     {
//         _id: '1',
//         title: 'Essential Features Your Website Should Have in 2026',
//         excerpt: 'A modern business website needs more than a homepage. Here are the features we recommend to every client before launch.',
//         image: PLACEHOLDER_IMG,
//         tags: ['Web Development'],
//         createdAt: '2026-06-05',
//     },
//     {
//         _id: '2',
//         title: 'Why MERN Stack Is Still a Great Choice for Startups',
//         excerpt: 'React, Node, MongoDB and Express remain one of the fastest ways to go from idea to a working product.',
//         image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
//         tags: ['MERN Stack'],
//         createdAt: '2026-05-28',
//     },
//     {
//         _id: '3',
//         title: 'A Founder\'s Guide to Choosing an E-commerce Platform',
//         excerpt: 'Custom-built vs off-the-shelf — what actually matters when picking a platform for your online store.',
//         image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
//         tags: ['E-commerce'],
//         createdAt: '2026-05-12',
//     },
//     {
//         _id: '4',
//         title: 'Securing Your Web App: A Practical Checklist',
//         excerpt: 'JWT auth, input validation, rate limiting and the other basics every production app needs.',
//         image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
//         tags: ['Security'],
//         createdAt: '2026-04-20',
//     },
// ];

// const DEFAULT_PAGE = {
//     bannerTitle: 'Latest Articles',
//     breadcrumbCurrent: 'Blog',
//     cta: {
//         label: 'Our Recent Activities',
//         title: 'Latest Activities From Our Team',
//         text: 'Want to work with us on your next project?',
//         btnText: 'Get In Touch',
//         btnLink: '/contact',
//     },
// };

// export default function LatestArticles() {
//     const [blogs, setBlogs] = useState(DEFAULT_BLOGS);
//     const [page, setPage] = useState(DEFAULT_PAGE);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//         api.get('/blogs')
//             .then(r => { if (r.data.length) setBlogs(r.data); })
//             .catch(() => { })
//             .finally(() => setLoading(false));
//         api.get('/articles-page').then(r => {
//             setPage({ ...DEFAULT_PAGE, ...r.data, cta: { ...DEFAULT_PAGE.cta, ...r.data.cta } });
//         }).catch(() => { });
//     }, []);

//     const formatDate = (d) =>
//         new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

//     const featured = blogs[0];
//     const leftList = blogs.slice(1, 3);
//     const recentList = blogs.slice(0, 7);

//     return (
//         <>
//             <Navbar />

//             <section
//                 className="articles-banner"
//                 style={{ backgroundImage: `linear-gradient(rgba(10,14,12,0.55), rgba(10,14,12,0.7)), url(${PLACEHOLDER_IMG})` }}
//             >
//                 <div className="container">
//                     <h1>{page.bannerTitle}</h1>
//                     <div className="breadcrumb">
//                         <a href="/">Home</a> <span>»</span> <span className="current">{page.breadcrumbCurrent}</span>
//                     </div>
//                 </div>
//             </section>

//             <section className="articles-section">
//                 <div className="container articles-grid">

//                     <div className="articles-col-side">
//                         {leftList.map(b => (
//                             <a key={b._id} href={`#blog-${b._id}`} className="side-card">
//                                 <div className="side-card-img">
//                                     <img src={b.image || PLACEHOLDER_IMG} alt={b.title} />
//                                     {b.tags?.[0] && <span className="tag-badge">{b.tags[0]}</span>}
//                                 </div>
//                                 <h3>{b.title}</h3>
//                                 <div className="date-row"><FiCalendar size={13} /> {formatDate(b.createdAt)}</div>
//                             </a>
//                         ))}
//                     </div>

//                     <div className="articles-col-main">
//                         {featured && (
//                             <a href={`#blog-${featured._id}`} className="main-card">
//                                 <div className="main-card-img">
//                                     <img src={featured.image || PLACEHOLDER_IMG} alt={featured.title} />
//                                     {featured.tags?.[0] && <span className="tag-badge">{featured.tags[0]}</span>}
//                                 </div>
//                                 <h2>{featured.title}</h2>
//                                 <p>{featured.excerpt}</p>
//                                 <div className="date-row"><FiCalendar size={13} /> {formatDate(featured.createdAt)}</div>
//                             </a>
//                         )}
//                     </div>

//                     <div className="articles-col-right">
//                         <h3 className="sidebar-title">Recent Articles</h3>
//                         <div className="sidebar-divider" />
//                         <ul className="sidebar-list">
//                             {recentList.map(b => (
//                                 <li key={b._id}>
//                                     <a href={`#blog-${b._id}`}>{b.title}</a>
//                                     <div className="date-row"><FiCalendar size={12} /> {formatDate(b.createdAt)}</div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                 </div>
//             </section>

//             <section className="articles-cta">
//                 <div className="container cta-inner">
//                     <div className="cta-left">
//                         <span className="section-label cta-label">{page.cta.label}</span>
//                         <h2>{page.cta.title}</h2>
//                     </div>
//                     <div className="cta-right">
//                         <p>{page.cta.text}</p>
//                         <a href={page.cta.btnLink} className="cta-btn">{page.cta.btnText}</a>
//                     </div>
//                 </div>
//             </section>

//             <Footer />

//         </>
//     );
// }
import { useState, useEffect } from 'react';
import { FiCalendar, FiArrowUp } from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import api from '../../utils/api';
import './LatestArticles.css';

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80';

const DEFAULT_BLOGS = [
    {
        _id: '1',
        title: 'Essential Features Your Website Should Have in 2026',
        excerpt: 'A modern business website needs more than a homepage. Here are the features we recommend to every client before launch.',
        image: PLACEHOLDER_IMG,
        tags: ['Web Development'],
        createdAt: '2026-06-05',
    },
    {
        _id: '2',
        title: 'Why MERN Stack Is Still a Great Choice for Startups',
        excerpt: 'React, Node, MongoDB and Express remain one of the fastest ways to go from idea to a working product.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        tags: ['MERN Stack'],
        createdAt: '2026-05-28',
    },
    {
        _id: '3',
        title: 'A Founder\'s Guide to Choosing an E-commerce Platform',
        excerpt: 'Custom-built vs off-the-shelf — what actually matters when picking a platform for your online store.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
        tags: ['E-commerce'],
        createdAt: '2026-05-12',
    },
    {
        _id: '4',
        title: 'Securing Your Web App: A Practical Checklist',
        excerpt: 'JWT auth, input validation, rate limiting and the other basics every production app needs.',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
        tags: ['Security'],
        createdAt: '2026-04-20',
    },
];

const DEFAULT_PAGE = {
    bannerTitle: 'Latest Articles',
    breadcrumbCurrent: 'Blog',
    bannerImage: PLACEHOLDER_IMG,
    cta: {
        label: 'Our Recent Activities',
        title: 'Latest Activities From Our Team',
        text: 'Want to work with us on your next project?',
        btnText: 'Get In Touch',
        btnLink: '/contact',
    },
};

export default function LatestArticles() {
    const [blogs, setBlogs] = useState(DEFAULT_BLOGS);
    const [page, setPage] = useState(DEFAULT_PAGE);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        api.get('/blogs')
            .then(r => { if (r.data.length) setBlogs(r.data); })
            .catch(() => { })
            .finally(() => setLoading(false));
        api.get('/articles-page').then(r => {
            setPage({ ...DEFAULT_PAGE, ...r.data, cta: { ...DEFAULT_PAGE.cta, ...r.data.cta } });
        }).catch(() => { });
    }, []);

    const formatDate = (d) =>
        new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const featured = blogs[0];
    const leftList = blogs.slice(1, 3);
    const recentList = blogs.slice(0, 7);

    return (
        <>
            <Navbar />

            <section
                className="articles-banner"
                style={{ backgroundImage: `linear-gradient(rgba(10,14,12,0.55), rgba(10,14,12,0.7)), url(${page.bannerImage})` }}
            >
                <div className="container">
                    <h1>{page.bannerTitle}</h1>
                    <div className="breadcrumb">
                        <a href="/">Home</a> <span>»</span> <span className="current">{page.breadcrumbCurrent}</span>
                    </div>
                </div>
            </section>

            <section className="articles-section">
                <div className="container articles-grid">

                    <div className="articles-col-side">
                        {leftList.map(b => (
                            <a key={b._id} href={`#blog-${b._id}`} className="side-card">
                                <div className="side-card-img">
                                    <img src={b.image || PLACEHOLDER_IMG} alt={b.title} />
                                    {b.tags?.[0] && <span className="tag-badge">{b.tags[0]}</span>}
                                </div>
                                <h3>{b.title}</h3>
                                <div className="date-row"><FiCalendar size={13} /> {formatDate(b.createdAt)}</div>
                            </a>
                        ))}
                    </div>

                    <div className="articles-col-main">
                        {featured && (
                            <a href={`#blog-${featured._id}`} className="main-card">
                                <div className="main-card-img">
                                    <img src={featured.image || PLACEHOLDER_IMG} alt={featured.title} />
                                    {featured.tags?.[0] && <span className="tag-badge">{featured.tags[0]}</span>}
                                </div>
                                <h2>{featured.title}</h2>
                                <p>{featured.excerpt}</p>
                                <div className="date-row"><FiCalendar size={13} /> {formatDate(featured.createdAt)}</div>
                            </a>
                        )}
                    </div>

                    <div className="articles-col-right">
                        <h3 className="sidebar-title">Recent Articles</h3>
                        <div className="sidebar-divider" />
                        <ul className="sidebar-list">
                            {recentList.map(b => (
                                <li key={b._id}>
                                    <a href={`#blog-${b._id}`}>{b.title}</a>
                                    <div className="date-row"><FiCalendar size={12} /> {formatDate(b.createdAt)}</div>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </section>

            <section className="articles-cta">
                <div className="container cta-inner">
                    <div className="cta-left">
                        <span className="section-label cta-label">{page.cta.label}</span>
                        <h2>{page.cta.title}</h2>
                    </div>
                    <div className="cta-right">
                        <p>{page.cta.text}</p>
                        <a href={page.cta.btnLink} className="cta-btn">{page.cta.btnText}</a>
                    </div>
                </div>
            </section>

            <Footer />

        </>
    );
}