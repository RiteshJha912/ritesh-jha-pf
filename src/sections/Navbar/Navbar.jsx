import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

// ...

const NavItem = ({ item, onClick, mobileMenuOpen, className }) => {
    const itemRef = useRef(null);

    const handleMouseMove = (e) => {
        // Disable magnetic effect on mobile screens or when menu is open (which implies mobile usually)
        if (window.innerWidth <= 768) return; 

        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        
        // Calculate distance from center
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        
        // Increased multiplier for wider range/stronger pull
        gsap.to(itemRef.current, {
            x: x * 0.6, 
            y: y * 0.6,
            scale: 1.1,
            duration: 0.3,
            ease: "power3.out"
        });
    };

    const handleMouseLeave = () => {
        if (window.innerWidth <= 768) return;

        gsap.to(itemRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
    };

    return (
        <li 
            ref={itemRef}
            className={className}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }} // inline flex to keep icon/text together
        >
             {mobileMenuOpen && item.icon} {item.label}
        </li>
    );
};

import styles from './Navbar.module.css';
import { useTheme } from '../../common/themeContext';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { FaHome, FaProjectDiagram, FaUserTie, FaEnvelope, FaCode } from 'react-icons/fa';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
             if (window.scrollY > 50) {
                 setScrolled(true);
             } else {
                 setScrolled(false);
             }
        };

        const handleResize = () => {
             if (window.innerWidth > 768) {
                 setMobileMenuOpen(false);
             }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [mobileMenuOpen]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const navItems = [
        { label: 'Home', id: 'hero', icon: <FaHome /> },
        { label: 'Projects', id: 'projects', icon: <FaProjectDiagram /> },
        { label: 'Skills', id: 'skills', icon: <FaCode /> },
        { label: 'Experience', id: 'internships', icon: <FaUserTie /> },
        { label: 'Contact', id: 'contact', icon: <FaEnvelope /> },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setMobileMenuOpen(false);
        }
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            
            <button 
                className={styles.mobileMenuBtn} 
                onClick={toggleMobileMenu}
                aria-label="Toggle Menu"
            >
                {mobileMenuOpen ? <IoClose /> : <RxHamburgerMenu />}
            </button>

            <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.open : ''}`}>
                {navItems.map((item) => (
                    <NavItem 
                        key={item.id}
                        item={item}
                        className={styles.navLink}
                        mobileMenuOpen={mobileMenuOpen}
                        onClick={() => scrollToSection(item.id)}
                    />
                ))}
            </ul>

            <div 
                className={styles.themeToggle} 
                onClick={toggleTheme}
                title="Toggle Theme"
            >
                {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
            </div>
        </nav>
    );
};

export default Navbar;
