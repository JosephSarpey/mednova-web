'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-[9999]">
            <button
                type="button"
                onClick={scrollToTop}
                className={`${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    } bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                aria-label="Back to top"
            >
                <ArrowUp className="w-6 h-6" />
            </button>
        </div>
    );
};

export default ScrollToTop;
