<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      v-model="password"
      @input="$emit('update:password', $event)"
      label="Password"
      class="col"
      :rules="[
        (val) => !!val || 'Password so pode ser apenas acima de 6 caracter',
      ]"
      ref="password"
    >
      <template v-slot:append>
        <q-icon
          v-if="password"
          name="close"
          @click="$emit('update:password', '')"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: "ModalSenhaPassword",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  computed: {
     password: {
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
