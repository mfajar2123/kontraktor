<script setup lang="ts">
import data from '~/data/portfolio.json'
const email = data.hero.contacts.find(contact => contact.type === 'Email')!.value
const phone = data.hero.contacts.find(contact => contact.type === 'Mobile')!.value
const intent = ref('project')
const copyStatus = ref('')
const subject = computed(() => intent.value === 'project' ? 'Project inquiry — let’s build together' : 'Hiring opportunity — Muhamad Fajar')
const body = computed(() => intent.value === 'project' ? 'Hi Fajar,\n\nI’d like to discuss a project.\n\nProject overview:\nTimeline:\nBudget range:\n\nBest,' : 'Hi Fajar,\n\nI’d like to discuss an opportunity.\n\nCompany:\nRole:\nWork arrangement:\n\nBest,')
const mailLink = computed(() => `mailto:${email}?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(body.value)}`)
async function copyEmail() {
  try { await navigator.clipboard.writeText(email); copyStatus.value = 'Email copied.' }
  catch { copyStatus.value = 'Could not copy. Select the email address below to copy it manually.' }
}
</script>
<template><section class="shell section page-section"><header class="page-heading"><p class="eyebrow"><span class="status-dot" /> OPEN TO CONVERSATIONS</p><h1>Good things start<br><span class="muted-heading">with a conversation.</span></h1><p>Have a project to build or a role to discuss? Tell me what you have in mind.</p></header>
<div class="contact-grid"><div class="contact-panel"><h2>What brings you here?</h2><fieldset class="intent-options"><legend class="sr-only">Conversation topic</legend><label :class="{ selected: intent === 'project' }"><input v-model="intent" type="radio" value="project" name="intent"> I have a project</label><label :class="{ selected: intent === 'hire' }"><input v-model="intent" type="radio" value="hire" name="intent"> I’m hiring</label></fieldset><p class="text-muted">{{ intent === 'project' ? 'Share your goals, timeline, and budget range so we can start with the right context.' : 'Share the role, team, and work arrangement. You can also view my résumé before reaching out.' }}</p><UButton :to="mailLink" size="xl" label="Write an email" trailing-icon="i-lucide-arrow-up-right" /><p class="contact-hint">Opens your email app with a short brief to fill in.</p><div class="email-copy"><a :href="'mailto:' + email">{{ email }}</a><UButton color="neutral" variant="ghost" icon="i-lucide-copy" aria-label="Copy email address" @click="copyEmail" /></div><p role="status" class="copy-status">{{ copyStatus }}</p></div>
<aside class="contact-alternatives"><p class="eyebrow">OTHER WAYS TO CONNECT</p><a :href="'https://wa.me/' + phone" target="_blank" rel="noopener noreferrer" class="contact-method"><UIcon name="i-lucide-message-circle" /><span><strong>WhatsApp</strong><small>Start a direct conversation</small></span><span>↗</span></a><a href="https://linkedin.com/in/mfajar2123" target="_blank" rel="noopener noreferrer" class="contact-method"><UIcon name="i-lucide-linkedin" /><span><strong>LinkedIn</strong><small>Connect professionally</small></span><span>↗</span></a><NuxtLink to="/resume" class="contact-method"><UIcon name="i-lucide-file-text" /><span><strong>Résumé</strong><small>View or save as PDF</small></span><span>↗</span></NuxtLink><div class="location-note"><UIcon name="i-lucide-map-pin" /><p>Sukabumi, West Java, Indonesia<br><span class="text-muted">Western Indonesia Time · UTC+7</span></p></div></aside></div>
</section></template>
