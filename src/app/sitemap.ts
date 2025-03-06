import {MetadataRoute} from "next";


const SITE_MAIN_URL = 'https://trynanaapp.com'
const pages = ['', '/about', '/privacy', '/terms', '/marketplace']
export default async function SiteMap (): Promise<MetadataRoute.Sitemap> {
    return pages.map(route => ({
        url: `${SITE_MAIN_URL}${route}`.trim(),
        lastModified: (new Date).toISOString(),
        changeFrequency: 'daily'
    }))
}
