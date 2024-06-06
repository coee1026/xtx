<script setup>
import LayoutHeader from '@/views/layout/components/LayoutHeader.vue'
// import LayoutFooter from '@/views/layout/components/LayoutFooter.vue'
import footerCom from '@/components/footerCom.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
  <LayoutHeader />
  <RouterView :key="route.params.id" />
  <footerCom />
</template>
<style lang="scss" scoped></style>
