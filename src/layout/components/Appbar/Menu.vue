<template>
  <div class="appbar-menu h-full">
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
        >
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'AppbarMenu',

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      activeIndex: 0
    }
  },

  methods: {
    calcTranslateWidth(index) {

    },
    handleActiveItem(index) {
      this.activeIndex = index
      this.$emit('change', this.activeIndex)
    },
    isActive(index) {
      return this.activeIndex === index
    }
  }
}
</script>

<style></style>
