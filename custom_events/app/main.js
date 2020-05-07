const inputComponent = {
  template: `<input
    class="input is-small"
    v-model="input"
    @keyup.enter="monitorEnterKey"
    :placeholder="placeholder"
    type="text" />
  `,
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      input: '',
    };
  },
  methods: {
    monitorEnterKey() {
      if (this.input === '') {
        return;
      }
      this.$emit('add-note', {
        note: this.input,
        timestamp: new Date().toLocaleString(),
      });
      this.input = '';
    },
  },
};

new Vue({
  el: '#app',
  data: {
    notes: [],
    timestamps: [],
    placeholder: 'Enter a note',
  },
  components: {
    'input-component': inputComponent,
  },
  methods: {
    addNote(event) {
      this.notes.push(event.note);
      this.timestamps.push(event.timestamp);
    },
  },
});
