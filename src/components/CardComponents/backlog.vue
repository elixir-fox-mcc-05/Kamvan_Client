<template>
    <div class="card">
        <div class="card-header" style="background-color: black;">
            <p class="title-card">Back-Log</p>
        </div>
        <div v-if="backlogs.Task">
            <div v-for="data in backlogs.Task" :key="data.id">
                <div class="card-body">
                    <div class="inner-card" style="border: 2px solid; padding: 10px; box-shadow: 5px 10px #888888;">
                        <h4 class="card-title">{{data.title}}</h4>
                        <p class="card-text"> point : {{data.point}} <br> Assigned To : {{data.assigned}}
                        </p>
                        <button type="button" name="" id="" class="btn btn-primary btn-m btn-block" style="width: 50%;" @click.prevent="itemClicked(data)">Show Detail</button>
                    </div>
                </div>
            </div>
        </div>
        <modal name="detail-Modal-key">
            <div class = "form-style" style="height: inherit;">
                <div v-if="message" style="font-size : 15px !important; color: red;">
                    {{message}}
                </div>
                <div>
                <form action="" style="display:flex; flex-direction:column; justify-content:space-between">
                    <div style="height: 80%">
                        <div style="display:flex; flex-direction:row">
                            <div class="form-group">
                                <label for="titleInput">Title:</label>
                                <input v-model="title" type="text" class="form-control" placeholder="Enter title" id="titleInput">
                            </div>
                            <div class="form-group">
                                <label for="pointInput">Point:</label>
                                <input v-model="point" type="number" class="form-control" placeholder="Enter point" id="pointInput">
                            </div>
                        </div>
                        <div style="display:flex; flex-direction:row">
                            <div class="form-group">
                                <label for="descInput">Descriptions:</label>
                                <textarea v-model="descriptions" class="form-control" id="descInput" rows="2" cols="25" placeholder="Enter Descriptions"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="assignInput">Assigned To:</label>
                                <input v-model="assigned" type="text" class="form-control" placeholder="Assign Someone" id="assignInput">
                            </div>
                        </div>
                    </div>
                        <div style="display:flex; flex-direction:row">
                            <button @click.prevent = "edit" class="btn btn-primary btn-block">Edit</button>
                            <button @click.prevent = "showConfirm" class="btn btn-primary btn-block">Delete</button>
                            <button @click.prevent = "changeCategory" class="btn btn-primary btn-block">Todo</button>
                            <button @click.prevent="hide" class="btn btn-primary btn-block">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </modal>
        <modal name="confirm">
            <div class = "form-style" style="height: inherit; display:flex">
                <p>Are you sure ?</p>
                <button @click.prevent = "deleteData" class="btn btn-primary btn-block">Yes</button>
                <button @click.prevent = "hideConfirm" class="btn btn-primary btn-block">No</button>
            </div>
        </modal>
    </div>
</template>

<script>
export default {
    name : "backlogs",
    data(){
        return {
            id : 0,
            title : "",
            descriptions : "",
            point : "",
            assigned : "",
            category : ""
        }
    },
    props : ["backlogs", "message"],
    methods : {
        itemClicked: function(item) {
            this.id = item.id
            this.title = item.title;
            this.point = item.point
            this.descriptions = item.descriptions;
            this.assigned = item.assigned;
		    this.$modal.show("detail-Modal-key")
        },
        hide(){
            this.$modal.hide("detail-Modal-key")
        },
        showConfirm(){
            this.$modal.show("confirm")
        },
        hideConfirm(){
            this.$modal.hide("confirm")
        },
        edit(){
            let payload = {
                id : this.id,
                title : this.title,
                descriptions : this.descriptions,
                point : this.point,
                assigned : this.assigned
            }
            this.$emit("edit", payload)
        },
        changeCategory(){
            let payload = {
                id : this.id,
                category : "todos"
            }
            this.$emit("changeCategory", payload)
            this.hide()
        },
        deleteData(){
            let payload = {
                id : this.id
            }
            this.$emit("deleteData", payload)
            this.hideConfirm()
            this.hide()
        }
    }
};
</script>

<style>

</style>