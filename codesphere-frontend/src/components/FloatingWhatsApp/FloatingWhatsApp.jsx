import { FaWhatsapp } from 'react-icons/fa';
import './FloatingWhatsApp.css';

// ⚠️ Demo number — pore real business WhatsApp number diye eita replace kore dio.
// Country code soho, kono +, space, ba dash chara likhte hobe (jemon: 8801800000000)
const WHATSAPP_NUMBER = '8801800000000';
const DEFAULT_MESSAGE = 'Hi AMANAH IT, I am interested in your services.';

export default function FloatingWhatsApp() {
    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-whatsapp-btn"
            aria-label="Chat with us on WhatsApp"
        >
            <FaWhatsapp size={26} />
            <span className="floating-whatsapp-tooltip">WhatsApp Us</span>
        </a>
    );
}