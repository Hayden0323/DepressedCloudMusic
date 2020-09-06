<template>
  <div class="app-bar w-screen h-16 bg-gray-800 flex justify-center items-center">
    <logo />
    <item />
  </div>
</template>

<script>
import Logo from './Logo'
import Item from './AppbarItem'

export default {
  components: {
    Logo,
    Item,
  },
}
</script>

<style></style>
