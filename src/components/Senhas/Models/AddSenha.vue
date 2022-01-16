<template>
  <q-card style="width: 500px">
    <modal-header>Adicionar Senha</modal-header>
    <q-form @submit.prevent="submitForm">
      <q-card-section>
        <modal-senha-plataforma
          ref="modalSenhaPlataforma"
          :plataforma.sync="senhaToSubmit.plataforma"
        />
        <modal-senha-username
          ref="modalSenhaUsername"
          :username.sync="senhaToSubmit.username"
        />
        <modal-senha-password
          ref="modalSenhaPassword"
          :password.sync="senhaToSubmit.password"
        />
      </q-card-section>
      <pre>{{ senhaToSubmit }}</pre>
      <modal-button class="justify-center"></modal-button>
    </q-form>
  </q-card>
</template>

<script>
import ModalButton from "./Shared/ModalButton.vue";
import ModalHeader from "./Shared/ModalHeader.vue";
import ModalSenhaPassword from "./Shared/ModalSenhaPassword.vue";
import ModalSenhaPlataforma from "./Shared/ModalSenhaPlataforma.vue";
import ModalSenhaUsername from "./Shared/ModalSenhaUsername.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      senhaToSubmit: {
        plataforma: "",
        username: "",
        password: "",
      },
    };
  },
  components: {
    ModalSenhaUsername,
    ModalHeader,
    ModalButton,
    ModalSenhaPlataforma,
    ModalSenhaPassword,
  },
  methods: {
    ...mapActions("senhas", ["addSenha"]),
    submitForm() {
      this.$refs.modalSenhaPlataforma.$refs.plataforma.validate();
      this.$refs.modalSenhaUsername.$refs.username.validate();
      this.$refs.modalSenhaPassword.$refs.password.validate();

      if (
        !this.$refs.modalSenhaPlataforma.$refs.plataforma.hasError &&
        !this.$refs.modalSenhaUsername.$refs.username.hasError &&
        !this.$refs.modalSenhaPassword.$refs.password.hasError
      ) {
        console.log("submti");
        this.submitSenha();
      }
    },
    submitSenha() {
      this.addSenha(this.senhaToSubmit);
      this.$emit("close");
    },
    clearDueDate() {
      this.senhaToSubmit.plataforma = "";
      this.senhaToSubmit.username = "";
      this.senhaToSubmit.password = "";
    },
  },
};
</script>

<style></style>
