<template>
  <!-- MAIN PAGE -->
        <div class="container-fluid">
            <header>
                <nav class="navbar fixed-top">
                    <img src="../hacktiv8.png" alt="" width="48" height="48">
                    <div class="row">
                      <h1> Kanban Board </h1>
                      <div v-if="isLoading" class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                      <div v-else></div>
                    </div>         
                    <div>
                        <!-- Button trigger modal -->
                        <button @click.prevent="emptyAdd" type="button" class="btn btn-primary" data-toggle="modal" data-target="#addTask">
                            Add Task
                        </button>
            
                          <!-- Modal -->
                          <div class="modal fade" id="addTask" data-backdrop="" tabindex="-1" role="dialog" aria-labelledby="taskLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="taskLabel">Add Task</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  <form class="form-signin" @submit.prevent="addTask">
                                      <div class="form-label-group">
                                          <input v-model="task.title" type="text" id="taskTitle" class="form-control" placeholder="Task Title" required autofocus>
                                          <label for="taskTitle">Task Title</label>
                                      </div>

                                      <div class="form-group">
                                        <select v-model="task.category" id="taskCategory" class="custom-select" required>
                                          <option value="" disabled>Choose Category</option>
                                          <option value="backlog">Backlog</option>
                                          <option value="todo">To Do</option>
                                          <option value="done">Done </option>
                                          <option value="completed">Completed </option>
                                        </select>
                                      </div>

                                      <button class="btn btn-primary" type="submit">Add Task</button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- END OF MODAL -->                 
                                
                          <button @click.prevent="logout" class="btn btn-secondary">Logout</button>
                    </div>
                </nav>    
                    <!-- Modal -->
                          <div class="modal fade" id="editTask" data-backdrop="" tabindex="-1" role="dialog" aria-labelledby="taskLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="taskLabel">Edit Task</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  <form class="form-signin" @submit.prevent="updateTask(task, task.title)">
                                      <div class="form-label-group">
                                          <input v-model="task.title" type="text" id="editTitle" class="form-control" placeholder="Task Title" required autofocus>
                                          <label for="editTitle">Task Title</label>
                                      </div>
                                      <button class="btn btn-primary" type="submit">Edit Task</button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- END OF MODAL --> 
            </header>
            <main class="medium">
                <main-content 
                    :baseUrl='baseUrl'
                    :task='task'
                    :tasks='tasks'
                    @getTasks='getTasks'
                    :categories='categories'
                />
            </main>
            <!-- END OF MAIN PAGE -->  
            <footer>
                <div class="footer fixed-bottom" id="bottom">
                    <h4>Made By : Robin</h4>
                    <h6>Powered By : Bootstrap</h6>
                </div>
            </footer>
        </div>
</template>

<script>
import MainContent from '../component/MainContent'

export default {
    name: 'MainPage',
    data () {
      return {
        isLoading: false
      }
    },
    props: [
        'baseUrl',
        'task',
        'tasks',
        'categories'
    ], 
    components: {
      MainContent
    },
    methods: {
        logout() {
            this.$toasted.success('Successfully logged out').goAway(5000)
            localStorage.removeItem('token')
            this.$emit('changeLogin', false)

            var auth2 = gapi.auth2.getAuthInstance()
            auth2.signOut().then(function () {
              console.log('User signed out.')
            })

      },
      emptyAdd () {
        this.task.title = ''
      },
      addTask() {
        this.isLoading = true
        axios({
          method: "POST",
          url: this.baseUrl + '/tasks',
          data: {
            title: this.task.title,
            category: this.task.category
          },
          headers: {
            access_token: localStorage.token
          }
        })
          .then( result => {
            this.task.title = ''
            this.task.category = ''
            this.$emit('getTasks')
            $('#addTask').modal('hide')
            this.$toasted.success('Successfully added task').goAway(5000)
          })
          .catch( err => {
            this.$toasted.error(err.response.data.errors[0].message).goAway(5000)
          })
          .finally(() => {
              this.isLoading = false
          })
          
      },
      updateTask(id, title) {
        this.isLoading = true
        axios({
            method: 'PUT',
            url: this.baseUrl + '/tasks/' + id.id,
            data: {
              title
            },
            headers: {
              access_token: localStorage.token
            }
          })
            .then( result => {
                this.$emit('getTasks')
                this.$toasted.success('Task Title Updated').goAway(5000)
                $('#editTask').modal('hide')
            })
            .catch( err => {
              console.log(err.response)
            })
            .finally(() => {
                this.isLoading = false
            })
      },
      getTasks() {
        this.$emit('getTasks')
      }
    }
}
</script>

<style>

</style>