<script setup>
defineProps({
  dish: { type: Object, required: true },
  selected: { type: Boolean, default: false },
  mode: { type: String, default: 'multi' },
  featured: { type: Boolean, default: false },
})

defineEmits(['toggle'])
</script>

<template>
  <button
    type="button"
    class="dish"
    :class="{ selected, featured, single: mode === 'single' }"
    :aria-pressed="selected"
    @click="$emit('toggle', dish)"
    @contextmenu.prevent
  >
    <span class="plate-wrap">
      <span class="plate">
        <img
          :src="dish.image"
          :alt="dish.name"
          loading="lazy"
          draggable="false"
          @dragstart.prevent
        />
      </span>
      <span v-if="selected" class="seal" aria-hidden="true">
        {{ mode === 'single' ? '此锅' : '点' }}
      </span>
    </span>
    <span class="meta">
      <span class="name">{{ dish.name }}</span>
      <span class="tick" aria-hidden="true" />
    </span>
  </button>
</template>

<style scoped>
.dish {
  appearance: none;
  border: none;
  background: transparent;
  padding: 0.15rem 0.15rem 0;
  cursor: pointer;
  text-align: left;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: visible;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  animation: dish-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.plate-wrap {
  position: relative;
  display: block;
  overflow: visible;
}

.plate {
  position: relative;
  display: block;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 30%, #fff 0%, var(--porcelain-deep) 55%, var(--mist, #d5dae2) 100%);
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--rim) 55%, transparent),
    inset 0 0 0 6px color-mix(in srgb, white 70%, transparent),
    0 8px 18px color-mix(in srgb, var(--indigo) 12%, transparent);
}

.featured .plate {
  border-radius: 42% 42% 38% 38%;
  aspect-ratio: 4 / 3;
}

.plate img {
  position: absolute;
  inset: 10%;
  width: 80%;
  height: 80%;
  object-fit: cover;
  border-radius: inherit;
  display: block;
  transition: transform 0.4s ease;
  pointer-events: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

.featured .plate img {
  inset: 8%;
  width: 84%;
  height: 84%;
}

.dish:hover .plate img,
.dish:focus-visible .plate img {
  transform: scale(1.05);
}

.dish.selected .plate {
  box-shadow:
    inset 0 0 0 2px var(--chili),
    inset 0 0 0 7px color-mix(in srgb, white 65%, transparent),
    0 10px 22px color-mix(in srgb, var(--chili) 18%, transparent);
}

/* 印章放在圆盘外层，避免被 overflow:hidden 的圆形裁切 */
.seal {
  position: absolute;
  right: -0.15rem;
  bottom: -0.1rem;
  z-index: 2;
  width: 1.75rem;
  height: 1.75rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-family: var(--font-display);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  color: #fff7f2;
  background: color-mix(in srgb, var(--chili) 92%, #4a180e);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--chili) 35%, transparent);
  animation: stamp 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
  pointer-events: none;
}

.featured .seal {
  width: auto;
  height: auto;
  padding: 0.22rem 0.45rem;
  border-radius: 999px;
  font-size: 0.64rem;
  right: -0.1rem;
  bottom: -0.05rem;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35rem;
  padding: 0 0.2rem;
}

.name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  color: var(--ink);
}

.tick {
  flex: 1;
  height: 1px;
  margin-left: 0.4rem;
  background: linear-gradient(90deg, var(--line), transparent);
  transform-origin: left center;
  transition: background 0.2s ease, transform 0.2s ease;
}

.dish.selected .tick {
  background: linear-gradient(90deg, var(--chili), transparent);
  transform: scaleX(1.02);
}

.dish.selected .name {
  color: var(--indigo);
}

.dish:focus-visible {
  outline: 2px solid var(--chili);
  outline-offset: 4px;
  border-radius: 4px;
}

@keyframes dish-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes stamp {
  from {
    opacity: 0;
    transform: scale(0.6) rotate(-12deg);
  }

  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dish,
  .seal {
    animation: none;
  }

  .plate img,
  .tick {
    transition: none;
  }
}
</style>
