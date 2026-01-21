import React, { useState, useEffect } from 'react';
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

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
                    <li 
                        key={item.id} 
                        className={styles.navLink}
                        onClick={() => scrollToSection(item.id)}
                    >
                        {item.icon} {item.label}
                    </li>
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
