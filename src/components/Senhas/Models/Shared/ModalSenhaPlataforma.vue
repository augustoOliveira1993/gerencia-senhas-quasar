<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      v-model="plataforma"
      @input="$emit('update:plataforma', $event)"
      label="Plataforma"
      autofocus
      class="col"
      :rules="[(val) => !!val || 'Digite algo na plataforma']"
      ref="plataforma"
    >
      <template v-slot:append>
        <q-icon
          v-if="plataforma"
          name="close"
          @click="$emit('update:plataforma', '')"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: "ModalSenhaPlataforma",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  computed: {
    plataforma: {
      get() {
        if (this.value == null) {
          this.$emit("input", "");
          return "";
        }
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    }
  }
};
</script>

<style></style>
