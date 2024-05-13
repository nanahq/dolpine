import {MetadataRoute} from "next";
import {getAllVendors} from "@/lib/marketplace";


const SITE_MAIN_URL = 'https://trynanaapp.com'
const pages = ['', '/about', '/privacy', '/terms', '/marketplace']
export default async function SiteMap (): Promise<MetadataRoute.Sitemap> {
    const vendors = await getAllVendors()
    const marketPlaceRoutes: any = vendors.map(vendor => ({
        url: `${SITE_MAIN_URL}/marketplace/${vendor.businessName.split(' ').join('-').toLowerCase()}`,
        lastModified: (new Date).toISOString(),
        changeFrequency: 'daily'
    }))
    const mainRoutes = pages.map(route => ({
        url: `${SITE_MAIN_URL}${route}`,
        lastModified: (new Date).toISOString(),
        changeFrequency: 'daily'
    }))

    return [...mainRoutes, ...marketPlaceRoutes]
}
