<script setup>
defineProps({
  imageUrl: { type: String, required: true },
})

defineEmits(['close', 'reset'])
</script>

<template>
  <div class="overlay" role="dialog" aria-modal="true" aria-label="纪念卡预览">
    <div class="sheet">
      <header class="head">
        <p class="kicker">Memorial</p>
        <h2>今晚的纪念卡</h2>
        <p class="tip">长按下方图片，保存到相册</p>
      </header>

      <div class="stage">
        <img :src="imageUrl" alt="火锅点单纪念卡" class="shot" />
      </div>

      <div class="actions">
        <button type="button" class="ghost" @click="$emit('close')">继续改单</button>
        <button type="button" class="solid" @click="$emit('reset')">重新点单</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: color-mix(in srgb, #121820 78%, transparent);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem 0.75rem calc(0.75rem + env(safe-area-inset-bottom));
  animation: fade-in 0.28s ease;
}

.sheet {
  width: min(100%, 26rem);
  max-height: min(92vh, 52rem);
  overflow: auto;
  background: var(--panel);
  border-radius: 6px 6px 2px 2px;
  border: 1px solid var(--line);
  padding: 1.05rem 0.9rem 1.05rem;
  box-shadow: 0 -16px 48px color-mix(in srgb, black 32%, transparent);
  animation: sheet-up 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.head {
  text-align: center;
  margin-bottom: 0.8rem;
}

.kicker {
  margin: 0;
  font-family: var(--font-ui);
  font-size: 0.62rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--chili);
}

.head h2 {
  margin: 0.3rem 0 0;
  font-family: var(--font-display);
  font-size: 1.25rem;
  letter-spacing: 0.16em;
  color: var(--indigo);
}

.tip {
  margin: 0.35rem 0 0;
  font-size: 0.78rem;
  color: var(--muted);
}

.stage {
  display: flex;
  justify-content: center;
  padding: 0.85rem;
  border-radius: var(--radius-sm);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--indigo) 6%, transparent), transparent),
    repeating-linear-gradient(
      -18deg,
      transparent,
      transparent 10px,
      color-mix(in srgb, var(--rim) 18%, transparent) 10px,
      color-mix(in srgb, var(--rim) 18%, transparent) 11px
    );
}

.shot {
  width: 100%;
  max-width: 360px;
  height: auto;
  display: block;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-soft);
  -webkit-touch-callout: default;
  pointer-events: auto;
  user-select: none;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.55rem;
  margin-top: 1rem;
}

.actions button {
  appearance: none;
  border-radius: var(--radius-sm);
  padding: 0.8rem 0.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  cursor: pointer;
  font-family: var(--font-sans);
}

.ghost {
  border: 1px solid color-mix(in srgb, var(--indigo) 22%, transparent);
  background: transparent;
  color: var(--ink);
}

.solid {
  border: none;
  background: var(--indigo);
  color: #f5f6f8;
}

.actions button:focus-visible {
  outline: 2px solid var(--chili);
  outline-offset: 2px;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes sheet-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .overlay,
  .sheet {
    animation: none;
  }
}
</style>
