<script setup>
import { computed } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  broth: { type: Object, default: null },
  meats: { type: Array, default: () => [] },
  vegs: { type: Array, default: () => [] },
})

const emit = defineEmits(['close', 'remove', 'clear'])

const isEmpty = computed(
  () => !props.broth && props.meats.length === 0 && props.vegs.length === 0,
)

const totalCount = computed(() => {
  let n = props.meats.length + props.vegs.length
  if (props.broth) n += 1
  return n
})

function onBackdrop(e) {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="sheet-root"
      role="dialog"
      aria-modal="true"
      aria-label="本顿菜单"
      @click="onBackdrop"
    >
      <div class="sheet" @click.stop>
        <div class="handle" aria-hidden="true" />
        <header class="head">
          <div>
            <p class="kicker">本顿菜单</p>
            <h2>已选 {{ totalCount }} 样</h2>
          </div>
          <div class="head-actions">
            <button
              type="button"
              class="clear"
              :disabled="isEmpty"
              @click="emit('clear')"
            >
              清空菜单
            </button>
            <button type="button" class="close" aria-label="收起" @click="emit('close')">
              收起
            </button>
          </div>
        </header>

        <div class="body">
          <p v-if="isEmpty" class="empty">还没有点菜，回菜单里挑几样吧</p>

          <section v-if="broth" class="group">
            <h3>汤底</h3>
            <ul>
              <li>
                <span class="thumb"><img :src="broth.image" :alt="broth.name" draggable="false" /></span>
                <span class="name">{{ broth.name }}</span>
                <button type="button" class="del" @click="emit('remove', broth)">删除</button>
              </li>
            </ul>
          </section>

          <section v-if="meats.length" class="group">
            <h3>荤菜 · {{ meats.length }}</h3>
            <ul>
              <li v-for="item in meats" :key="item.id">
                <span class="thumb"><img :src="item.image" :alt="item.name" draggable="false" /></span>
                <span class="name">{{ item.name }}</span>
                <button type="button" class="del" @click="emit('remove', item)">删除</button>
              </li>
            </ul>
          </section>

          <section v-if="vegs.length" class="group">
            <h3>素菜 · {{ vegs.length }}</h3>
            <ul>
              <li v-for="item in vegs" :key="item.id">
                <span class="thumb"><img :src="item.image" :alt="item.name" draggable="false" /></span>
                <span class="name">{{ item.name }}</span>
                <button type="button" class="del" @click="emit('remove', item)">删除</button>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.sheet-root {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: color-mix(in srgb, #121820 55%, transparent);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: fade 0.22s ease;
  -webkit-tap-highlight-color: transparent;
}

.sheet {
  width: min(100%, 34rem);
  max-height: min(78vh, 40rem);
  display: flex;
  flex-direction: column;
  background: var(--panel);
  border-radius: 14px 14px 0 0;
  border: 1px solid var(--line);
  border-bottom: none;
  box-shadow: 0 -18px 48px color-mix(in srgb, black 22%, transparent);
  animation: up 0.32s cubic-bezier(0.22, 1, 0.36, 1);
  padding-bottom: env(safe-area-inset-bottom);
}

.handle {
  width: 2.4rem;
  height: 4px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--steam) 55%, transparent);
  margin: 0.55rem auto 0.25rem;
}

.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.55rem 1rem 0.75rem;
  border-bottom: 1px solid var(--line);
}

.kicker {
  margin: 0;
  font-family: var(--font-ui);
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--chili);
}

.head h2 {
  margin: 0.2rem 0 0;
  font-family: var(--font-display);
  font-size: 1.2rem;
  letter-spacing: 0.1em;
  color: var(--indigo);
}

.head-actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}

.clear,
.close,
.del {
  appearance: none;
  cursor: pointer;
  font-family: var(--font-sans);
  -webkit-tap-highlight-color: transparent;
}

.clear {
  border: 1px solid color-mix(in srgb, var(--chili) 40%, transparent);
  background: color-mix(in srgb, var(--chili) 8%, white);
  color: var(--chili);
  border-radius: var(--radius-sm);
  padding: 0.45rem 0.65rem;
  font-size: 0.74rem;
  letter-spacing: 0.08em;
}

.clear:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.close {
  border: 1px solid var(--line);
  background: transparent;
  color: var(--muted);
  border-radius: var(--radius-sm);
  padding: 0.45rem 0.65rem;
  font-size: 0.74rem;
  letter-spacing: 0.08em;
}

.body {
  overflow: auto;
  padding: 0.75rem 1rem 1.1rem;
  -webkit-overflow-scrolling: touch;
}

.empty {
  margin: 1.5rem 0;
  text-align: center;
  color: var(--steam);
  font-size: 0.88rem;
  letter-spacing: 0.06em;
}

.group {
  margin-bottom: 1rem;
}

.group:last-child {
  margin-bottom: 0;
}

.group h3 {
  margin: 0 0 0.5rem;
  font-family: var(--font-display);
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  color: var(--chili);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

li {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.4rem 0.45rem;
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--porcelain) 80%, white);
  border: 1px solid color-mix(in srgb, var(--line) 80%, transparent);
}

.thumb {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--porcelain-deep);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--rim) 40%, transparent);
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
  -webkit-touch-callout: none;
}

.name {
  flex: 1;
  min-width: 0;
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  color: var(--ink);
}

.del {
  flex-shrink: 0;
  border: none;
  background: transparent;
  color: var(--muted);
  font-size: 0.74rem;
  letter-spacing: 0.1em;
  padding: 0.4rem 0.45rem;
}

.del:active {
  color: var(--chili);
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes up {
  from {
    transform: translateY(24px);
    opacity: 0.85;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sheet-root,
  .sheet {
    animation: none;
  }
}
</style>
