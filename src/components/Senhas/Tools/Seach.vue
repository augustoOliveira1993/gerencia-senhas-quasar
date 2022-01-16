<template>
  <q-card class="full-width shadow-0">
    <q-card-section>
      <q-input
        outlined
        @keyup.esc="searchField = ''"
        v-model="searchField"
        v-select-all
        class="col"
        label="Search"
      >
        <template v-slot:append>
          <q-icon
            v-if="searchField !== ''"
            name="close"
            @click="searchField = ''"
            class="cursor-pointer"
          />
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { selectAll } from "src/directives/directive-select-all";
export default {
  directives: { selectAll },
  computed: {
    ...mapState("senhas", ["search"]),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      },
    },
  },
  methods: {
    ...mapActions("senhas", ["setSearch"]),
  },
};
</script>

<style></style>
