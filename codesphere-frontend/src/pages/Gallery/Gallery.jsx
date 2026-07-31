// import { useEffect, useState } from 'react';
// import Navbar from '../../components/Navbar/Navbar';
// import Footer from '../../components/Footer/Footer';
// import api from '../../utils/api';
// import './Gallery.css';

// export default function GalleryPage() {
//     const [images, setImages] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => { window.scrollTo(0, 0); }, []);

//     useEffect(() => {
//         api.get('/gallery')
//             .then(r => setImages(r.data || []))
//             .catch(() => { })
//             .finally(() => setLoading(false));
//     }, []);

//     return (
//         <>
//             <Navbar />

//             <section className="gallery-hero-banner">
//                 <div className="container">
//                     <div className="breadcrumb">
//                         <a href="/">Home</a> <span>»</span> <span className="current">Gallery</span>
//                     </div>
//                     <h1>Gallery</h1>
//                 </div>
//             </section>

//             <section className="gallery-page-section">
//                 <div className="container">
//                     <h2 className="gallery-page-heading">A glimpse of our recent activities</h2>

//                     {loading ? (
//                         <p className="gallery-empty">Loading...</p>
//                     ) : images.length === 0 ? (
//                         <p className="gallery-empty">No images have been added yet.</p>
//                     ) : (
//                         <div className="gallery-full-grid">
//                             {images.map((img) => (
//                                 <div className="gallery-full-item" key={img._id}>
//                                     <img src={img.url} alt={img.caption || 'Gallery'} loading="lazy" />
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </section>

//             <Footer />
//         </>
//     );
// }
// import { useEffect, useState } from 'react';
// import Navbar from '../../components/Navbar/Navbar';
// import Footer from '../../components/Footer/Footer';
// import api from '../../utils/api';
// import './Gallery.css';

// // Khub wide image (jemon horizontal logo banner) hole "contain" e switch kore,
// // jate full image dekha jai, kono crop na hoy. Normal photo gula "cover"-e thake.
// function handleImageLoad(e) {
//     const { naturalWidth, naturalHeight } = e.target;
//     const ratio = naturalWidth / naturalHeight;
//     if (ratio > 1.4) {
//         e.target.style.objectFit = 'contain';
//         e.target.style.padding = '10px';
//         e.target.style.background = '#fff';
//     }
// }

// export default function GalleryPage() {
//     const [images, setImages] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => { window.scrollTo(0, 0); }, []);

//     useEffect(() => {
//         api.get('/gallery')
//             .then(r => setImages(r.data || []))
//             .catch(() => { })
//             .finally(() => setLoading(false));
//     }, []);

//     return (
//         <>
//             <Navbar />

//             <section className="gallery-hero-banner">
//                 <div className="container">
//                     <div className="breadcrumb">
//                         <a href="/">Home</a> <span>»</span> <span className="current">Gallery</span>
//                     </div>
//                     <h1>Gallery</h1>
//                 </div>
//             </section>

//             <section className="gallery-page-section">
//                 <div className="container">
//                     <h2 className="gallery-page-heading">A glimpse of our recent activities</h2>

//                     {loading ? (
//                         <p className="gallery-empty">Loading...</p>
//                     ) : images.length === 0 ? (
//                         <p className="gallery-empty">No images have been added yet.</p>
//                     ) : (
//                         <div className="gallery-full-grid">
//                             {images.map((img) => (
//                                 <div className="gallery-full-item" key={img._id}>
//                                     <img
//                                         src={img.url}
//                                         alt={img.caption || 'Gallery'}
//                                         loading="lazy"
//                                         onLoad={handleImageLoad}
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </section>

//             <Footer />
//         </>
//     );
// }
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import api from '../../utils/api';
import './Gallery.css';

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

export default function GalleryPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bannerImage, setBannerImage] = useState(null); // null hole default gradient dekhabe

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useEffect(() => {
        api.get('/gallery')
            .then(r => setImages(r.data || []))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        // Backend-e emon ekta endpoint dhoray nichi jeta admin panel theke set kora
        // banner image URL ferot dey. Nijer actual endpoint diye eta replace koro
        // (jemon /settings, /site-settings, /gallery-banner ityadi).
        api.get('/settings/gallery-banner')
            .then(r => {
                if (r.data?.imageUrl) setBannerImage(r.data.imageUrl);
            })
            .catch(() => { }); // fail korle default gradient e thakbe
    }, []);

    const bannerStyle = bannerImage
        ? { '--hero-bg-image': `url(${bannerImage})` }
        : undefined;

    return (
        <>
            <Navbar />

            <section className="gallery-hero-banner" style={bannerStyle}>
                <div className="container">
                    <div className="breadcrumb">
                        <a href="/">Home</a> <span>»</span> <span className="current">Gallery</span>
                    </div>
                    <h1>Gallery</h1>
                </div>
            </section>

            <section className="gallery-page-section">
                <div className="container">
                    <h2 className="gallery-page-heading">A glimpse of our recent activities</h2>

                    {loading ? (
                        <p className="gallery-empty">Loading...</p>
                    ) : images.length === 0 ? (
                        <p className="gallery-empty">No images have been added yet.</p>
                    ) : (
                        <div className="gallery-full-grid">
                            {images.map((img) => (
                                <div className="gallery-full-item" key={img._id}>
                                    <img
                                        src={img.url}
                                        alt={img.caption || 'Gallery'}
                                        loading="lazy"
                                        onLoad={handleImageLoad}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}