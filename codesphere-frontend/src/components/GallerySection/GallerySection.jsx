// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../../utils/api';
// import './GallerySection.css';

// // API theke image na ashle ei placeholder gula dekhabe
// const PLACEHOLDER_IMAGES = [
//     'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80',
//     'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80',
//     'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80',
//     'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80',
//     'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=80',
//     'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80',
// ].map((url, i) => ({ _id: `placeholder-${i}`, url }));

// export default function GallerySection() {
//     const [images, setImages] = useState(PLACEHOLDER_IMAGES);

//     useEffect(() => {
//         api.get('/gallery').then(r => {
//             if (r.data?.length) setImages(r.data.slice(0, 6));
//         }).catch(() => { });
//     }, []);

//     return (
//         <section className="gallery-preview">
//             <div className="container">
//                 <div className="gallery-preview-header">
//                     <div>
//                         <span className="section-label">Our Gallery</span>
//                         <h2 className="gallery-preview-title">A Glimpse of Our Recent Activities</h2>
//                     </div>
//                     <Link to="/gallery" className="gallery-see-more-btn">See More</Link>
//                 </div>

//                 <div className="gallery-preview-grid">
//                     {images.map((img) => (
//                         <div className="gallery-preview-item" key={img._id}>
//                             <img src={img.url} alt={img.caption || 'Gallery'} loading="lazy" />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../../utils/api';
// import './GallerySection.css';

// // Real image kom thakle ei gula diye slot bhorat kora hobe (6 porjonto)
// const PLACEHOLDER_IMAGES = [
//     'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80',
//     'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80',
//     'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80',
//     'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80',
//     'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=80',
//     'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80',
// ].map((url, i) => ({ _id: `placeholder-${i}`, url }));

// const TOTAL_SLOTS = 6;

// export default function GallerySection() {
//     const [images, setImages] = useState(PLACEHOLDER_IMAGES);

//     useEffect(() => {
//         api.get('/gallery').then(r => {
//             const real = r.data || [];
//             if (real.length >= TOTAL_SLOTS) {
//                 // real image e shob slot bhorat, placeholder lagbe na
//                 setImages(real.slice(0, TOTAL_SLOTS));
//             } else {
//                 // real image gula age, baki slot placeholder diye bhorat
//                 const needed = TOTAL_SLOTS - real.length;
//                 setImages([...real, ...PLACEHOLDER_IMAGES.slice(0, needed)]);
//             }
//         }).catch(() => { });
//     }, []);

//     return (
//         <section className="gallery-preview">
//             <div className="container">
//                 <div className="gallery-preview-header">
//                     <div>
//                         <span className="section-label">Our Gallery</span>
//                         <h2 className="gallery-preview-title">A Glimpse of Our Recent Activities</h2>
//                     </div>
//                     <Link to="/gallery" className="gallery-see-more-btn">See More</Link>
//                 </div>

//                 <div className="gallery-preview-grid">
//                     {images.map((img) => (
//                         <div className="gallery-preview-item" key={img._id}>
//                             <img src={img.url} alt={img.caption || 'Gallery'} loading="lazy" />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import './GallerySection.css';

// Real image kom thakle ei gula diye slot bhorat kora hobe (12 porjonto)
const PLACEHOLDER_IMAGES = [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=80',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80',
];

const TOTAL_SLOTS = 12; // 6 per row x 2 rows

// Placeholder list-ta 6-ta URL, dorkar hole cycle kore repeat kore 12 porjonto banano hoy
function buildPlaceholders(count) {
    return Array.from({ length: count }, (_, i) => ({
        _id: `placeholder-${i}`,
        url: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
    }));
}

// Khub wide image (jemon horizontal logo banner) hole "contain" e switch kore,
// jate full image dekha jai, kono crop na hoy. Normal photo gula "cover"-e thake.
function handleImageLoad(e) {
    const { naturalWidth, naturalHeight } = e.target;
    const ratio = naturalWidth / naturalHeight;
    if (ratio > 1.4) {
        e.target.style.objectFit = 'contain';
        e.target.style.padding = '10px';
        e.target.style.background = '#fff';
    }
}

export default function GallerySection() {
    const [images, setImages] = useState(buildPlaceholders(TOTAL_SLOTS));

    useEffect(() => {
        api.get('/gallery').then(r => {
            const real = r.data || [];
            if (real.length >= TOTAL_SLOTS) {
                // real image e shob slot bhorat, placeholder lagbe na
                // ekhane shudhu first 12-ta dekhano hocche; 12-er beshi thakle baki gula shudhu /gallery page-e dekha jabe
                setImages(real.slice(0, TOTAL_SLOTS));
            } else {
                // real image gula age, baki slot placeholder diye bhorat
                const needed = TOTAL_SLOTS - real.length;
                setImages([...real, ...buildPlaceholders(needed)]);
            }
        }).catch(() => { });
    }, []);

    return (
        <section className="gallery-preview">
            <div className="container">
                <div className="gallery-preview-header">
                    <div>
                        <span className="section-label">Our Gallery</span>
                        <h2 className="gallery-preview-title">A Glimpse of Our Recent Activities</h2>
                    </div>
                    <Link to="/gallery" className="gallery-see-more-btn">See More</Link>
                </div>

                <div className="gallery-preview-grid">
                    {images.map((img) => (
                        <div className="gallery-preview-item" key={img._id}>
                            <img
                                src={img.url}
                                alt={img.caption || 'Gallery'}
                                loading="lazy"
                                onLoad={handleImageLoad}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}