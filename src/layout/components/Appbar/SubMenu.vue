<template>
  <div class="appbar-submenu w-full py-1 bg-red-600 relative">
    <ul class="flex justify-start">
      <li v-for="(item, index) in items" :key="index">
        <router-link :to="item.link">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <span
      class="absolute left-0 top-0 origin-top-left transform -rotate-45 bg-red-600"
      style="width: 12px; height: 12px"
    />
  </div>
</template>

<script>
export default {
  name: 'AppbarSubmenu',

  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

