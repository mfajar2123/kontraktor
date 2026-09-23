export const useCompany = () => useAsyncData('perusahaan', async () => {
  const company = await queryCollection('perusahaan').first()
  if (company) return company
  const { default: fallback } = await import('~/content/perusahaan.json')
  return fallback
})
