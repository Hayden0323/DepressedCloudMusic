<template>
  <div class="appbar-item h-full">
    <ul class="h-full flex flex-row">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="isActive(index) ? 'bg-black' : null"
        @click="handleActiveItem(index)"
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
        { name: '发现音乐', link: '/' },
        { name: '我的音乐', link: '/my' },
        { name: '朋友', link: '/' },
        { name: '商城', link: '/' },
        { name: '音乐人', link: '/' },
        { name: '下载客户端', link: '/' }
      ],
      activeIndex: 0
    }
  },
  methods: {
    handleActiveItem(index) {
      this.activeIndex = index
    },
    isActive(index) {
      return this.activeIndex === index
    }
  }
}
</script>

<style></style>
