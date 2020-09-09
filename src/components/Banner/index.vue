<template>
  <div class="banner-container w-screen bg-gray-300">
    <div class="around">
      <img class="prev" :src="prevImg" />
      <img class="next" :src="nextImg" />
    </div>
    <div class="slider relative w-32 h-4">
      <ul>
        <li v-for="(item, index) in slider" :key="index">
          <img :src="item.imageUrl ? item.imageUrl : ''" />
        </li>
      </ul>
    </div>
    <div class="pointer"></div>
  </div>
</template>

<script>
import { getBanner } from '@/api/banner'

export default {
  name: 'Banner',
  data() {
    return {
      slider: [],
      imgIndex: 0
    }
  },
  computed: {
    prevImg() {
      const len = this.slider.length
      if (len == 0) return ''
      if (this.imgIndex === 0) {
        return this.slider[len - 1].imageUrl
      } else {
        return this.slider[this.imgIndex - 1].imageUrl
      }
    },
    nextImg() {
      const len = this.slider.length
      if (len == 0) return ''
      if (this.imgIndex === len - 1) {
        return this.slider[0].imageUrl
      } else {
        return this.slider[this.imgIndex + 1].imageUrl
      }
    }
  },
  created() {
    this.getBanner()
  },
  methods: {
    getBanner() {
      getBanner().then(res => {
        this.slider = res.banners
        console.log(this.slider)
      })
    }
  }
}
</script>

<style></style>
