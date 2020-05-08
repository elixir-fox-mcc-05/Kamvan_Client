// new Vue({
//     el: '#app',
//     data: {
//         show_page: "home",
//         tasks: null,
//         status: false,
//         // user
//         email: "",
//         password: "",
//         // task
//         taskId: null,
//         title: "",
//         description: "",
//         category: "",
//         authorId: null,
//     },
//     methods: { 
//         // get_started() { this.show_page = 'get-started' },
//         home() { this.show_page = 'home' },
//         register_form() { this.show_page = "register" },
//         registered() {
//             axios({
//                 method: 'POST',
//                 url: 'http://localhost:3000/register',
//                 data: {
//                     email: this.email,
//                     password: this.password
//                 }
//             })
//             .then(new_user => { // respon menerima id dan email new user
//                 this.show_page = 'home'
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//         },
//         login() { this.show_page = 'login' },
//         logged() { 
//             axios({
//                 method: 'POST',
//                 url: 'http://localhost:3000/login',
//                 data: {
//                     email: this.email,
//                     password: this.password
//                 }
//             })
//             .then(({data}) => {
//                 this.authorId = data.UserId
//                 this.show_page = 'home'
//                 this.status = true
//                 localStorage.setItem('access_token', data.access_token)

//                 this.email = ''
//                 this.password = ''
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//         },
//         logout() {
//             if (localStorage.access_token) {
//                 localStorage.removeItem('access_token')
//                 this.authorId = null
//                 this.status =false
//             } else {
//                 console.log('login')
//                 this.show_page = 'login'
//             }
//         },
//         task_form() { this.show_page = 'task' },
//         add_task() {
//             axios({
//                 method: 'POST',
//                 url: 'http://localhost:3000/tasks',
//                 headers: {
//                     access_token: localStorage.access_token
//                 },
//                 data: {
//                     title: this.title,
//                     description: this.description,
//                     category: this.category,
//                 }
//             })
//             .then((data) => {
//                 console.log(data)
//                 console.log('halo')
//                 // this.show_page = 'home'
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//         },
//         edit_task(id) {
//             axios({
//                 method: 'GET',
//                 url: `http://localhost:3000/tasks/${id}`,
//                 headers: {
//                     access_token: localStorage.access_token
//                 }
//             })
//             .then(({data}) => {
//                 this.taskId = data.task_by_id.id
//                 this.title = data.task_by_id.title
//                 this.description = data.task_by_id.description
//                 this.category = data.task_by_id.category

//                 this.show_page = 'edit'
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//         },
//         edited_task() {
//             axios({
//                 method: 'PUT',
//                 url: `http://localhost:3000/tasks/${this.taskId}`,
//                 headers: {
//                     access_token: localStorage.access_token
//                 },
//                 data : {
//                     title : this.title,
//                     description : this.description,
//                     category : this.category
//                 }
//             })
//             .then(({data}) => {
//                 this.show_page = 'home'
//                 console.log(data)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//         },
//         delete_task(id) {
//             axios({
//                 method: 'DELETE',
//                 url: `http://localhost:3000/tasks/${id}`,
//                 headers: {
//                     access_token: localStorage.access_token
//                 }
//             })
//             .then((data) => {
//                 axios({
//                     method: 'GET',
//                     url: 'http://localhost:3000/tasks',
//                     headers: {
//                         access_token: localStorage.access_token
//                     }
//                 })
//                 .then(({data}) => {
//                     this.show_page = 'home'
//                 })
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//         }
//     },
//     beforeCreate() {
//         axios.get(`http://localhost:3000/tasks`)
//             .then(({data}) => {
//                 this.tasks = data.tasks
//             }).catch(err => {
//                 console.log(err)
//             });
//     },
//     created() {
//         if (localStorage.access_token) {
//             axios({
//                 method: 'POST',
//                 url: 'http://localhost:3000/logged',
//                 headers: {
//                     access_token: localStorage.access_token
//                 }
//             })
//             .then(({data}) => {
//                 this.authorId = data.UserId
//                 this.show_page = 'home'
//             })
//         }
//     }
// })