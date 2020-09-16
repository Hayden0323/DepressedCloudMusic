<template>
  <div class="banner-container w-screen">
    <div class="slider relative my-0 mx-auto flex justify-start">
      <ul
        class="absolute p-0 flex"
        :style="{ width: `${slider.length * 800}px` }"
      >
        <li
          v-for="(item, index) in slider"
          ref="imgs"
          :key="index"
          :style="{
            transform: `translate3d(-${imgIndex * 100}%, 0, 0)`
          }"
          :class="[isAnimating ? 'transition duration-500 ease-linear' : null]"
        >
          <img
            :src="item.imageUrl ? item.imageUrl : ''"
            :class="[
              'current',
              'rounded',
              'shadow-xl',
              isAnimating ? 'transition duration-500 ease-linear' : null
            ]"
            :style="[imgStyle(index)]"
          >
        </li>
      </ul>
    </div>
    <div
      class="pointer flex justify-center text-2xl leading-7 cursor-pointer transform -translate-y-8 h-0"
    >
      <li
        v-for="index in pointers"
        :key="index"
        :style="{ color: index === imgIndex ? 'orange' : null }"
        @click="pointerClick(index)"
      />
    </div>
  </div>
</template>

<script>
import { getBanner } from '@/api/banner'

export default {
  name: 'Banner',
  data() {
    return {
      slider: [],
      pointers: [],
      imgIndex: 2,
      interval: null,
      isAnimating: true
    }
  },
  created() {
    this.getBanner()
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    getBanner() {
      getBanner().then(res => {
        this.init(res)
      })
    },
    handlePrev() {
      this.resetInterval()
      if (this.imgIndex === 0) {
        this.imgIndex = this.slider.length - 2
      } else {
        this.imgIndex--
      }
    },
    handleNext() {
      this.resetInterval()
      if (this.imgIndex === this.slider.length - 1) {
        this.imgIndex = 1
      } else {
        this.imgIndex++
      }
    },
    resetInterval() {
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        this.handleNext()
      }, 5000)
    },
    pointerClick(index) {
      this.resetInterval()
      this.imgIndex = index
    },
    imgStyle(index) {
      let rotate = 'rotateY(0deg)'
      let scale = 'scale3d(1, 1, 1)'

      if (index < this.imgIndex) {
        rotate = 'rotateY(-4deg)'
        scale = 'scale3d(0.85, 0.85, 1)'
      }
      if (index > this.imgIndex) {
        rotate = 'rotateY(4deg)'
        scale = 'scale3d(0.85, 0.85, 1)'
      }
      return {
        zIndex: index === this.imgIndex ? 2 : 1,
        transform: `${rotate} ${scale}`
      }
    },
    init(res) {
      const banners = [...res.banners]
      const len = banners.length

      for (let i = 0; i < len; i++) {
        this.pointers.push(i + 2)
      }

      const prevImgs = [banners[0], banners[1]]
      const lastImgs = [banners[len - 2], banners[len - 1]]

      this.slider = lastImgs.concat(...res.banners).concat(prevImgs)
      this.resetInterval()

      this.$nextTick(() => {
        this.$refs.imgs.forEach(img => {
          img.addEventListener('transitionend', () => {
            if (this.imgIndex === this.slider.length - 2) {
              this.isAnimating = false
              this.imgIndex = 2

              setTimeout(() => {
                this.isAnimating = true
              }, 0)
            } else if (this.imgIndex === 1) {
              this.isAnimating = false
              this.imgIndex = this.slider.length - 3

              setTimeout(() => {
                this.isAnimating = true
              }, 0)
            }
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.slider {
  width: 800px;
  height: 300px;
  ul {
    li {
      perspective: 200;
      -webkit-perspective: 200;
    }
    .current {
      width: 800px;
      height: 300px;
    }
  }
}
.pointer {
  color: gray;
  li {
    &:hover {
      color: orange;
    }
  }
}
</style>
