export function usePageSeo(title: string | (() => string), description: string | (() => string), image?: string | (() => string)) {
  useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogImage: image })
}
