<template>
  <q-card-section class="row justify-between">
    <div class="text-h6">
      <slot></slot>
    </div>
    <q-btn flat round dense color="primary" icon="close" v-close-popup />
  </q-card-section>
</template>

<script>
export default {};
</script>

<style></style>
