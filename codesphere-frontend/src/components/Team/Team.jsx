// import { useState, useEffect } from 'react';
// import { FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';
// import api from '../../utils/api';
// import './Team.css';

// const DEFAULTS = [
//     { _id: '1', name: 'Sakib Chowdhury', designation: 'CEO & Lead Developer', bio: 'MERN Stack expert with MSc in IT. Building modern web solutions for 8+ years.', skills: ['React', 'Node.js', 'MongoDB'], linkedin: '#', github: 'https://github.com/md-sakib-chowdhury' },
//     { _id: '2', name: 'Arif Rahman', designation: 'Senior Frontend Dev', bio: 'UI/UX specialist crafting beautiful, responsive interfaces for all devices.', skills: ['React', 'Figma', 'CSS'], linkedin: '#', github: '#' },
//     { _id: '3', name: 'Mitu Akter', designation: 'Backend Developer', bio: 'Node.js and database architect with a passion for scalable systems.', skills: ['Node.js', 'Express', 'AWS'], linkedin: '#', github: '#' },
//     { _id: '4', name: 'Tanvir Hossain', designation: 'Digital Marketing Lead', bio: 'Growth hacker driving organic traffic and brand awareness for clients.', skills: ['SEO', 'Google Ads', 'Analytics'], linkedin: '#', github: '#' },
// ];

// const AVATAR_COLORS = ['#2563eb', '#16a34a', '#3b82f6', '#22c55e'];

// export default function Team() {
//     const [team, setTeam] = useState(DEFAULTS);

//     useEffect(() => {
//         api.get('/team').then(r => { if (r.data.length) setTeam(r.data); }).catch(() => { });
//     }, []);

//     const initials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

//     return (
//         <section className="team section" id="team">
//             <div className="container">
//                 <div className="section-header">
//                     <span className="section-label">Our Team</span>
//                     <h2 className="section-title">Meet the <span className="grad-text">Experts</span></h2>
//                     <p className="section-sub">A passionate team of developers, designers, and marketers ready to bring your vision to life.</p>
//                 </div>

//                 <div className="team-grid">
//                     {team.map((member, i) => (
//                         <div key={member._id} className="team-card" style={{ '--idx': i }}>
//                             <div className="team-img-wrap">
//                                 {member.image ? (
//                                     <img src={member.image} alt={member.name} className="team-img" />
//                                 ) : (
//                                     <div className="team-avatar" style={{ background: AVATAR_COLORS[i % 4] }}>
//                                         {initials(member.name)}
//                                     </div>
//                                 )}
//                                 <div className="team-social-overlay">
//                                     {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><FiLinkedin /></a>}
//                                     {member.github && <a href={member.github} target="_blank" rel="noopener" aria-label="GitHub"><FiGithub /></a>}
//                                     {member.twitter && <a href={member.twitter} target="_blank" rel="noopener" aria-label="Twitter"><FiTwitter /></a>}
//                                 </div>
//                             </div>

//                             <div className="team-info">
//                                 <h3 className="team-name">{member.name}</h3>
//                                 <p className="team-designation">{member.designation}</p>
//                                 <p className="team-bio">{member.bio}</p>
//                                 <div className="team-skills">
//                                     {(member.skills || []).map(s => (
//                                         <span key={s} className="skill-tag">{s}</span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }
import { useState, useEffect } from 'react';
import { FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';
import api from '../../utils/api';
import './Team.css';

const EXECUTIVES_DEFAULT = [
    { _id: 'e1', name: 'Sakib Chowdhury', designation: 'Founder & CEO', bio: 'Leading AMANAH IT\'s technical vision with a MERN stack background.', image: '', linkedin: '#', github: 'https://github.com/md-sakib-chowdhury' },
];

const CORE_TEAM_DEFAULT = [
    { _id: 'c1', name: 'Core Member', designation: 'Infra & Cybersecurity', bio: 'Securing infrastructure and maintaining system reliability.', image: '', linkedin: '#', github: '#' },
    { _id: 'c2', name: 'Core Member', designation: 'Business Automation', bio: 'Driving product strategy and delivering exceptional user experiences.', image: '', linkedin: '#', github: '#' },
    { _id: 'c3', name: 'Core Member', designation: 'Business Automation', bio: 'Building automation workflows that save clients time and cost.', image: '', linkedin: '#', github: '#' },
    { _id: 'c4', name: 'Core Member', designation: 'Business Automation', bio: 'Turning manual processes into efficient automated systems.', image: '', linkedin: '#', github: '#' },
];

function TeamCard({ member, variant, idx }) {
    const initials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className={`leader-card ${variant}`} style={{ '--idx': idx }}>
            <div className="leader-img-wrap">
                {member.image ? (
                    <img src={member.image} alt={member.name} className="leader-img" />
                ) : (
                    <div className="leader-avatar">{initials(member.name)}</div>
                )}

                <div className="leader-hover-overlay">
                    <h4 className="hover-name">{member.name}</h4>
                    <p className={`hover-designation ${variant}`}>{member.designation}</p>
                    <p className="hover-bio">{member.bio}</p>
                    <div className="hover-socials">
                        {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><FiLinkedin /></a>}
                        {member.github && <a href={member.github} target="_blank" rel="noopener" aria-label="GitHub"><FiGithub /></a>}
                        {member.twitter && <a href={member.twitter} target="_blank" rel="noopener" aria-label="Twitter"><FiTwitter /></a>}
                    </div>
                </div>
            </div>

            <div className="leader-info">
                <h3 className="leader-name">{member.name}</h3>
                <p className={`leader-designation ${variant}`}>{member.designation}</p>
            </div>
        </div>
    );
}

export default function Team() {
    const [executives, setExecutives] = useState(EXECUTIVES_DEFAULT);
    const [coreTeam, setCoreTeam] = useState(CORE_TEAM_DEFAULT);

    useEffect(() => {
        api.get('/team/executives').then(r => { if (r.data.length) setExecutives(r.data); }).catch(() => { });
        api.get('/team/core').then(r => { if (r.data.length) setCoreTeam(r.data); }).catch(() => { });
    }, []);

    return (
        <section className="team section" id="team">
            <div className="container">
                <div className="team-section-header">
                    <span className="team-section-label">Our Team</span>
                    <h2 className="team-section-title">Meet Our Leaders</h2>
                    <p className="team-section-sub">
                        Driven by passion, guided by excellence. Our leadership team brings decades of
                        combined experience to drive innovation and success.
                    </p>
                </div>

                <div className="team-group-divider">
                    <span className="divider-line" />
                    <h3 className="team-group-title">Executive Leaders</h3>
                    <span className="divider-line" />
                </div>

                <div className="team-grid executives">
                    {executives.map((member, i) => (
                        <TeamCard key={member._id} member={member} variant="orange" idx={i} />
                    ))}
                </div>

                <div className="team-group-divider">
                    <span className="divider-line" />
                    <h3 className="team-group-title">Core Team</h3>
                    <span className="divider-line" />
                </div>

                <div className="team-grid core">
                    {coreTeam.map((member, i) => (
                        <TeamCard key={member._id} member={member} variant="blue" idx={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}