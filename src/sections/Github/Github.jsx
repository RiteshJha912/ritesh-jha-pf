import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import styles from './Github.module.css';
import { useTheme } from '../../common/themeContext';

function Github() {
  const { theme } = useTheme();

  const explicitTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  // Elegant monochrome theme - Inverted as requested (Higher activity = Lighter in Light Mode / Darker in Dark Mode)
  // Or rather, swapping the intensity direction so "less" (low intensity) is the stronger color, and "more" fades out?
  // Let's interpret "Invert" as swapping the progression of the active cells.
  
  const elegantTheme = {
    // Light Mode: Bg(Light), Levels: Light -> Black
    light: ['#ebedf0', '#b8b8b8', '#8a8a8a', '#5e5e5e', '#000000'],
    // Dark Mode: Bg(Dark), Levels: Dark -> White
    dark: ['#161b22', '#4a4a4a', '#7a7a7a', '#a9a9a9', '#ffffff'],
  };
  
  return (
    <section className={styles.container}>
      <h1 className={`sectionTitle ${styles.header}`}>Days I Code</h1>
      
      <div className={styles.calendarWrapper}>
        <GitHubCalendar 
          username="RiteshJha912"
          blockSize={10}
          blockRadius={2}
          blockMargin={3}
          fontSize={12}
          theme={elegantTheme}
          colorScheme={theme}
        />
      </div>
    </section>
  );
}

export default Github;
