import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

// ...

const NavItem = ({ item, onClick, className, iconClassName }) => {
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
             <span className={iconClassName}>{item.icon}</span> {item.label}
        </li>
    );
};

import styles from './Navbar.module.css';
import { useTheme } from '../../common/themeContext';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { FaHome, FaProjectDiagram, FaUserTie, FaEnvelope, FaCode, FaUser } from 'react-icons/fa';

import { useLocation, useNavigate } from 'react-router-dom';

// ... existing imports ...

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

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

    // Handle scroll from other pages
    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const id = location.state.scrollTo;
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
            // Clear state to prevent scroll on refresh - actually difficult in React Router without history replacement, 
            // but harmless here.
        }
    }, [location]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const navItems = [
        { label: 'Home', id: 'hero', icon: <FaHome />, path: '/' },
        { label: 'Projects', id: 'projects', icon: <FaProjectDiagram />, path: '/projects' },
        { label: 'Blogs', id: 'blogs', icon: <FaCode />, path: '/blogs' },
    ];

    // Helper to determine current active page
    const getCurrentPage = () => {
        if (location.pathname === '/projects') return 'projects';
        if (location.pathname === '/blogs') return 'blogs';
        return 'hero'; // Default to home
    };

    const scrollToSection = (id) => {
        if (id === 'projects') {
            navigate('/projects');
            window.scrollTo(0, 0);
            setMobileMenuOpen(false);
            return;
        }

        if (id === 'blogs') {
            navigate('/blogs');
            window.scrollTo(0, 0);
            setMobileMenuOpen(false);
            return;
        }

        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        setMobileMenuOpen(false);
    };

    const toggleRef = useRef(null);
    const rotationRef = useRef(0); // Store rotation in ref to persist across re-renders
    const speedRef = useRef(scrolled ? 0.2 : 1.5); // Store current speed

    // Smooth rotation logic for theme toggle
    useEffect(() => {
        let animationFrameId;

        const animate = () => {
            // Update target speed based on LASTEST scrolled state (captured in closure or ref if needed, 
            // but here we can trust the 'scrolled' value from the render scope significantly enough 
            // if we are careful, or better yet, just use the ref approach completely)
            
            // Actually, since we want to avoid re-running the effect on `scrolled` change (which kills the loop),
            // we should probably just use `scrolled` as a dependency but NOT reset `rotationRef`.
            // The previous implementation had `let rotation = 0` inside, which reset on every dependency change.
            // By moving `rotation` to `rotationRef`, we solve the reset issue!
            
            const targetSpeed = scrolled ? 0.2 : 1.5; 
            
            // Smoothly interpolate current speed to desired speed
            speedRef.current += (targetSpeed - speedRef.current) * 0.05;

            // Update rotation
            rotationRef.current += speedRef.current;
            
            if (toggleRef.current) {
                toggleRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
            }
            
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [scrolled]); // Re-running is fine now because we use refs for state!

    return (
        <nav className={`${styles.navbar} ${scrolled && !mobileMenuOpen ? styles.scrolled : ''}`}>
            
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
                        className={`${styles.navLink} ${getCurrentPage() === item.id ? styles.activeNavLink : ''}`}
                        iconClassName={styles.navIcon}
                        onClick={() => scrollToSection(item.id)}
                    />
                ))}
            </ul>

            <div 
                className={styles.themeToggle} 
                onClick={toggleTheme}
                title="Toggle Theme"
            >
                {/* Apply ref to the inner span/div wrapping the icon so it rotates independently */}
                <div ref={toggleRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
