<template>
    <div class="modal-bg">
        <AddTaskForm 
            v-if="form === 'add'" 
            @cancel="$emit('cancel')"
            @renew="$emit('renew')"
        >
        </AddTaskForm>
        <EditTaskForm
            v-if="form === 'edit'"
            :task="task"
            @cancel="$emit('cancel')"
            @renew="$emit('renew')"
        >
        </EditTaskForm>
        <DetailCard 
            :task="detail" 
            v-if="form === 'detail'"
            @cancel="$emit('cancel')"
        >
        </DetailCard>
    </div>
</template>

<script>
import AddTaskForm from './Add';
import EditTaskForm from './Edit';
import DetailCard from './Detail';

export default {
    name: 'ModalMain',
    components: {
        AddTaskForm, EditTaskForm, DetailCard
    },
    props: ['form', 'task', 'detail']
}
</script>

<style scoped>
    .modal-bg {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s;
    }
</style>