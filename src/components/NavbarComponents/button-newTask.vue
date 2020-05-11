<template>
    <div>
        <button class="btn btn-primary btn-xs btn-block" @click.prevent="show">New Task</button>
        <modal name="newTask-Form">
            <div class = "form-style" style="font-size:17px !important; height: inherit; flex-direction: column;">
                <div v-if="message" style="font-size : 15px !important; color: red;">
                    {{message}}
                </div>
                <form action="" style="display:flex; flex-direction:column; justify-content:space-between">
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
                            <textarea v-model="descriptions" class="form-control" id="descInput" rows="3" cols="25" placeholder="Enter Descriptions"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="assignInput">Assigned To:</label>
                            <input v-model="assigned" type="text" class="form-control" placeholder="Assign Someone" id="assignInput">
                        </div>
                    </div>
                    <div style="display:flex; flex-direction:column">
                        <button @click.prevent = "createTask" class="btn btn-primary btn-m btn-block">Submit</button>
                        <button @click.prevent="hide" class="btn btn-primary btn-m btn-block">Close</button>
                    </div>
                </form>
            </div>
        </modal>
    </div>
</template>

<script>
export default {
    name : "button-NewTask",
    data(){
        return {
            title : '',
            descriptions : '',
            point : 0,
            assigned : ''
        }
    },
    props : ["message"],
    methods : {
        show () {
            this.$modal.show('newTask-Form');
        },
        hide () {
            this.$modal.hide('newTask-Form');
        },
        createTask(){
            let payload = {
                title : this.title,
                descriptions : this.descriptions,
                point : this.point,
                assigned : this.assigned
            }
            this.$emit("createTask", payload)
            this.title = ""
            this.descriptions = ""
            this.point = 0
            this.assigned = ""
        }
    }
};
</script>

<style>

</style>