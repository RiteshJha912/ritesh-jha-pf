import { useEffect, useCallback } from 'react';
import { useTheme } from './themeContext';
import gsap from 'gsap';

const ClickSparkle = ({ count = 8, size = 4 }) => {
    const { theme } = useTheme();

    const spawnSparkle = useCallback((e) => {
        // Prevent effect on interactive elements to keep UI clean
        if (e.target.closest('a, button, input, textarea, select, [role="button"], .clickable')) return;

        // Check if cursor is pointer (clickable)
        const computedStyle = window.getComputedStyle(e.target);
        if (computedStyle.cursor === 'pointer' || e.target.closest('a, button, input, textarea, select, [role="button"], .clickable, nav, .navbar')) return;

        const x = e.clientX;
        const y = e.clientY;

        // Pure white magic
        const baseColor = '#fff';
        const accentColor = '#fff';

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            
            // Random attributes for organic feel
            const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.5 - 0.25);
            const velocity = 20 + Math.random() * 40; // explosive spread
            const particleSize = size + Math.random() * 4;
            // const useAccent = Math.random() > 0.7; // Removed accent color logic
            const finalColor = '#ffffff';

            // Initial Styles
            Object.assign(particle.style, {
                position: 'fixed',
                left: `${x}px`,
                top: `${y}px`,
                width: `${particleSize}px`,
                height: `${particleSize}px`,
                backgroundColor: finalColor,
                borderRadius: '50%', // Circle particles
                pointerEvents: 'none',
                zIndex: '9999',
                boxShadow: `0 0 ${particleSize * 2}px ${finalColor}`, // Glow effect
                transform: 'translate(-50%, -50%) scale(0)', // Start invisible
            });

            document.body.appendChild(particle);

            // Animate using GSAP timeline for precise control
            const tl = gsap.timeline({
                onComplete: () => particle.remove()
            });

            tl.to(particle, {
                scale: 1,
                duration: 0.1,
                ease: "power2.out"
            }).to(particle, {
                x: Math.cos(angle) * velocity,
                y: Math.sin(angle) * velocity,
                opacity: 0,
                scale: 0,
                duration: 0.6 + Math.random() * 0.3,
                ease: "power3.out"
            });
        }
    }, [theme, count, size]);

    useEffect(() => {
        window.addEventListener('click', spawnSparkle);
        return () => window.removeEventListener('click', spawnSparkle);
    }, [spawnSparkle]);

    return null;
};

export default ClickSparkle;
