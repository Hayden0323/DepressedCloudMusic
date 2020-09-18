<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" class="mx-auto">
    <HelloWorld msg="Welcome to Your Vue.js App And Test Lint-staged" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
