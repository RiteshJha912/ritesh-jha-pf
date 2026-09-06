import React from 'react';
import SEO from '../../common/SEO';
import styles from './Blogs.module.css';
import blog1Img from '../../assets/blog1.png';

const blogsData = [
  {
    id: 1,
    title: "I finally understood how ChatGPT works",
    excerpt: "an attempt to understand how GPTs work in general",
    date: "Aug 12, 2023",
    image: blog1Img,
    url: "https://ritzardous.medium.com/i-finally-understood-how-chatgpt-works-c8a9c97b8d3e?sharedUserId=ritzardous",
    platform: "Medium"
  }
];

const Blogs = () => {
  return (
    <div className={styles.container}>
      <SEO 
        title="Blogs | Ritesh Jha | Technical Articles"
        description="Technical blogs and insights by Ritesh Jha (Ritzardous) on Full Stack Development, Cybersecurity, and Web3."
        canonical="https://ritesh-jha.vercel.app/blogs"
      />
      
      <h1 className={styles.title}>Blogs</h1>
      <p className={styles.subtitle}>
        i write things to understand them better 
      </p>

      <div className={styles.grid}>
        {blogsData.map((blog) => (
          <div 
            key={blog.id} 
            onClick={() => window.open(blog.url, '_blank')}
            className={styles.card}
          >
            <div className={styles.imageWrapper}>
              <img src={blog.image} alt={blog.title} className={styles.image} />
            </div>
            
            <div className={styles.content}>
              <span className={styles.date}>{blog.date}</span>
              <h2 className={styles.blogTitle}>{blog.title}</h2>
              <p className={styles.excerpt}>{blog.excerpt}</p>
              
              <div className={styles.footer}>
                <span className={styles.readMore}>
                  Read Article 
                  <span className={styles.arrow}>→</span>
                </span>
                <span className={styles.platform}>{blog.platform}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
