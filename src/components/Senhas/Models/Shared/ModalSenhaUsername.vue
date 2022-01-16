<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      v-model="username"
      @input="$emit('update:username', $event)"
      label="Username"
      class="col"
      :rules="[(val) => !!val || 'Digite algo em username']"
      ref="username"
    >
      <template v-slot:append>
        <q-icon
          v-if="username"
          name="close"
          @click="$emit('update:username', '')"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ["username"],
};
</script>

<style></style>
