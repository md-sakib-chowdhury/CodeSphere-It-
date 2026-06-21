import { useState, useEffect } from 'react';
import { FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';
import api from '../../utils/api';
import './Team.css';

const DEFAULTS = [
    { _id: '1', name: 'Sakib Chowdhury', designation: 'CEO & Lead Developer', bio: 'MERN Stack expert with MSc in IT. Building modern web solutions for 8+ years.', skills: ['React', 'Node.js', 'MongoDB'], linkedin: '#', github: 'https://github.com/md-sakib-chowdhury' },
    { _id: '2', name: 'Arif Rahman', designation: 'Senior Frontend Dev', bio: 'UI/UX specialist crafting beautiful, responsive interfaces for all devices.', skills: ['React', 'Figma', 'CSS'], linkedin: '#', github: '#' },
    { _id: '3', name: 'Mitu Akter', designation: 'Backend Developer', bio: 'Node.js and database architect with a passion for scalable systems.', skills: ['Node.js', 'Express', 'AWS'], linkedin: '#', github: '#' },
    { _id: '4', name: 'Tanvir Hossain', designation: 'Digital Marketing Lead', bio: 'Growth hacker driving organic traffic and brand awareness for clients.', skills: ['SEO', 'Google Ads', 'Analytics'], linkedin: '#', github: '#' },
];

const AVATAR_COLORS = ['#2563eb', '#16a34a', '#3b82f6', '#22c55e'];

export default function Team() {
    const [team, setTeam] = useState(DEFAULTS);

    useEffect(() => {
        api.get('/team').then(r => { if (r.data.length) setTeam(r.data); }).catch(() => { });
    }, []);

    const initials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <section className="team section" id="team">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Our Team</span>
                    <h2 className="section-title">Meet the <span className="grad-text">Experts</span></h2>
                    <p className="section-sub">A passionate team of developers, designers, and marketers ready to bring your vision to life.</p>
                </div>

                <div className="team-grid">
                    {team.map((member, i) => (
                        <div key={member._id} className="team-card" style={{ '--idx': i }}>
                            <div className="team-img-wrap">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="team-img" />
                                ) : (
                                    <div className="team-avatar" style={{ background: AVATAR_COLORS[i % 4] }}>
                                        {initials(member.name)}
                                    </div>
                                )}
                                <div className="team-social-overlay">
                                    {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><FiLinkedin /></a>}
                                    {member.github && <a href={member.github} target="_blank" rel="noopener" aria-label="GitHub"><FiGithub /></a>}
                                    {member.twitter && <a href={member.twitter} target="_blank" rel="noopener" aria-label="Twitter"><FiTwitter /></a>}
                                </div>
                            </div>

                            <div className="team-info">
                                <h3 className="team-name">{member.name}</h3>
                                <p className="team-designation">{member.designation}</p>
                                <p className="team-bio">{member.bio}</p>
                                <div className="team-skills">
                                    {(member.skills || []).map(s => (
                                        <span key={s} className="skill-tag">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}