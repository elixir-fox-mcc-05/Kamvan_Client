<template>
  <div>
      <modal name="detail-Modal-key">
        <div class = "form-style" style="height: inherit;">
                {{data.title}}
            <div v-if="message" style="font-size : 15px !important; color: red;">
                {{message}}
            </div>
            <div>
            <form action="" style="display:flex; flex-direction:column; justify-content:space-between">
                    <div style="display:flex; flex-direction:row">
                        <div class="form-group">
                            <label for="titleInput">Title:</label>
                            <input v-model="title" value="data.title" type="text" class="form-control" placeholder="Enter title" id="titleInput">
                        </div>
                        <div class="form-group">
                            <label for="pointInput">Point:</label>
                            <input v-model="point" value="data.point" type="number" class="form-control" placeholder="Enter point" id="pointInput">
                        </div>
                    </div>
                    <div style="display:flex; flex-direction:row">
                        <div class="form-group">
                            <label for="descInput">Descriptions:</label>
                            <textarea v-model="descriptions" value="data.descriptions" class="form-control" id="descInput" rows="3" cols="25" placeholder="Enter Descriptions"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="assignInput">Assigned To:</label>
                            <input v-model="assigned" value="data.assigned" type="text" class="form-control" placeholder="Assign Someone" id="assignInput">
                        </div>
                    </div>
                    <div style="display:flex; flex-direction:column">
                        <button @click.prevent = "createTask" type="submit" class="btn btn-primary btn-m btn-block">Submit</button>
                        <button @click.prevent="hide" class="btn btn-primary btn-m btn-block">Close</button>
                    </div>
                </form>
            </div>
        </div>
    </modal>
  </div>
</template>

<script>
export default {
    name : "buttonDetail",
    data () {
      return {
        title : "",
        descriptions : "",
        point : 0,
        assigned : ""
      }
    },
    props : ["data", "key"],
    methods : {
      show(){
        this.$modal.show("detail-Modal-key")
      },
      hide(){
        this.$modal.hide("detail-Modal-key")
      }
    }
};
</script>

<style>

</style>