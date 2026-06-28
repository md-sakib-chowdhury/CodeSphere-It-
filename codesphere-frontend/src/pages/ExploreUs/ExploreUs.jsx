import { FiArrowUp } from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useEffect } from 'react';
import './ExploreUs.css';

export default function ExploreUs() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <>
            <Navbar />

            <section className="page-banner">
                <div className="container">
                    <div className="breadcrumb">
                        <a href="/">Home</a> <span>»</span> <span className="current">Explore Us</span>
                    </div>
                    <h1>Explore Us</h1>
                </div>
            </section>

            <section className="explore-section">
                <div className="container explore-row">
                    <div className="explore-text">
                        <h2>About Us</h2>
                        <p>
                            AMANAH IT is a modern software development and IT consultancy firm based in Bangladesh,
                            specializing in full-stack MERN web applications, e-commerce platforms, and custom digital
                            solutions. The name "Amanah" means trust — and that principle guides every line of code we
                            write and every relationship we build with our clients.
                        </p>
                        <p>
                            We work with startups, growing businesses, and enterprises to design, build, and maintain
                            technology that actually moves their business forward — combining technical excellence with
                            honest, transparent communication at every step of the project.
                        </p>
                    </div>
                    <div className="explore-img-wrap">
                        <img
                            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
                            alt="AMANAH IT team at work"
                        />
                    </div>
                </div>
            </section>

            <section className="explore-section alt-bg">
                <div className="container explore-row reverse">
                    <div className="explore-img-wrap">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                            alt="Our mission"
                        />
                    </div>
                    <div className="explore-text">
                        <h2>Our Mission</h2>
                        <p>
                            To help businesses grow by delivering secure, scalable, and well-engineered software —
                            built on trust, transparency, and a genuine understanding of each client's goals.
                            AMANAH IT's mission includes:
                        </p>
                        <ul>
                            <li>Providing high-quality web development, e-commerce, and custom software solutions that improve our clients' business operations.</li>
                            <li>Making technology more accessible and secure for small and growing businesses.</li>
                            <li>Maintaining honest, clear communication throughout every project we take on.</li>
                            <li>Delivering real value for every taka invested by our clients.</li>
                            <li>Creating a workplace where our team can grow, learn, and do meaningful work.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="explore-section">
                <div className="container explore-row">
                    <div className="explore-text">
                        <h2>Our Vision</h2>
                        <p>
                            To become one of Bangladesh's most trusted MERN stack development partners — known not
                            just for clean code, but for reliability, honesty, and long-term client relationships.
                        </p>
                        <p>
                            We believe technology should be built with the same care as a promise kept. As we grow,
                            we remain committed to staying hands-on, technically sharp, and always ready to take on
                            the next challenge — for our clients and for ourselves.
                        </p>
                    </div>
                    <div className="explore-img-wrap">
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
                            alt="Our vision"
                        />
                    </div>
                </div>
            </section>

            <section className="explore-section alt-bg">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Innovative Workplace</span>
                        <h2 className="section-title">Corporate Environment / Creativity at Work</h2>
                    </div>
                    <div className="explore-row">
                        <div className="explore-img-wrap">
                            <img
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                                alt="Innovative workplace"
                            />
                        </div>
                        <div className="explore-text">
                            <p>
                                Behind every project we deliver is a team that genuinely enjoys solving problems
                                together. We've built a workplace culture rooted in collaboration, curiosity, and
                                continuous learning — where junior and senior developers alike are encouraged to
                                question, experiment, and improve.
                            </p>
                            <p>
                                As AMANAH IT grows, we stay committed to innovation and steady improvement. We believe
                                there's no ceiling on how good our work can get — that mindset pushes us to explore new
                                tools, adopt modern practices, and refine what we offer so it keeps exceeding what our
                                clients expect.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

         

            <Footer />

        </>
    );
}