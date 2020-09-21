<template>
  <div class="app-bar">
    <div class="w-screen h-16 bg-gray-800 flex justify-center items-center">
      <logo />
      <appbar-menu :items="items" @change="handleMenuChange" />
    </div>
    <appbar-submenu :items="subItems" />
  </div>
</template>

<script>
import Logo from './Logo'
import AppbarMenu from './Menu'
import AppbarSubmenu from './SubMenu'

export default {
  name: 'Appbar',

  components: {
    Logo,
    AppbarMenu,
    AppbarSubmenu
  },

  data() {
    return {
      items: [
        { name: '发现音乐', link: '/', children: [{ name: '推荐', link: '/discover' }] },
        { name: '我的音乐', link: '/my' },
        { name: '朋友', link: '/' },
        { name: '商城', link: '/' },
        { name: '音乐人', link: '/' },
        { name: '下载客户端', link: '/' }
      ],
      activeIndex: 0
    }
  },

  computed: {
    subItems() {
      const item = this.items[this.activeIndex]
      return item.children ? item.children : []
    }
  },

  methods: {
    handleMenuChange(index) {
      this.activeIndex = index
    }
  }
}
</script>
