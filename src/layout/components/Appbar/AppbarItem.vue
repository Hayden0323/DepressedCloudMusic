<template>
  <div class="appbar-item h-full">
    <ul class="h-full flex flex-row">
      <li
        v-for="item in items"
        :key="item.name"
        :class="isActive(item.index) ? 'bg-black' : null"
        @click="handleActiveItem(item.index)"
      >
        <router-link
          :to="item.link"
          class="h-full flex items-center px-6 hover:bg-black text-sm font-medium text-gray-300"
        >{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { index: 0, name: '发现音乐', link: '/' },
        { index: 1, name: '我的音乐', link: '/' },
        { index: 2, name: '朋友', link: '/' },
        { index: 3, name: '商城', link: '/' },
        { index: 4, name: '音乐人', link: '/' },
        { index: 5, name: '下载客户端', link: '/' },
      ],
      activeIndex: 0,
    }
  },
  methods: {
    handleActiveItem(index) {
      this.activeIndex = index
    },
    isActive(index) {
      return this.activeIndex === index
    },
  },
}
</script>

<style></style>
