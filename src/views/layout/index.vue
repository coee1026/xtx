<script setup>
import LayoutHeader from '@/views/layout/components/LayoutHeader.vue'
// import LayoutFooter from '@/views/layout/components/LayoutFooter.vue'
import footerCom from '@/components/footerCom.vue'
</script>
<template>
  <LayoutHeader />
  <RouterView />
  <footerCom />
</template>
<style lang="scss" scoped></style>
