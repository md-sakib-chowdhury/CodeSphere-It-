// import { useState, useEffect } from 'react';
// import { FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';
// import api from '../../utils/api';
// import './Team.css';

// const EXECUTIVES_DEFAULT = [
//     { _id: 'e1', name: 'Sakib Chowdhury', designation: 'Founder & CEO', bio: 'Leading AMANAH IT\'s technical vision with a MERN stack background.', image: '', linkedin: '#', github: 'https://github.com/md-sakib-chowdhury' },
// ];

// const CORE_TEAM_DEFAULT = [
//     { _id: 'c1', name: 'Core Member', designation: 'Infra & Cybersecurity', bio: 'Securing infrastructure and maintaining system reliability.', image: '', linkedin: '#', github: '#' },
//     { _id: 'c2', name: 'Core Member', designation: 'Business Automation', bio: 'Driving product strategy and delivering exceptional user experiences.', image: '', linkedin: '#', github: '#' },
//     { _id: 'c3', name: 'Core Member', designation: 'Business Automation', bio: 'Building automation workflows that save clients time and cost.', image: '', linkedin: '#', github: '#' },
//     { _id: 'c4', name: 'Core Member', designation: 'Business Automation', bio: 'Turning manual processes into efficient automated systems.', image: '', linkedin: '#', github: '#' },
// ];

// function TeamCard({ member, variant, idx }) {
//     const initials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

//     return (
//         <div className={`leader-card ${variant}`} style={{ '--idx': idx }}>
//             <div className="leader-img-wrap">
//                 {member.image ? (
//                     <img src={member.image} alt={member.name} className="leader-img" />
//                 ) : (
//                     <div className="leader-avatar">{initials(member.name)}</div>
//                 )}

//                 <div className="leader-hover-overlay">
//                     <h4 className="hover-name">{member.name}</h4>
//                     <p className={`hover-designation ${variant}`}>{member.designation}</p>
//                     <p className="hover-bio">{member.bio}</p>
//                     <div className="hover-socials">
//                         {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><FiLinkedin /></a>}
//                         {member.github && <a href={member.github} target="_blank" rel="noopener" aria-label="GitHub"><FiGithub /></a>}
//                         {member.twitter && <a href={member.twitter} target="_blank" rel="noopener" aria-label="Twitter"><FiTwitter /></a>}
//                     </div>
//                 </div>
//             </div>

//             <div className="leader-info">
//                 <h3 className="leader-name">{member.name}</h3>
//                 <p className={`leader-designation ${variant}`}>{member.designation}</p>
//             </div>
//         </div>
//     );
// }

// export default function Team() {
//     const [executives, setExecutives] = useState(EXECUTIVES_DEFAULT);
//     const [coreTeam, setCoreTeam] = useState(CORE_TEAM_DEFAULT);

//     useEffect(() => {
//         api.get('/team/executives').then(r => { if (r.data.length) setExecutives(r.data); }).catch(() => { });
//         api.get('/team/core').then(r => { if (r.data.length) setCoreTeam(r.data); }).catch(() => { });
//     }, []);

//     return (
//         <section className="team section" id="team">
//             <div className="container">
//                 <div className="team-section-header">
//                     <span className="team-section-label">Our Team</span>
//                     <h2 className="team-section-title">Meet The Founder</h2>
//                     <p className="team-section-sub">
//                         Driven by passion, guided by excellence — bringing hands-on technical leadership
//                         to every project we take on.
//                     </p>
//                 </div>

//                 <div className="team-group-divider">
//                     <span className="divider-line" />
//                     <h3 className="team-group-title">Executive Leader</h3>
//                     <span className="divider-line" />
//                 </div>

//                 <div className="team-grid executives">
//                     {executives.map((member, i) => (
//                         <TeamCard key={member._id} member={member} variant="orange" idx={i} />
//                     ))}
//                 </div>

//                 <div className="team-group-divider">
//                     <span className="divider-line" />
//                     <h3 className="team-group-title">Core Team</h3>
//                     <span className="divider-line" />
//                 </div>

//                 <div className="team-grid core">
//                     {coreTeam.map((member, i) => (
//                         <TeamCard key={member._id} member={member} variant="blue" idx={i} />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }import { useState, useEffect } from 'react';
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

const DEFAULT_HEADER = {
    label: 'Our Team',
    title: 'Meet The Founder',
    subtext: 'Driven by passion, guided by excellence — bringing hands-on technical leadership to every project we take on.',
    executiveGroupTitle: 'Executive Leader',
    coreGroupTitle: 'Core Team',
};

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
    const [header, setHeader] = useState(DEFAULT_HEADER);

    useEffect(() => {
        api.get('/team/executives').then(r => { if (r.data.length) setExecutives(r.data); }).catch(() => { });
        api.get('/team/core').then(r => { if (r.data.length) setCoreTeam(r.data); }).catch(() => { });
        api.get('/home-sections').then(r => {
            if (r.data?.teamHeader) setHeader({ ...DEFAULT_HEADER, ...r.data.teamHeader });
        }).catch(() => { });
    }, []);

    return (
        <section className="team section" id="team">
            <div className="container">
                <div className="team-section-header">
                    <span className="team-section-label">{header.label}</span>
                    <h2 className="team-section-title">{header.title}</h2>
                    <p className="team-section-sub">{header.subtext}</p>
                </div>

                <div className="team-group-divider">
                    <span className="divider-line" />
                    <h3 className="team-group-title">{header.executiveGroupTitle}</h3>
                    <span className="divider-line" />
                </div>

                <div className="team-grid executives">
                    {executives.map((member, i) => (
                        <TeamCard key={member._id} member={member} variant="orange" idx={i} />
                    ))}
                </div>

                <div className="team-group-divider">
                    <span className="divider-line" />
                    <h3 className="team-group-title">{header.coreGroupTitle}</h3>
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