export default defineNuxtPlugin(() => {
  const hash = window.location.hash

  if (hash.startsWith('#invite_token=')) {
    window.location.replace(`/admin/${hash}`)
  }
})