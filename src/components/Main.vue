<template>
<div>
    <div class="d-flex justify-content-between main-head">
        <div>
            <h2>Welcome to Kanban Board</h2>
        </div>
        <div>
            <button class="btn btn-primary btn-md" id="addTask" @click="showAddForm">Add New task</button>
        </div>
    </div>
    <KanbanBoard 
        :tasks="tasks" 
        ref="board"
        @showDetail="showDetail"
        @showEdit="showEditForm"
        @renew="renewList"
        @deleteTask="triggerWarn"
    >
    </KanbanBoard>
    <ModalMain 
        :form="form" 
        :task="editTask"
        :detail="detailtask"
        :deleted="deleted"
        :class="{'modal-active': modalActivated}"
        @renew="renewList"
        @cancel="closeModal"
    >
    </ModalMain>
    
</div>
</template>

<script>
import KanbanBoard from './KanbanBoard';
import ModalMain from './ModalMain';
import GSignInButton from 'vue-google-signin-button';
import axios from 'axios';

export default {
    name: 'Main',
    components: {
        KanbanBoard, ModalMain
    },
    data() {
        return {
            tasks: [],
            modalActivated: false,
            form: '',
            editTask: '',
            detailtask: '',
            deleted: '',
            googleSignInParams: {
                client_id: '701067433216-akosvqvvev2l52s5kso2dqrtior1m7b8.apps.googleusercontent.com'
            }
        }
    },
    methods: {
        closeModal() {
            this.modalActivated = false;
            this.form = '';
        },
        showAddForm() {
            this.modalActivated = true;
            this.form = 'add';
        },
        showEditForm(taskEdit) {
            this.modalActivated = true;
            this.form = 'edit';
            this.editTask = taskEdit;
        },
        showDetail(detail) {
            this.modalActivated = true;
            this.form = 'detail';
            this.detailtask = detail;
        },
        triggerWarn(id) {
            this.modalActivated = true;
            this.form = 'warn';
            this.deleted = id;
        },
        showAllTask() {
            const { access_token } = localStorage;
            axios.get('http://localhost:4000/tasks', {
                headers: {
                    access_token
                }
            })
                .then(res => {
                    res.data.tasks.forEach(task => {
                        this.tasks.push(task);
                    })
                    this.$refs.board.separateTask();
                })
                .catch(err => {
                    console.log(err);
                })
        },
        renewList() {
            this.tasks = [];
            this.showAllTask();
            this.closeModal();
        }
    },
    created() {
        this.tasks = [];
        this.showAllTask();
    }
}
</script>

<style scoped>
    .main-head {
        padding: 10px;
    }

    .modal-active {
        visibility: visible;
        opacity: 1;
    }
</style>