import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import './GallerySection.css';

// API theke image na ashle ei placeholder gula dekhabe
const PLACEHOLDER_IMAGES = [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=80',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80',
].map((url, i) => ({ _id: `placeholder-${i}`, url }));

export default function GallerySection() {
    const [images, setImages] = useState(PLACEHOLDER_IMAGES);

    useEffect(() => {
        api.get('/gallery').then(r => {
            if (r.data?.length) setImages(r.data.slice(0, 6));
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
                            <img src={img.url} alt={img.caption || 'Gallery'} loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}