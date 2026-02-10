import React from 'react';
import { useTheme } from '../../common/themeContext';

const Blogs = () => {
  const { theme } = useTheme();
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      height: '100%',
      flexDirection: 'column',
      gap: 'clamp(15px, 3vw, 20px)',
      color: theme === 'light' ? '#222' : '#fff',
      background: theme === 'light' ? '#fff' : '#222',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ 
        fontSize: 'clamp(2rem, 5vw, 3rem)', 
        margin: 0, 
        fontFamily: 'Bona Nova SC, serif',
        maxWidth: '90vw',
        wordWrap: 'break-word'
      }}>
        Blogs
      </h1>
      <p style={{ 
        fontSize: 'clamp(1rem, 3vw, 1.5rem)', 
        opacity: 0.7, 
        fontFamily: 'Roboto Mono, monospace',
        margin: 0,
        maxWidth: '90vw',
        wordWrap: 'break-word',
        lineHeight: 1.6
      }}>
        Coming Soon! (As soon as I get my lazy ass to start writing)
      </p>
    </div>
  );
};

export default Blogs;
