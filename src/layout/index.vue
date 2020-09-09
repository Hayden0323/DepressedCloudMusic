<template>
  <div class="layout">
    <appbar class="appbar-container" />
    <app-main />
  </div>
</template>

<script>
import Appbar from './components/Appbar'
import AppMain from './components/AppMain'

export default {
  components: {
    Appbar,
    AppMain
  }
}
</script>

<style></style>
