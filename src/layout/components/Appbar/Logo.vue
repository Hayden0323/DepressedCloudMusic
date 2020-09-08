<template>
  <div class="appbar-logo-container h-full px-6">
    <router-link
      class="appbar-logo-link"
      to="/"
    >
      <div class="flex items-center h-full">
        <img
          v-if="logo"
          :src="logo"
          class="appbar-logo h-8 w-8 mx-2"
          alt="CloudMusic Logo"
        />
        <h1 class="appbar-title text-2xl font-medium text-gray-300 tracking-widest">
          {{ title }}
        </h1>
      </div>
    </router-link>
  </div>
</template>

<script>
import LogoImg from '@/assets/itunes.svg'

export default {
  name: 'AppbarLogo',
  data() {
    return {
      title: '秃头云音乐',
      logo: LogoImg,
    }
  },
}
</script>

<style></style>
