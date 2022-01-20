<template>
  <q-item
    v-touch-hold:1000.mouse="showEditTaskModal"
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    clickable
    v-ripple
  >
    <q-item-section side>
      <q-checkbox
        v-model="task.completed"
        :value="task.completed"
        class="no-pointer-events"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-strike': task.completed }"
        v-html="$options.filters.searchHighlight(task.name, search)"
      >
      </q-item-label>
    </q-item-section>

    <q-item-section v-if="task.dueDate" side>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">{{
            task.dueDate | niceDate
          }}</q-item-label>
          <q-item-label caption class="row justify-end">{{
            taskDueTime
          }}</q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditSenhaModal"
          flat
          round
          dense
          color="primary"
          icon="edit"
        />

        <q-btn
          @click.stop="promptToDelete(id)"
          flat
          round
          dense
          color="red"
          icon="delete"
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditSenha">
      <edit-senha :senha="senha" :id="id" @close="showEditSenha = false" />
    </q-dialog>
  </q-item>
</template>

<script>
import EditSenha from "./Models/EditSenha.vue";
impo;
export default {
  props: ["senha", "id"],
  components: { EditSenha },
  data() {
    return {
      showEditSenha: false,
    };
  },
};
</script>

<style></style>
