<script setup>
defineProps({
  summary: { type: String, required: true },
  canGenerate: { type: Boolean, default: false },
  generating: { type: Boolean, default: false },
})

defineEmits(['generate'])
</script>

<template>
  <footer class="bar">
    <div class="inner">
      <div class="summary">
        <span class="kicker">本顿菜单</span>
        <p>{{ summary }}</p>
      </div>
      <button
        type="button"
        class="cta"
        :disabled="!canGenerate || generating"
        @click="$emit('generate')"
      >
        <span>{{ generating ? '生成中' : '生成纪念卡' }}</span>
      </button>
    </div>
    <p v-if="!canGenerate" class="hint">请先选底料，并至少点一样荤或素</p>
  </footer>
</template>

<style scoped>
.bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  padding: 0.7rem 1rem calc(0.85rem + env(safe-area-inset-bottom));
  background:
    linear-gradient(180deg, transparent, color-mix(in srgb, var(--porcelain) 88%, #fff) 24%),
    color-mix(in srgb, var(--panel) 88%, transparent);
  border-top: 1px solid var(--line);
  backdrop-filter: blur(14px);
}

.inner {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  max-width: 34rem;
  margin: 0 auto;
}

.summary {
  flex: 1;
  min-width: 0;
}

.kicker {
  display: block;
  font-family: var(--font-ui);
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--chili);
  margin-bottom: 0.18rem;
}

.summary p {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.98rem;
  letter-spacing: 0.06em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--ink);
}

.cta {
  flex-shrink: 0;
  appearance: none;
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.82rem 1.05rem;
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: #f7f4f0;
  background: linear-gradient(145deg, var(--chili) 0%, #9e3f28 100%);
  cursor: pointer;
  box-shadow: 0 8px 18px color-mix(in srgb, var(--chili) 28%, transparent);
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.cta:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px color-mix(in srgb, var(--chili) 34%, transparent);
}

.cta:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
}

.cta:focus-visible {
  outline: 2px solid var(--indigo);
  outline-offset: 2px;
}

.hint {
  max-width: 34rem;
  margin: 0.45rem auto 0;
  font-size: 0.68rem;
  color: var(--steam);
  letter-spacing: 0.04em;
}

@media (prefers-reduced-motion: reduce) {
  .cta {
    transition: none;
  }
}
</style>
