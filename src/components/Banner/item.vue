<template>
  <div
    v-show="ready"
    class="banner__item z-0"
    :class="bannerItemClasses"
    :style="itemStyle"
    @click="handleItemClick"
  >
    <img :src="url" alt="banner-item" class="h-full">
  </div>
</template>

<script>
const ITEM_SCALE = 0.8
export default {
  name: 'BannerItem',

  props: {
    url: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      ready: false,
      active: false,
      inStage: false,
      animating: false,
      translate: 0
    }
  },

  computed: {
    itemStyle() {
      const value = `translateX(${this.translate}px) scale(${this.scale})`
      const style = {
        transform: value
      }
      return style
    },
    bannerItemClasses() {
      const classes = ['absolute', 'top-0', 'left-0', 'w-1/2', 'h-full', 'inline-block',
        'overflow-hidden', 'transition-transform', 'ease-in-out', 'duration-500', 'cursor-pointer'
      ]
      let zIndex = 'z-0'
      if (this.active) {
        zIndex = 'z-20'
      } else {
        zIndex = 'z-10'
      }
      if (!this.inStage) {
        zIndex = 'z-0'
      }
      classes.push(zIndex)
      return classes
    }
  },

  created() {
    this.$parent && this.$parent.updateItems()
  },

  destroyed() {
    this.$parent && this.$parent.updateItems()
  },

  methods: {
    handleItemClick() {
      const parent = this.$parent
      if (parent) {
        const index = parent.children.indexOf(this)
        parent.setActiveItem(index)
      }
    },
    processIndex(index, activeIndex, length) {
      if (activeIndex === 0 && index === length - 1) {
        return -1
      } else if (activeIndex === length - 1 && index === 0) {
        return length
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2
      }
      return index
    },
    calcItemTranslate(index, activeIndex) {
      const parentWidth = this.$parent.$el.offsetWidth
      if (this.inStage) {
        return parentWidth * ((2 - ITEM_SCALE) * (index - activeIndex) + 1) / 4
      } else if (index < activeIndex) {
        return -(1 + ITEM_SCALE) * parentWidth / 4
      } else {
        return (3 + ITEM_SCALE) * parentWidth / 4
      }
    },
    calcTranslate(index, activeIndex) {
      const distance = this.$parent.$el.offsetWidth
      return distance * (index - activeIndex)
    },
    translateItem(index, activeIndex, oldIndex) {
      const length = this.$parent.items.length
      if (oldIndex !== undefined) {
        this.animating = index === activeIndex || index === oldIndex
      }
      if (index !== activeIndex && length > 2 && this.$parent.loop) {
        index = this.processIndex(index, activeIndex, length)
      }
      this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1
      this.active = index === activeIndex
      this.translate = this.calcItemTranslate(index, activeIndex)
      this.scale = this.active ? 1 : ITEM_SCALE
      this.ready = true
    }
  }
}
</script>
