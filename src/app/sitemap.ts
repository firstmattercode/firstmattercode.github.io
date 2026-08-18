import { type MetadataRoute } from 'next'

// Required by `output: 'export'` for metadata routes — emits a static
// /sitemap.xml file at build time instead of treating it as dynamic.
export const dynamic = 'force-static'

const SITE = 'https://firstmattercode.com'

// Every page on the site. It's a small hand-maintained list — add a row
// when a new route ships.
const routes = ['/']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.map((path) => ({
    url: `${SITE}${path}`,
    lastModified,
  }))
}
