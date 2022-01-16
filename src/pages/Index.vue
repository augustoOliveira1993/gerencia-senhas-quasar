<template>
  <q-page class="q-pa-sm">
    <template v-if="senhasDownloaded">
      <div class="row q-mb-lg">
        <seach />
      </div>

      <div class="absolute-bottom text-center q-mb-lg">
        <q-btn
          class="all-pointer-events"
          @click="showAddSenha = true"
          round
          color="primary"
          size="24px"
          icon="add"
        />
      </div>

      <q-card class="shadow-0">
        <q-table
          class=""
          title="Controle de Senhas"
          table-header-style=""
          :data="senhas"
          :columns="columns"
          row-key="id"
          :pagination="initialPagination"
        >
          <template v-slot:body-cell-password="props">
            <q-td :props="props">
              <q-badge
                v-if="!showSenhas"
                color="white"
                text-color="black"
                label="****************"
              />
              <q-badge
                v-else
                color="green-4"
                text-color="black"
                style="font-size: 15px"
                class="text-bold"
                :label="props.value"
                @click.stop="copiarTexto(props.value)"
              />
            </q-td>
          </template>

          <template v-slot:body-cell-username="props">
            <q-td :props="props">
              <span @click.stop="copiarTexto(props.value)">{{
                props.value
              }}</span>
            </q-td>
          </template>

          <template v-slot:body-cell-acao="props">
            <q-td :props="props">
              <q-btn flat @click.stop icon="edit" color="primary" />
              <q-btn flat @click.stop color="red" icon="delete" />
              <q-btn
                flat
                :icon="showSenhas ? 'visibility_off' : 'visibility'"
                @click.stop="showSenhas = !showSenhas"
              />
            </q-td>
          </template>

          <template v-slot:body-cell-icon="props">
            <q-td :props="props">
              <i
                style="font-size: 25px"
                :class="
                  props.row.plataforma
                    ? `fab fa-${
                        props.row.plataforma.toLowerCase().split(' ')[0]
                      }`
                    : ''
                "
              ></i>
            </q-td>
          </template>
        </q-table>
      </q-card>
    </template>
    <template v-else>
      <q-spinner-gears class="absolute-center" size="10em" color="primary"
    /></template>

    <q-dialog v-model="showAddSenha">
      <add-senha @close="showAddSenha = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import Seach from "src/components/Senhas/Tools/Seach.vue";
import { mapState, mapGetters } from "vuex";
import { copyToClipboard } from "quasar";
import AddSenha from "src/components/Senhas/Models/AddSenha.vue";
import { showMessageSucess } from "src/functions/show-messaes";
export default {
  components: { Seach, AddSenha },
  name: "PageIndex",
  data() {
    return {
      initialPagination: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "center",
          field: "id",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "icon",
          required: true,
          label: "Icon",
          align: "center",
          field: "icon",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "plataforma",
          required: true,
          label: "Plataforma",
          align: "rigth",
          field: "plataforma",
          format: (val) => `${val}`,
          sortable: true,
        },

        {
          name: "username",
          required: true,
          label: "Username",
          align: "rigth",
          field: "username",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "password",
          required: true,
          label: "Password",
          align: "center",
          field: "password",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "acao",
          required: true,
          label: "Ações",
          align: "center",
          field: "acao",
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      showSenhas: false,
      showAddSenha: false,
      formSenhas: {
        plataforma: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    copiarTexto(texto) {
      copyToClipboard(texto)
        .then(() => {
          showMessageSucess("Texto copiado!");
        })
        .catch(() => {
          showMessageError("Texto não copiado!");
          // fail
        });
    },
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("senhas", ["senhasDownloaded", "senhas"]),
    ...mapGetters("senhas", ["senhas"]),
  },
};
</script>
