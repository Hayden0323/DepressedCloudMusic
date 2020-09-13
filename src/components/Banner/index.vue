<template>
    <div class="banner-container w-screen bg-gray-300">
        <div class="around cursor-pointer">
            <img
                class="prev absolute rounded-l"
                :src="prevImg"
                @click="handlePrev"
            />
            <img
                class="next absolute rounded-r"
                :src="nextImg"
                @click="handleNext"
            />
        </div>
        <div class="slider relative overflow-hidden my-0 mx-auto">
            <ul
                class=".absolute p-0"
                :style="{ width: `${slider.length * 800}px` }"
            >
                <li
                    v-for="(item, index) in slider"
                    :key="index"
                    :style="{
                        transform: `translate3d(-${imgIndex * 100}%, 0, 0)`
                    }"
                    class="float-left"
                >
                    <img
                        :src="item.imageUrl ? item.imageUrl : ''"
                        class="rounded"
                    />
                </li>
            </ul>
        </div>
        <div
            class="pointer flex justify-center text-2xl leading-7 cursor-pointer transform -translate-y-8 h-0"
        >
            <li
                v-for="(item, index) in slider"
                :key="index"
                :style="{ color: index === imgIndex ? 'orange' : null }"
                @click="imgIndex = index"
            ></li>
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
            imgIndex: 0,
            interval: null
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
                this.resetInterval()
            })
        },
        handlePrev() {
            this.resetInterval()
            this.imgIndex === 0
                ? (this.imgIndex = this.slider.length - 1)
                : this.imgIndex--
        },
        handleNext() {
            this.resetInterval()
            this.imgIndex === this.slider.length - 1
                ? (this.imgIndex = 0)
                : this.imgIndex++
        },
        resetInterval() {
            if (this.interval) clearInterval(this.interval)
            this.interval = setInterval(() => {
                this.handleNext()
            }, 5000)
        }
    },
    beforeDestroy() {
        clearInterval(this.interval)
        this.interval = null
    }
}
</script>

<style lang="less" scoped>
.around {
    perspective: 200;
    -webkit-perspective: 200;
    .prev {
        height: 188px;
        left: 300px;
        top: 35px;
        transform: rotateY(7deg);
    }
    .next {
        height: 188px;
        right: 300px;
        top: 35px;
        transform: rotateY(-7deg);
    }
}
.slider {
    width: 800px;
    height: 300px;
    ul {
        img {
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
