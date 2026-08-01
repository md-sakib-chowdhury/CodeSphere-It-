import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Route change hole automatically page-er top-e scroll kore dey.
// App.jsx-e Router-er bhitore, Routes-er pashe ekbar boshale hobe,
// prottek page-e alada kore useEffect(scrollTo) likhte hobe na.
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}