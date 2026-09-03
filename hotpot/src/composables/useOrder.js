import { computed, ref, watch } from 'vue'
import { STORAGE_KEY } from '../config.js'
import { findDish } from '../data/menu.js'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { brothId: null, dishIds: [] }
    const parsed = JSON.parse(raw)
    return {
      brothId: parsed.brothId ?? null,
      dishIds: Array.isArray(parsed.dishIds) ? parsed.dishIds : [],
    }
  } catch {
    return { brothId: null, dishIds: [] }
  }
}

const initial = loadState()
const brothId = ref(initial.brothId)
const dishIds = ref(initial.dishIds)
const activeTab = ref('底料')
const previewOpen = ref(false)
const previewUrl = ref('')
const generating = ref(false)

watch(
  [brothId, dishIds],
  () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ brothId: brothId.value, dishIds: dishIds.value }),
    )
  },
  { deep: true },
)

export function useOrder() {
  const broth = computed(() => (brothId.value ? findDish(brothId.value) : null))
  const selectedDishes = computed(() =>
    dishIds.value.map((id) => findDish(id)).filter(Boolean),
  )
  const meatCount = computed(
    () => selectedDishes.value.filter((d) => d.category === '荤').length,
  )
  const vegCount = computed(
    () => selectedDishes.value.filter((d) => d.category === '素').length,
  )
  const totalSideCount = computed(() => meatCount.value + vegCount.value)
  const canGenerate = computed(() => Boolean(brothId.value) && totalSideCount.value >= 1)

  const summaryText = computed(() => {
    const parts = []
    if (broth.value) parts.push(broth.value.name)
    if (totalSideCount.value) parts.push(`已选 ${totalSideCount.value} 样`)
    else parts.push('还未选菜')
    return parts.join(' · ')
  })

  function isSelected(dish) {
    if (dish.category === '底料') return brothId.value === dish.id
    return dishIds.value.includes(dish.id)
  }

  function toggleDish(dish) {
    if (dish.category === '底料') {
      brothId.value = brothId.value === dish.id ? null : dish.id
      return
    }
    const idx = dishIds.value.indexOf(dish.id)
    if (idx >= 0) dishIds.value.splice(idx, 1)
    else dishIds.value.push(dish.id)
  }

  function resetOrder() {
    brothId.value = null
    dishIds.value = []
    previewOpen.value = false
    previewUrl.value = ''
    activeTab.value = '底料'
  }

  function closePreview() {
    previewOpen.value = false
  }

  return {
    brothId,
    dishIds,
    activeTab,
    previewOpen,
    previewUrl,
    generating,
    broth,
    selectedDishes,
    meatCount,
    vegCount,
    totalSideCount,
    canGenerate,
    summaryText,
    isSelected,
    toggleDish,
    resetOrder,
    closePreview,
  }
}
