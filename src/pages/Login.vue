<template>
  <q-page class="flex flex-center bg-grey-4">
    <q-card class="" style="width: 400px">
      <q-card-section>
        <q-form @submit.prevent="submitForm" class="q-col-gutter-md">
          <p class="flex flex-center text-h4">Login</p>
          <q-input
            ref="email"
            outlined
            v-model="form.email"
            :rules="[
              (val) =>
                isValidaEmailAddress(val) ||
                'Please enter avalid email address',
            ]"
            lazy-rules
            type="email"
            label="E-Mail"
          >
            <template v-slot:append>
              <q-icon name="alternate_email" class="cursor-pointer" />
            </template>
          </q-input>

          <q-input
            outlined
            lazy-rules
            :rules="[
              (val) => val.length >= 6 || 'Please enter at least 6 caracters',
            ]"
            ref="password"
            v-model="form.password"
            :type="isPwd ? 'password' : 'text'"
            label="Password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="flex flex-center">
            <q-btn
              type="submit"
              rounded
              class="full-width"
              color="primary"
              label="Logar"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isPwd: true,
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("auth", ["loginUser", "registerUser"]),
    isValidaEmailAddress(val) {
      return String(val)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        this.loginUser(this.form);
      } else {
        // this.registerUser(this.form);
      }
    },
  },
};
</script>

<style></style>
