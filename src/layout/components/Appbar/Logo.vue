<template>
  <div class="appbar-logo-container h-full">
    <router-link class="appbar-logo-link" to="/">
      <div class="flex items-center h-full">
        <img
          v-if="logo"
          :src="logo"
          class="appbar-logo h-10 w-10 mx-auto"
          alt="CloudMusic Logo"
        />
        <h1 class="appbar-title text-2xl ml-1 font-medium">{{ title }}</h1>
      </div>
    </router-link>
  </div>
</template>

<script>
import LogoImg from '@/assets/logo.png'

export default {
  name: 'AppbarLogo',
  data() {
    return {
      title: '秃头云音乐',
      logo: LogoImg
    }
  }
}
</script>

<style></style>
