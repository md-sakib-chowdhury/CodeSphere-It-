import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import api from '../../utils/api';
import './Gallery.css';

export default function GalleryPage() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useEffect(() => {
        api.get('/gallery')
            .then(r => setImages(r.data || []))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Navbar />

            <section className="gallery-hero-banner">
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
                                    <img src={img.url} alt={img.caption || 'Gallery'} loading="lazy" />
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