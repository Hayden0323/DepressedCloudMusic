<template>
  <div
    class="banner relative overflow-x-hidden mx-auto"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <div class="banner__container relative h-full">
      <transition name="banner-arrow-left">
        <button
          v-show="hover && (loop || activeIndex > 0)"
          type="button"
          class="left-4"
          style="outline: none"
          :class="bannerArrowClasses"
          @click.stop="throttledArrowClick(activeIndex - 1)"
        >
          <i class="fa fa-chevron-left cursor-pointer" />
        </button>
      </transition>
      <transition name="banner-arrow-right">
        <button
          v-show="hover && (loop || activeIndex < items.length - 1)"
          type="button"
          class="right-4"
          style="outline: none"
          :class="bannerArrowClasses"
          @click.stop="throttledArrowClick(activeIndex + 1)"
        >
          <i class="fa fa-chevron-right cursor-pointer" />
        </button>
      </transition>
      <item v-for="(item, index) in items" :key="index" :url="item.imageUrl" class="h-full" />
    </div>
    <ul class="absolute z-20 bottom-0 left-1/2 transform -translate-x-1/2">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="bg-transparent cursor-pointer inline-block p-1"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)"
      >
        <button
          class="w-6 h-1 bg-white hover:opacity-75 transition duration-300 outline-none"
          style="outline: none"
          :class="bannerButtonClasses(index)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce'
import { getBanner } from '@/api/banner'
import { addResizeListener, removeResizeListener } from '@/utils/resize-event'
import Item from './item'

export default {
  name: 'Banner',

  components: {
    Item
  },

  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },

  data() {
    return {
      items: [],
      hover: false,
      activeIndex: -1,
      timer: null,
      children: []
    }
  },

  computed: {
    bannerArrowClasses() {
      const classes = [
        'h-8',
        'w-8',
        'z-20',
        'cursor-pointer',
        'absolute',
        'top-1/2',
        'transform',
        'bg-gray-300',
        '-translate-y-1/2',
        'text-center',
        'rounded-full',
        'transition',
        'duration-300',
        'text-white',
        'bg-opacity-25',
        'hover:bg-opacity-75',
        'outline-none'
      ]
      return classes
    }
  },

  watch: {
    children(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex)
    },
    activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal)
    },
    loop() {
      this.setActiveItem(this.activeIndex)
    }
  },

  created() {
    this.getItems()
    this.throttledArrowClick = throttle(300, true, index => {
      this.setActiveItem(index)
    })
    this.throttledIndicatorHover = throttle(300, index => {
      this.handleIndicatorHover(index)
    })
  },

  mounted() {
    this.$nextTick(() => {
      addResizeListener(this.$el, this.resetItemPosition)
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex
      }
      this.startTimer()
    })
  },

  beforeDestroy() {
    if (this.$el) removeResizeListener(this.$el, this.resetItemPosition)
    this.pauseTimer()
  },

  methods: {
    getItems() {
      getBanner().then(res => {
        this.items = res.banners
        this.updateItems()
      })
    },
    updateItems() {
      this.children = this.$children.filter(
        child => child.$options.name === 'BannerItem'
      )
    },
    playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++
      } else if (this.loop) {
        this.activeIndex = 0
      }
    },
    startTimer() {
      if (this.interval <= 0 || this.timer) return
      this.timer = setInterval(this.playSlides, this.interval)
    },
    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    handleMouseEnter() {
      this.hover = true
      this.pauseTimer()
    },
    handleMouseLeave() {
      this.hover = false
      this.startTimer()
    },
    resetItemPosition(oldIndex) {
      this.children.forEach((child, index) => {
        child.translateItem(index, this.activeIndex, oldIndex)
      })
    },
    bannerButtonClasses(index) {
      return index === this.activeIndex
        ? 'bg-opacity-100'
        : ['bg-opacity-25', 'hover:bg-opacity-75']
    },
    setActiveItem(index) {
      index = Number(index)
      if (isNaN(index) || index !== Math.floor(index)) return
      const length = this.items.length
      const oldIndex = this.activeIndex
      if (index < 0) {
        this.activeIndex = this.loop ? length - 1 : 0
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1
      } else {
        this.activeIndex = index
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex)
      }
    },
    handleIndicatorClick(index) {
      this.activeIndex = index
    },
    handleIndicatorHover(index) {
      if (index !== this.activeIndex) {
        this.activeIndex = index
      }
    }
  }
}
</script>

<style lang="less" scoped>
.banner-arrow-left-enter,
.banner-arrow-left-leave-active {
  transform: translateY(-50%) translateX(-10px);
  opacity: 0;
}

.banner-arrow-right-enter,
.banner-arrow-right-leave-active {
  transform: translateY(-50%) translateX(10px);
  opacity: 0;
}
</style>
