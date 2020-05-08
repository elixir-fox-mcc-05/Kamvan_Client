<template>
  <div class="addTaskFormPage" v-if="formToogle">
    <div class="addTaskFormGroup">
      <p @click="addBtn" class="closeAddForm">close</p>
      <h1>
        Add Task
      </h1>
      <div class="formInput">
        <label class="labelAddTask">
          <h4>Category: <span class="optionCategory">Back-Log / Todo / Doing / Done</span></h4>
          <input v-model="category" type="text"  class="addTaskInput"/>
        </label>
        <label class="labelAddTask">
          <h4>Title</h4>
          <input v-model="title" type="text" class="addTaskInput"/>
        </label>
        <label class="labelAddTask">
          <h4>Description</h4>
          <input v-model="desc" type="text" class="addTaskInput"/>
        </label>
        <input @click.prevent="addTask" type="submit" value="Add Task" class="submitForm" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddTaskForm',
  methods: {
    addBtn() {
      this.$emit('addBtn');
    },
    addTask() {
      let payload = {
        id: this.id,
        category: this.category,
        title: this.title,
        desc: this.desc,
        UserId: this.UserId,
      };
      this.$emit('addTask', payload);
      this.id = '';
      this.category = '';
      this.title = '';
      this.desc = '';
      this.UserId = '';
      this.$emit('addBtn');
    },
  },
  props: ['formToogle'],
  data() {
    return {
      id: '',
      category: '',
      title: '',
      desc: '',
      UserId: '',
    };
  },
};
</script>

<style scoped>
.addTaskFormPage {
  height: 100vh;
  width: 100vw;
  padding: 25vh 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  background: rgba(54, 53, 75, 0.315);
  z-index: 120;
}

.addTaskFormGroup {
  width: 35vw;
  height: 55vh;
  background: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px 30px 0;
  border-radius: 20px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.082);
}

.closeAddForm {
  display: flex;
  padding-left: 28vw;
  font-size: 22px;
  position: absolute;
  cursor: pointer;
  color: #313236b0;
}

h1 {
  text-transform: uppercase;
  color: #313236;
}

.labelAddTask {
  display: block;
  width: 24vw;
  margin: 25px auto 0;
  text-align: center;
}

h4 {
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  color: #778192;
  /* margin-bottom: 20px; */
}

.optionCategory{
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-left: 30px;
}

.addTaskInput {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding: 10px 5px 10px 0px;
  font-size: 16px;
  border-width: 0px;
  border-bottom: 1px solid #31323660;
  text-align: left;
  margin-bottom: 20px;
  font-size: 22px;
  /* font-weight: bold; */
}

textarea:focus, input:focus{
    outline: none;
    border-bottom: 2px solid #313236;
}

.submitForm {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  background: #52ef44;
  text-transform: uppercase;
  border: none;
  height: 50px;
  width: 250px;
  font-size: 22px;
  color: #424242;;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
}

.submitForm:hover {
    background: #49d33c;
}
</style>
