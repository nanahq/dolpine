const homepage = "https://trynanaapp.com";

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${homepage}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/terms</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${homepage}/privacy</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
       <url>
        <loc>${homepage}/vendors</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    </urlset>
  `;
}

export async function getServerSideProps(props: any) {
  const sitemap = generateSiteMap();

  props.res.setHeader("Content-Type", "text/xml");
  props.res.write(sitemap);
  props.res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
