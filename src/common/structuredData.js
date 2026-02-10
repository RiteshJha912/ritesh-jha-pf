
// Basic SEO Details
export const defaultSEO = {
  title: "Ritesh Jha | Learner",
  description: "Ritesh Jha (Ritzardous) is a Full Stack Developer, Software Engineer, and Cybersecurity Enthusiast from Mumbai, India. Skilled in React, Next.js, and Security Assessment. Explore my portfolio and projects.",
  canonical: "https://ritesh-jha.vercel.app/", // Assuming vercel deployment from previous logs
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://ritesh-jha.vercel.app/',
    site_name: 'Ritesh Jha Portfolio',
    images: [
      {
        url: 'https://ritesh-jha.vercel.app/RJinitials.png',
        width: 1200,
        height: 630,
        alt: 'Ritesh Jha Portfolio',
      },
    ],
  },
  twitter: {
    handle: '@Ritzardous', // Placeholder if not provided, using brand name
    site: '@site',
    cardType: 'summary_large_image',
  },
};

// Structured Data (JSON-LD)

// 1. Person Schema (The main entity)
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ritesh Jha",
  "alternateName": ["Ritzardous", "Hazardous"],
  "url": "https://ritesh-jha.vercel.app/",
  "image": "https://ritesh-jha.vercel.app/RJinitials.png",
  "sameAs": [
    "https://github.com/RiteshJha912",
    "https://www.linkedin.com/in/ritesh-j/"
  ],
  "jobTitle": "Full Stack Developer",
  "worksFor": [
    {
      "@type": "Organization",
      "name": "Smowcode"
    },
    {
      "@type": "Organization",
      "name": "Noxalgo LLP"
    },
    {
      "@type": "Organization",
      "name": "DeepCytes Cyber Labs"
    }
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "K. J. Somaiya College of Engineering", 
    "sameAs": "https://kjsieit.somaiya.edu/en"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "addressCountry": "India"
  },
  "description": "Full Stack Developer, Software Engineer, and Cybersecurity Enthusiast specializing in blockchain development and building scalable web applications."
};

// 2. WebSite Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ritesh Jha Portfolio",
  "url": "https://ritesh-jha.vercel.app/",
  "author": {
    "@type": "Person",
    "name": "Ritesh Jha"
  },
  "description": "Portfolio of Ritesh Jha - Full Stack Developer ",
  "keywords": "Ritesh Jha, Ritzardous, Hazardous, Full Stack Developer, Software Developer, Software Engineer, React Developer, Next.js Developer, Cybersecurity, Blockchain, Portfolio, Mumbai, India"
};

// 3. Organization (for specific work history reference if needed)
export const organizationSchema = (name, url) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": name,
  "url": url
});
