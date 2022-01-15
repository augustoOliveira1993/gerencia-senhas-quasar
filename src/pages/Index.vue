<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />

    <pre>{{ user }}</pre>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PageIndex",
  computed: {
    ...mapState("auth", ["user"]),
  },
};
</script>
