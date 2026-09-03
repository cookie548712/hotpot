<script setup>
import { computed } from 'vue'
import { dishesByCategory } from '../data/menu.js'
import DishCard from './DishCard.vue'

const props = defineProps({
  category: { type: String, required: true },
  isSelected: { type: Function, required: true },
})

defineEmits(['toggle'])

const list = computed(() => dishesByCategory(props.category))
const mode = computed(() => (props.category === '底料' ? 'single' : 'multi'))
const isBroth = computed(() => props.category === '底料')
</script>

<template>
  <section class="grid-wrap" :aria-label="category">
    <div class="grid" :class="{ broth: isBroth }">
      <DishCard v-for="(dish, i) in list" :key="dish.id" :dish="dish" :selected="isSelected(dish)" :mode="mode"
        :featured="isBroth" :style="{ animationDelay: `${Math.min(i, 8) * 40}ms` }" @toggle="$emit('toggle', $event)" />
    </div>
  </section>
</template>

<style scoped>
.grid-wrap {
  padding: 0 1.05rem 8.2rem;
}

.section-head {
  margin-bottom: 0.95rem;
}

.note {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  color: var(--steam);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.15rem 0.85rem;
}

.grid.broth {
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 380px) {
  .grid.broth {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 480px) {
  .grid:not(.broth) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
