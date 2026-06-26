import { useEffect, useRef, useState } from 'react';
import './KeyCompetency.css';

const SKILLS = [
    { label: 'Web Development', value: 96 },
    { label: 'UI/UX Design', value: 93 },
    { label: 'Cyber Security', value: 88 },
];

function CircleStat({ label, value, animate }) {
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (animate ? value : 0) / 100 * circumference;

    return (
        <div className="circle-stat">
            <svg width="130" height="130" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r={radius} fill="#0a0e0c" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
                <circle
                    cx="65" cy="65" r={radius}
                    fill="none"
                    stroke="#84cc16"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 65 65)"
                    style={{ transition: 'stroke-dashoffset 1.4s ease-out' }}
                />
                <text x="65" y="72" textAnchor="middle" fontSize="26" fontWeight="800" fill="#fff">
                    {animate ? value : 0}%
                </text>
            </svg>
            <p className="circle-label">{label}</p>
        </div>
    );
}

export default function KeyCompetency() {
    const [animate, setAnimate] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setAnimate(true);
        }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section className="key-competency section" id="key-competency" ref={ref}>
            <div className="container kc-row">
                <div className="kc-text">
                    <span className="section-label">Key Competency</span>
                    <h2 className="kc-title">We're Professional and More Experience</h2>
                    <p className="kc-sub">
                        Stay ahead with our best MERN stack development team in Bangladesh — the
                        perfect blend of cutting-edge technologies and industry expertise.
                    </p>
                    <div className="kc-circles">
                        {SKILLS.map(s => (
                            <CircleStat key={s.label} label={s.label} value={s.value} animate={animate} />
                        ))}
                    </div>
                </div>

                <div className="kc-img-wrap">
                    <img
                        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
                        alt="Development team at work"
                    />
                    <div className="kc-img-caption">
                        <strong>8+ years</strong> of combined experience in this field
                    </div>
                </div>
            </div>
        </section>
    );
}