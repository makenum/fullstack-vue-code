<template>
  <div class="day-event" :style="{ backgroundColor: getColor }">
    <div v-if="event.edit">
      <input
        type="text"
        :placeholder="event.details"
        v-model="newEventDetails"
      />
      <div class="has-text-centered icons">
        <i
          class="fa fa-check"
          @click="updateEvent(day.id, event.details, newEventDetails)"
        ></i>
      </div>
    </div>
    <div v-else>
      <span class="has-text-centered details">{{ event.details }}</span>
      <div class="has-text-centered icons">
        <i
          class="fa fa-pencil-square edit-icon"
          @click="editEvent(day.id, event.details)"
        ></i>
        <i
          class="fa fa-trash-o delete-icon"
          @click="deleteEvent(day.id, event.details)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";
export default {
  name: "CalendarEvent",
  data() {
    return {
      newEventDetails: ""
    };
  },
  props: {
    event: {
      type: Object,
      default() {
        return {};
      }
    },
    day: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    getColor() {
      const colors = ["#FF9999", "#85D6FF", "#99FF99"];
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      return randomColor;
    }
  },
  methods: {
    // 编辑待办
    editEvent(dayId, eventDetails) {
      store.editEvent(dayId, eventDetails);
    },
    // 更新待办
    updateEvent(dayId, originalEventDetails, updateEventDetails) {
      if (updateEventDetails === "") {
        updateEventDetails = originalEventDetails;
      }
      store.updateEvent(dayId, originalEventDetails, updateEventDetails);
      this.newEventDetails = "";
    },
    // 删除待办
    deleteEvent(dayId, eventDetails) {
      store.deleteEvent(dayId, eventDetails);
    }
  }
};
</script>
<style lang="scss" scoped>
.day-event {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
  color: #4c4c4c;
  padding: 5px;

  .details {
    display: block;
  }

  .icons .fa {
    padding: 0 2px;
  }

  input {
    background: none;
    border: 0;
    border-bottom: 1px solid #fff;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>
