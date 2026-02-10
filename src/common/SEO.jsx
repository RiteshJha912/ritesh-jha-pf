
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { defaultSEO, personSchema, websiteSchema, organizationSchema } from './structuredData';

const SEO = ({ 
  title, 
  description, 
  canonical = defaultSEO.canonical,
  type = 'website',
  openGraph,
  twitter,
  jsonLd,
}) => {
  // Use RJinitials or a default hero cover if one exists in public.
  // Using generic placeholders for now which will point to root assets.
  const metaDescription = description || defaultSEO.description;
  const metaTitle = title || defaultSEO.title;
  const metaImage = openGraph?.images?.[0]?.url || defaultSEO.openGraph.images[0].url;
  const metaUrl = canonical || defaultSEO.canonical;
  const metaType = type || defaultSEO.openGraph.type;

  // Combining JSON-LD schemas
  const structuredData = jsonLd ? [...jsonLd] : [personSchema, websiteSchema];

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={metaUrl} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={metaType} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={defaultSEO.openGraph.site_name} />
      <meta property="og:locale" content={defaultSEO.openGraph.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content={defaultSEO.twitter.cardType} />
      <meta name="twitter:creator" content={defaultSEO.twitter.handle} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
