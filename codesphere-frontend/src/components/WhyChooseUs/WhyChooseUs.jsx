import { FiArrowRight } from 'react-icons/fi';
import './WhyChooseUs.css';

export default function WhyChooseUs() {
    return (
        <section className="why-choose section" id="why-choose">
            <div className="container why-row">
                <div className="why-text">
                    <span className="section-label">Why Choose Us</span>
                    <h2 className="why-title">
                        IT Services BD —<br />Skyrocket Your Business
                    </h2>
                    <p className="why-sub">
                        Unlock your business potential with our IT service expertise, reliability,
                        and passion for delivering exceptional results.
                    </p>
                    <a href="/explore-us" className="btn btn-primary why-btn">
                        Learn More Us <FiArrowRight />
                    </a>
                </div>

                <div className="why-images">
                    <div className="why-img-card">
                        <img
                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
                            alt="Professional strategy"
                        />
                        <p>Professional Strategy</p>
                    </div>
                    <div className="why-img-card">
                        <img
                            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80"
                            alt="Great communication"
                        />
                        <p>Great Communication</p>
                    </div>
                </div>
            </div>
        </section>
    );
}