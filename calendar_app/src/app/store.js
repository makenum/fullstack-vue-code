import { seedData } from './seed';
export const store = {
  state: {
    seedData,
  },
  // 获取当天active为ture
  getActiveDay() {
    return this.state.seedData.find((day) => day.active);
  },
  // 设置当天active为ture
  setActiveDay(dayId) {
    this.state.seedData.map((dayObj) => {
      dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false);
    });
  },
  // 提交新增待办
  submitEvent(eventDetails) {
    const activeDay = this.getActiveDay();
    activeDay.events.push({ details: eventDetails, edit: false });
  },
  // 待办编辑
  editEvent(dayId, eventDetails) {
    this.resetEditOfAllEvents();
    const eventObj = this.getEventObj(dayId, eventDetails);
    eventObj.edit = true;
  },
  // 更新待办
  updateEvent(dayId, originalEventDetails, newEventDetails) {
    const eventObj = this.getEventObj(dayId, originalEventDetails);
    console.log(eventObj);
    eventObj.details = newEventDetails;
    eventObj.edit = false;
  },
  // 删除待办
  deleteEvent(dayId, eventDetails) {
    const dayObj = this.state.seedData.find((day) => day.id === dayId);
    const eventIndexToRemove = dayObj.events.findIndex(
      (event) => event.details === eventDetails
    );
    dayObj.events.splice(eventIndexToRemove, 1);
  },
  // 重置所有待办状态为false
  resetEditOfAllEvents() {
    this.state.seedData.map((dayObj) => {
      dayObj.events.map((event) => {
        event.edit = false;
      });
    });
  },
  // 获取待办
  getEventObj(dayId, eventDetails) {
    const dayObj = this.state.seedData.find((day) => day.id === dayId);
    return dayObj.events.find((event) => event.details === eventDetails);
  },
};
