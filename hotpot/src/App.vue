<script setup>
import { computed, nextTick, ref } from 'vue'
import { toPng } from 'html-to-image'
import AppHeader from './components/AppHeader.vue'
import CategoryTabs from './components/CategoryTabs.vue'
import DishGrid from './components/DishGrid.vue'
import BottomBar from './components/BottomBar.vue'
import MemorialCard from './components/MemorialCard.vue'
import CardPreview from './components/CardPreview.vue'
import { BRAND } from './config.js'
import { useOrder } from './composables/useOrder.js'

const {
  activeTab,
  previewOpen,
  previewUrl,
  generating,
  broth,
  selectedDishes,
  canGenerate,
  summaryText,
  isSelected,
  toggleDish,
  resetOrder,
  closePreview,
} = useOrder()

const cardRef = ref(null)

const meats = computed(() => selectedDishes.value.filter((d) => d.category === '荤'))
const vegs = computed(() => selectedDishes.value.filter((d) => d.category === '素'))

const brandChars = computed(() => [...BRAND])

async function generateCard() {
  if (!canGenerate.value || generating.value) return
  generating.value = true
  try {
    await nextTick()
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
    const node = cardRef.value
    if (!node) throw new Error('纪念卡节点未就绪')

    const options = {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#f5f6f8',
      // CDN 字体跨域会触发 cssRules SecurityError，导出改用系统/已加载回退字体
      skipFonts: true,
    }
    let dataUrl = await toPng(node, options)
    if (!dataUrl || dataUrl.length < 100) {
      dataUrl = await toPng(node, options)
    }
    previewUrl.value = dataUrl
    previewOpen.value = true
  } catch (err) {
    console.error(err)
    alert('生成失败，请再试一次')
  } finally {
    generating.value = false
  }
}
</script>

<template>
  <div class="app-shell">
    <aside class="spine" aria-hidden="true">
      <span v-for="(ch, i) in brandChars" :key="`${ch}-${i}`" class="spine-ch">{{ ch }}</span>
      <span class="spine-mark" />
    </aside>

    <main class="main">
      <AppHeader />
      <CategoryTabs v-model="activeTab" />
      <DishGrid
        :category="activeTab"
        :is-selected="isSelected"
        @toggle="toggleDish"
      />
    </main>

    <BottomBar
      :summary="summaryText"
      :can-generate="canGenerate"
      :generating="generating"
      @generate="generateCard"
    />

    <div class="capture-host" aria-hidden="true">
      <div ref="cardRef">
        <MemorialCard :broth="broth" :meats="meats" :vegs="vegs" />
      </div>
    </div>

    <CardPreview
      v-if="previewOpen && previewUrl"
      :image-url="previewUrl"
      @close="closePreview"
      @reset="resetOrder"
    />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100dvh;
  position: relative;
}

.spine {
  display: none;
}

.main {
  max-width: 34rem;
  margin: 0 auto;
  position: relative;
}

.main::before {
  content: '';
  position: absolute;
  left: 0;
  top: 1.4rem;
  bottom: 8rem;
  width: 3px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--indigo), color-mix(in srgb, var(--chili) 55%, var(--rim)), transparent);
  opacity: 0.55;
  pointer-events: none;
}

.capture-host {
  position: fixed;
  left: 0;
  top: 0;
  opacity: 0;
  pointer-events: none;
  z-index: -1;
}

@media (min-width: 900px) {
  .spine {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
    position: fixed;
    left: max(1.1rem, calc(50% - 23rem));
    top: 50%;
    transform: translate(-130%, -50%);
    font-family: var(--font-display);
    font-size: 0.95rem;
    letter-spacing: 0.12em;
    color: var(--indigo);
  }

  .spine-ch {
    display: block;
    line-height: 1.35;
  }

  .spine-mark {
    margin-top: 0.55rem;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    border: 1.5px solid var(--chili);
  }

  .main::before {
    display: none;
  }
}
</style>
