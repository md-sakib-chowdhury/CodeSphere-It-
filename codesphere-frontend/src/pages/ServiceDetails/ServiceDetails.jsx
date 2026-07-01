import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone,
    FiArrowRight, FiCheckCircle,
} from 'react-icons/fi';
import api from '../../utils/api';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './ServiceDetails.css';

const ICONS = { FiCode, FiShoppingCart, FiLayout, FiServer, FiCloud, FiSmartphone };

// Same fallback data as ServicesPage — each entry needs a `slug`
// so the URL and the card link up. Swap in real data from your
// /services API once it returns a slug field.
const FALLBACK_SERVICES = [
    {
        _id: '1',
        slug: 'web-application-development',
        icon: 'FiCode',
        title: 'Web Application Development',
        summary: 'Custom, full-stack web apps built on the MERN stack.',
        points: [
            'React front-ends with fast, accessible interfaces',
            'Node.js & Express APIs built for scale',
            'MongoDB data modeling for real business logic',
        ],
        body: 'We design and build web applications from the ground up using React, Node.js, Express, and MongoDB. Every project starts with the actual workflow your business runs on — not a generic template — so the final product fits how your team already works.',
    },
    {
        _id: '2',
        slug: 'ecommerce-solutions',
        icon: 'FiShoppingCart',
        title: 'E-commerce Solutions',
        summary: 'Storefronts that are built to convert and easy to manage.',
        points: [
            'Custom checkout, cart & payment gateway integration',
            'Inventory and order management dashboards',
            'Fast, mobile-first shopping experience',
        ],
        body: 'From product catalog to checkout, we build online stores that are fast on mobile and simple to manage from the back end. Payment gateways, inventory tracking, and order management are built in from day one, not bolted on later.',
    },
    {
        _id: '3',
        slug: 'ui-ux-design',
        icon: 'FiLayout',
        title: 'UI/UX Design',
        summary: 'Interfaces designed around how people actually use them.',
        points: [
            'Wireframes and prototypes before a line of code',
            'Design systems that keep products consistent',
            'Usability-first, not decoration-first',
        ],
        body: 'Good interfaces get out of the way. We start with wireframes and prototypes to validate the flow before writing any code, then build a design system so every new screen stays consistent with the last.',
    },
    {
        _id: '4',
        slug: 'custom-software-saas',
        icon: 'FiServer',
        title: 'Custom Software & SaaS',
        summary: 'Internal tools and multi-tenant platforms built from scratch.',
        points: [
            'Admin panels, dashboards, and internal tools',
            'Role-based access and subscription billing',
            'API-first architecture for future integrations',
        ],
        body: 'Whether it\u2019s an internal tool for your team or a multi-tenant SaaS product for customers, we build with an API-first approach so the platform can grow without a rewrite. Role-based access and billing are handled from the start.',
    },
    {
        _id: '5',
        slug: 'deployment-cloud-hosting',
        icon: 'FiCloud',
        title: 'Deployment & Cloud Hosting',
        summary: 'From local build to production, handled end-to-end.',
        points: [
            'CI/CD pipelines with Vercel, Render & MongoDB Atlas',
            'Environment configuration & secrets management',
            'Monitoring and uptime support after launch',
        ],
        body: 'We handle the full path from a working build on your machine to a live, monitored production environment — CI/CD pipelines, environment variables, secrets, and uptime checks all set up before we hand over the keys.',
    },
    {
        _id: '6',
        slug: 'maintenance-support',
        icon: 'FiSmartphone',
        title: 'Maintenance & Support',
        summary: 'Software that keeps working after we ship it.',
        points: [
            'Bug fixes and security patches',
            'Feature additions as your business grows',
            'Direct communication, no ticket queues',
        ],
        body: 'Launch day isn\u2019t the finish line. We stay on for bug fixes, security patches, and new features as your business needs change — and you talk directly to the people who built it, not a support queue.',
    },
];

export default function ServiceDetails() {
    const { slug } = useParams();
    const [services, setServices] = useState(FALLBACK_SERVICES);

    useEffect(() => {
        api.get('/services')
            .then(r => { if (r.data?.length) setServices(r.data); })
            .catch(() => { /* keep fallback content */ });
    }, []);

    const service = services.find(s => s.slug === slug);

    if (!service) {
        return (
            <>
                <Navbar />
                <div className="svcd-page">
                    <section className="svcd-hero svcd-hero--notfound">
                        <div className="container svcd-hero-content">
                            <div className="svcd-breadcrumb">
                                <Link to="/">Home</Link>
                                <span className="svcd-crumb-sep">»</span>
                                <Link to="/services">Services</Link>
                            </div>
                            <h1 className="svcd-hero-title">Service Not Found</h1>
                            <p className="svcd-hero-sub">
                                We couldn't find that service. Have a look at everything we offer instead.
                            </p>
                            <Link to="/services" className="svcd-back-btn">Back to Services</Link>
                        </div>
                    </section>
                </div>
                <Footer />
            </>
        );
    }

    const Icon = ICONS[service.icon] || FiCode;

    return (
        <>
            <Navbar />
            <div className="svcd-page">

                {/* ---------- Hero banner ---------- */}
                <section className="svcd-hero">
                    <div className="svcd-hero-bg" />
                    <div className="svcd-hero-overlay" />
                    <div className="container svcd-hero-content">
                        <div className="svcd-breadcrumb">
                            <Link to="/">Home</Link>
                            <span className="svcd-crumb-sep">»</span>
                            <Link to="/services">Services</Link>
                            <span className="svcd-crumb-sep">»</span>
                            <span className="svcd-crumb-current">{service.title}</span>
                        </div>
                        <h1 className="svcd-hero-title">{service.title}</h1>
                    </div>
                </section>

                {/* ---------- Content ---------- */}
                <section className="svcd-content">
                    <div className="container svcd-content-grid">

                        <div className="svcd-main">
                            <span className="svcd-icon-badge"><Icon size={30} /></span>
                            <h2 className="svcd-heading">{service.summary}</h2>
                            <p className="svcd-body">{service.body}</p>

                            {Array.isArray(service.points) && service.points.length > 0 && (
                                <div className="svcd-points-block">
                                    <h3>What's Included</h3>
                                    <ul className="svcd-points">
                                        {service.points.map((p, idx) => (
                                            <li key={idx}>
                                                <FiCheckCircle size={16} className="svcd-point-icon" />
                                                <span>{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <aside className="svcd-sidebar">
                            <div className="svcd-sidebar-card">
                                <h4>Other Services</h4>
                                <ul className="svcd-sidebar-list">
                                    {services.map(s => (
                                        <li key={s._id || s.slug}>
                                            <Link
                                                to={`/services/${s.slug}`}
                                                className={s.slug === slug ? 'active' : ''}
                                            >
                                                {s.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="svcd-sidebar-cta">
                                <h4>Need this for your business?</h4>
                                <p>Tell us what you're building and we'll get back within a day.</p>
                                <Link to="/contact" className="svcd-sidebar-btn">
                                    Request a Quote <FiArrowRight />
                                </Link>
                            </div>
                        </aside>

                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
}