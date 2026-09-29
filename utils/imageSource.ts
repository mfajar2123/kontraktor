// A path alias keeps generated image filenames portable (including Windows).
export function imageSource(src: string) {
  if (src.startsWith('https://images.unsplash.com/')) return '/unsplash/' + new URL(src).pathname.slice(1)
  return src
}
