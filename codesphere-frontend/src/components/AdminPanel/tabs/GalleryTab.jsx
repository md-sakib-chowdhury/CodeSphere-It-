import { useState, useEffect } from 'react';
import { FiUpload, FiTrash2, FiImage } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../../utils/api';

const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

export default function GalleryTab() {
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const load = () => {
        api.get('/gallery').then(r => setImages(r.data)).catch(() => { });
    };

    useEffect(() => { load(); }, []);

    const handleFilesSelected = async (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        setUploading(true);
        try {
            const base64List = await Promise.all(files.map(fileToBase64));
            const payload = base64List.map(image => ({ image }));
            const res = await api.post('/gallery', { images: payload });
            setImages(prev => [...res.data, ...prev]);
            toast.success(`${res.data.length} image(s) uploaded!`);
        } catch {
            toast.error('Upload failed');
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this image?')) return;
        setDeletingId(id);
        try {
            await api.delete(`/gallery/${id}`);
            setImages(prev => prev.filter(img => img._id !== id));
            toast.success('Image deleted');
        } catch {
            toast.error('Failed to delete');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h2>Gallery</h2>
                    <p>Upload and manage images shown in the homepage Gallery section and the full Gallery page.</p>
                </div>
                <label className="admin-btn admin-btn-primary" style={{ cursor: 'pointer' }}>
                    <FiUpload size={15} /> {uploading ? 'Uploading...' : 'Upload Images'}
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFilesSelected}
                        style={{ display: 'none' }}
                        disabled={uploading}
                    />
                </label>
            </div>

            <div className="admin-card">
                {images.length === 0 ? (
                    <p style={{ color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <FiImage size={16} /> No images uploaded yet.
                    </p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
                        {images.map(img => (
                            <div key={img._id} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                                <img src={img.url} alt="" style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
                                <button
                                    className="admin-btn admin-btn-outline admin-btn-sm"
                                    onClick={() => handleDelete(img._id)}
                                    disabled={deletingId === img._id}
                                    style={{ position: 'absolute', top: 6, right: 6, background: '#fff' }}
                                    aria-label="Delete image"
                                >
                                    <FiTrash2 size={13} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}