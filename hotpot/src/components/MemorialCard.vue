<script setup>
import { BRAND, NICKNAME } from '../config.js'
import { memorialTitle } from '../utils/dateTitle.js'

defineProps({
  broth: { type: Object, default: null },
  meats: { type: Array, default: () => [] },
  vegs: { type: Array, default: () => [] },
})

const title = memorialTitle()
</script>

<template>
  <article class="card">
    <div class="edge" aria-hidden="true" />
    <header class="head">
      <div class="meta">
        <span class="brand">{{ BRAND }}</span>
        <span class="to">致 {{ NICKNAME }}</span>
      </div>
      <h2>{{ title }}</h2>
      <p class="sub">今晚的点单纪念</p>
      <div class="rule" aria-hidden="true"><span /></div>
    </header>

    <section v-if="broth" class="block">
      <h3>汤底</h3>
      <div class="broth-row">
        <span class="plate">
          <img :src="broth.image" :alt="broth.name" />
        </span>
        <span class="broth-name">{{ broth.name }}</span>
      </div>
    </section>

    <section v-if="meats.length" class="block">
      <h3>荤菜 · {{ meats.length }}</h3>
      <ul class="list">
        <li v-for="item in meats" :key="item.id">
          <span class="thumb"><img :src="item.image" :alt="item.name" /></span>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </section>

    <section v-if="vegs.length" class="block">
      <h3>素菜 · {{ vegs.length }}</h3>
      <ul class="list">
        <li v-for="item in vegs" :key="item.id">
          <span class="thumb"><img :src="item.image" :alt="item.name" /></span>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </section>

    <footer class="foot">
      <span class="seal" aria-hidden="true">夜</span>
      <span>长按保存 · 留住这一顿</span>
    </footer>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  width: 360px;
  box-sizing: border-box;
  padding: 1.45rem 1.3rem 1.25rem 1.45rem;
  background:
    radial-gradient(90% 60% at 100% 0%, color-mix(in srgb, #c45c3e 10%, transparent), transparent 50%),
    linear-gradient(165deg, #f7f8fa 0%, #eef1f5 55%, #e6eaf0 100%);
  color: #1a2330;
  font-family: 'Noto Sans SC', 'PingFang SC', sans-serif;
  overflow: hidden;
}

.edge {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 8px;
  background: linear-gradient(180deg, #243656 0%, #1a2330 100%);
}

.head h2 {
  margin: 0.5rem 0 0.25rem;
  font-family: 'LXGW WenKai', 'Noto Serif SC', serif;
  font-size: 1.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.3;
  color: #243656;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  color: #5c6a7a;
}

.brand {
  font-family: 'LXGW WenKai', serif;
  color: #243656;
  font-weight: 700;
  letter-spacing: 0.2em;
}

.to {
  color: #c45c3e;
}

.sub {
  margin: 0;
  font-size: 0.78rem;
  color: #7d8b9c;
}

.rule {
  margin-top: 0.85rem;
  height: 1px;
  background: linear-gradient(90deg, #243656, #b7a78a 50%, transparent);
  position: relative;
}

.rule span {
  position: absolute;
  left: 0;
  top: 50%;
  width: 6px;
  height: 6px;
  border: 1.5px solid #c45c3e;
  border-radius: 50%;
  transform: translateY(-50%);
  background: #f5f6f8;
}

.block {
  margin-top: 1.05rem;
}

.block h3 {
  margin: 0 0 0.55rem;
  font-family: 'LXGW WenKai', serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: #c45c3e;
}

.broth-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.5rem 0.55rem;
  background: color-mix(in srgb, white 70%, transparent);
  border: 1px solid color-mix(in srgb, #b7a78a 40%, transparent);
}

.plate {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 35% 30%, #fff, #e8ebf0 70%);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, #b7a78a 55%, transparent);
  flex-shrink: 0;
  overflow: hidden;
}

.plate img {
  width: 78%;
  height: 78%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}

.broth-name {
  font-family: 'LXGW WenKai', serif;
  font-size: 1.1rem;
  letter-spacing: 0.12em;
  color: #1a2330;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.55rem 0.45rem;
}

.list li {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
}

.thumb {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, #b7a78a 45%, transparent);
  background: #e8ebf0;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.list span:last-child {
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.foot {
  margin-top: 1.25rem;
  padding-top: 0.85rem;
  border-top: 1px dashed color-mix(in srgb, #b7a78a 50%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  color: #7d8b9c;
}

.seal {
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-family: 'LXGW WenKai', serif;
  font-size: 0.62rem;
  color: #fff7f2;
  background: #c45c3e;
  letter-spacing: 0;
}
</style>
