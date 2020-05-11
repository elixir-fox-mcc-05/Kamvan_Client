<template>
    <div>
        <div class="card-body" style="justify-content:center;">
            <div class="inner-card" style="border: 2px solid; padding: 10px; box-shadow: 5px 10px #888888;">
                <h4 class="card-title">{{item.title}}</h4>
                <p class="card-text"> point : {{item.point}} <br> Assigned To : {{item.assigned}}
                </p>
                <button class="btn btn-primary btn-m btn-block" style="width: 100%;" @click.prevent="show(item)">Show Detail</button>
            </div>
        </div>
        <modal :name="idModal">
            <div class = "form-style" style="height: inherit;">
                <div v-if="message" style="font-size : 15px !important; color: red;">
                    {{message}}
                </div>
                <div>
                <form action="" style="display:flex; flex-direction:column; justify-content:space-between">
                    <div style="height: 100%">
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
                    </div>
                    <div style="display:flex; flex-direction:row; justify-content:space-between;">
                        <div class="button">
                            <button @click.prevent = "edit" class="btn btn-primary btn-block">Edit</button>
                        </div>
                        <div class="button">
                            <button @click.prevent = "showConfirm" class="btn btn-primary btn-block">Delete</button>
                        </div>
                        <div class="button">
                            <button v-if="category !== 'Dones'" @click.prevent = "changeCategory" class="btn btn-primary btn-block"> {{nextCategory.name}} </button>
                        </div>
                        <div class="button">
                            <button @click.prevent="hide" class="btn btn-primary btn-block">Close</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </modal>
        <modal :name="idModalConfirm">
            <div class = "form-style" style="height: inherit; display:flex">
                <p>Are you sure to delete {{item.title}}?</p>
                <button @click.prevent = "deleteData" class="btn btn-primary btn-block">Yes</button>
                <button @click.prevent = "hideConfirm" class="btn btn-primary btn-block">No</button>
            </div>
        </modal>
    </div>
</template>

<script>
export default {
    name : "innerCard",
    props : ["item", "message", "category"],
    data(){
        return {
            idModalCard : "",
            idModalConfirm : "",
            id : 0,
            title : "",
            descriptions : "",
            point : "",
            assigned : "",
            nextCategory : {
                id : 0,
                name : ""
            }
        }
    },
    methods : {
        generateName(){
            let result           = '';
            const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for ( var i = 0; i < 15; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
        show(item) {
            this.id = item.id
            this.title = item.title;
            this.point = item.point
            this.descriptions = item.descriptions;
            this.assigned = item.assigned;
            this.$modal.show(this.idModal)
        },
        hide(){
            this.$modal.hide(this.idModal)
        },
        showConfirm(){
            this.$modal.show(this.idModalConfirm)
        },
        hideConfirm(){
            this.$modal.hide(this.idModalConfirm)
        },
        edit(){
            let payload = {
                id : this.id,
                title : this.title,
                descriptions : this.descriptions,
                point : this.point,
                assigned : this.assigned,
            }
            this.hide()
            this.$emit("edit", payload)
        },
        findCategory(){
            switch (this.category){
                case "Backlogs" :
                    this.nextCategory = {id : 2, name : "Todos"}
                    break;
                case "Todos" :
                    this.nextCategory = {id : 3, name : "Doings"}
                    break;
                case "Doings" :
                    this.nextCategory = {id : 4, name : "Dones"}
                    break;
            }
        },
        changeCategory(){
            let payload = {
                id : this.id,
            }
            payload.category = this.nextCategory.id
            this.$emit("changeCategory", payload)
            onSucces : this.hide()
        },
        deleteData(){
            let payload = {
                id : this.id
            }
            this.$emit("deleteData", payload)
            this.hideConfirm()
            this.hide()
        }
    },
    created(){
        this.idModal = this.generateName()
        this.idModalConfirm = this.generateName()
        this.findCategory()
    }
}
</script>

<style>
    .button{
        width: 15%;
    }
</style>