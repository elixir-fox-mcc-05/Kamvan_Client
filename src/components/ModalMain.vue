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
            v-if="form === 'detail'"
            :task="detail" 
            @cancel="$emit('cancel')"
        >
        </DetailCard>
        <Warn
            v-if ="form === 'warn'"
            :deleted="deleted"
            @cancel="$emit('cancel')"
            @renew="$emit('renew')"
        >
        </Warn>
    </div>
</template>

<script>
import AddTaskForm from './Add';
import EditTaskForm from './Edit';
import DetailCard from './Detail';
import Warn from './Warning';

export default {
    name: 'ModalMain',
    components: {
        AddTaskForm, EditTaskForm, DetailCard, Warn
    },
    props: ['form', 'task', 'detail', 'deleted']
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
        transition: visibility 0.5s, opacity 0.5s;
    }
</style>