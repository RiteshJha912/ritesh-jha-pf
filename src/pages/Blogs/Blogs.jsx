import React from 'react';
import { useTheme } from '../../common/themeContext';

const Blogs = () => {
  const { theme } = useTheme();
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      flexDirection: 'column',
      gap: '20px',
      color: theme === 'light' ? '#222' : '#fff',
      background: theme === 'light' ? '#fff' : '#222'
    }}>
      <h1 style={{ fontSize: '3rem', margin: 0, fontFamily: 'Bona Nova SC, serif' }}>Blogs</h1>
      <p style={{ 
        fontSize: '1.5rem', 
        opacity: 0.7, 
        fontFamily: 'Roboto Mono, monospace',
        margin: 0
      }}>
        Coming Soon!
      </p>
    </div>
  );
};

export default Blogs;
