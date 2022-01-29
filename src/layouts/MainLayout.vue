<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-3">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <q-img width="50px" src="icons/icon-pass.png" :ratio="16 / 9" />
          Gerencia Senhas
        </q-toolbar-title>

        <div>v{{ version }}</div>

        <q-btn v-if="loggedIn" @click="logoutUser" flat icon-right="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="400"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple exact to="/">
            <q-item-section avatar>
              <q-icon name="vpn_key" />
            </q-item-section>

            <q-item-section> Senhas </q-item-section>
          </q-item>

          <q-item clickable v-ripple exact to="/sobre">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>

            <q-item-section> Sobre </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div v-if="user">{{ user.email }}</div>
          <div class="text-italic">Cliente</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "MainLayout",
  components: {},
  computed: {
    ...mapState("auth", ["loggedIn", "user"]),
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
  },
  mounted() {},
  data() {
    return {
      version: "1.0.0",
      leftDrawerOpen: false,
    };
  },
};
</script>
