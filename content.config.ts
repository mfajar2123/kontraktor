import { defineContentConfig, defineCollection, z } from '@nuxt/content'
const editorial = z.object({ image: z.string(), imageAlt: z.string(), category: z.string(), order: z.number().default(0) })
export default defineContentConfig({
  collections: {
    pages: defineCollection({ type: 'page', source: 'pages/*.md' }),
    karir: defineCollection({ type: 'page', source: 'karir/*.md', schema: z.object({ description: z.string(), location: z.string(), employmentType: z.string(), order: z.number().default(0), active: z.boolean().default(true) }) }),
    layanan: defineCollection({ type: 'page', source: 'layanan/*.md', schema: editorial.extend({ icon: z.string() }) }),
    proyek: defineCollection({ type: 'page', source: 'proyek/*.md', schema: editorial.extend({ location: z.string(), year: z.string(), scope: z.string() }) }),
    artikel: defineCollection({ type: 'page', source: 'artikel/*.md', schema: editorial.extend({ date: z.string(), readingTime: z.string() }) }),
    perusahaan: defineCollection({ type: 'data', source: 'perusahaan.json', schema: z.object({ name: z.string(), tagline: z.string(), intro: z.string(), location: z.string(), hours: z.string(), contact: z.object({ email: z.string(), phone: z.string(), address: z.string(), mapQuery: z.string(), admins: z.array(z.object({ name: z.string(), role: z.string(), phone: z.string() })) }), steps: z.array(z.object({ title: z.string(), description: z.string() })), faq: z.array(z.object({ label: z.string(), content: z.string() })) }) })
  }
})
