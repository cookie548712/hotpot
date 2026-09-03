<script setup>
import { BRAND, NICKNAME } from '../config.js'
import { memorialTitle } from '../utils/dateTitle.js'

const title = memorialTitle()
</script>

<template>
  <header class="top">
    <p class="eyebrow">
      <span class="for">致 {{ NICKNAME }}</span>
      <span class="sep" aria-hidden="true">/</span>
      <span class="date">{{ title }}</span>
    </p>
    <h1 class="brand">{{ BRAND }}</h1>
    <p class="lead">先定汤底，再点荤素。生成一张只属于今晚的菜单纪念卡。</p>
    <div class="menu-rule" aria-hidden="true">
      <span class="knot" />
    </div>
  </header>
</template>

<style scoped>
.top {
  padding: 1.5rem 1.15rem 0.4rem 1.35rem;
  animation: rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.eyebrow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.for {
  color: var(--chili);
  font-weight: 500;
}

.sep {
  opacity: 0.45;
}

.brand {
  margin: 0.55rem 0 0.45rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.35rem, 11vw, 3rem);
  line-height: 1.05;
  letter-spacing: 0.18em;
  color: var(--indigo);
}

.lead {
  margin: 0;
  max-width: 20em;
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--muted);
}

.menu-rule {
  margin-top: 1.1rem;
  height: 1px;
  background: linear-gradient(
    90deg,
    var(--indigo),
    color-mix(in srgb, var(--rim) 70%, transparent) 42%,
    transparent
  );
  position: relative;
}

.knot {
  position: absolute;
  left: 0;
  top: 50%;
  width: 7px;
  height: 7px;
  border: 1.5px solid var(--chili);
  border-radius: 50%;
  transform: translate(-30%, -50%);
  background: var(--porcelain);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .top {
    animation: none;
  }
}
</style>
