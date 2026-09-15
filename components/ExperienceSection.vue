<script setup lang="ts">
import data from "~/data/portfolio.json";
const ids = ["imani", "imani-trainee", "soca", "metrodata"];
</script>
<template>
  <section class="shell section page-section">
    <header class="page-heading">
      <p class="eyebrow">THE JOURNEY SO FAR</p>
      <h1>
        Experience that<br /><span class="muted-heading"
          >builds perspective.</span
        >
      </h1>
      <p>
        Web development, hands-on learning, and the teams that shaped my
        approach.
      </p>
    </header>
    <div class="timeline">
      <article
        v-for="(item, index) in data.experience.items"
        :id="ids[index]"
        :key="item.role"
        class="timeline-item"
      >
        <div class="timeline-date">
          <span>{{ item.period }}</span
          ><span class="text-muted">{{ item.location }}</span>
        </div>
        <div>
          <p class="eyebrow">{{ item.company }}</p>
          <h2>{{ item.role }}</h2>
          <ul class="detail-list">
            <li v-for="detail in item.details" :key="detail">{{ detail }}</li>
          </ul>
        </div>
      </article>
    </div>
    <div class="inline-note">
      <UIcon name="i-lucide-github" />
      <p>
        Interested in how I approach code?
        <a
          href="https://github.com/mfajar2123"
          target="_blank"
          rel="noopener noreferrer"
          >Explore my GitHub ↗</a
        >
      </p>
    </div>
  </section>
</template>
