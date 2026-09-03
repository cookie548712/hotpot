<script setup>
import { CATEGORIES } from '../data/menu.js'

defineProps({
  modelValue: { type: String, required: true },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <nav class="tabs" aria-label="菜单分类">
    <div class="rail">
      <button
        v-for="cat in CATEGORIES"
        :key="cat.id"
        type="button"
        class="tab"
        :class="{ active: modelValue === cat.id }"
        :aria-current="modelValue === cat.id ? 'page' : undefined"
        @click="$emit('update:modelValue', cat.id)"
      >
        <span class="label">{{ cat.label }}</span>
        <span class="hint">{{ cat.hint }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.tabs {
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 0.55rem 1rem 0.85rem;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--porcelain) 94%, white) 55%,
    transparent
  );
  backdrop-filter: blur(12px);
}

.rail {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  padding: 0.28rem;
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--indigo) 5%, white);
  border: 1px solid var(--line);
}

.tab {
  appearance: none;
  border: none;
  background: transparent;
  border-radius: var(--radius-sm);
  padding: 0.58rem 0.25rem 0.52rem;
  cursor: pointer;
  text-align: center;
  color: var(--steam);
  position: relative;
  transition: color 0.2s ease, background 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  user-select: none;
}

.tab.active {
  color: var(--porcelain);
  background: var(--indigo);
  box-shadow: 0 6px 16px color-mix(in srgb, var(--indigo) 28%, transparent);
}

.label {
  display: block;
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.16em;
}

.hint {
  display: block;
  margin-top: 0.18rem;
  font-size: 0.62rem;
  letter-spacing: 0.02em;
  opacity: 0.78;
}

.tab:focus-visible {
  outline: 2px solid var(--chili);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .tab {
    transition: none;
  }
}
</style>
