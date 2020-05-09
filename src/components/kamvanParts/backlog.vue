<template>

    <a href="#" class=" " v-on:click="show(list.title, list.description, list.id, list.point, list.assignedTo, list.UserId)">
        <div>
            <h5 class="card-title p-2 border-bottom">{{ list.title }}</h5>
            <div class="card-container p-2">
                <div>Point: {{ list.point }}</div>
                <div>Assigned To: {{list.assignedTo}}</div>
            </div>
        </div>
    </a>
</template>

<script>

export default {
    props : ['list'],
    data ()  {
        return {
        }
    },
    methods : {

        show (title, description, id, point, assignedTo, UserId) {
            if(this.checkOwner(UserId)){
                this.$modal.show('dialog', {
                    title: title,
                    text: description+`<br><br> Point : `+point+`<br>Assigned To : `+assignedTo+`<br>`,
                    buttons: [
                        {
                            title: 'Cancel'
                        },
                        {
                            title: 'Edit',       // Button title
                            handler: () => {
                                this.$emit(`edit`, { id, title, description, point, assignedTo })
                            }
                        },
                        {
                            title: 'Delete',
                            handler: () => {
                                this.$emit(`deleteTodo`, id)
                            }
                        },
                        {
                            title: 'Todo > ',
                            handler: () => {
                                this.$emit(`setTodo`, { id, title, description, point, assignedTo } )
                            }   
                        }
                    ]
                })
                
            } else {

                this.$modal.show('dialog', {
                    title: title,
                    text: description+`<br><br> Point : `+point+`<br>Assigned To : `+assignedTo+`<br>`,
                    buttons:  [{ title : `Close`}]
                })

            }
        },
        hide () {
            this.$modal.hide(`dialog`);
        },
        checkOwner(UserId){
            return this.$jwt.decode(localStorage.getItem(`access_token`)).UserId == UserId
        }
        
    }
}
</script>

<style>

</style>