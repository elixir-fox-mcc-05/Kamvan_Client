new Vue({
    el: "#app",
    data: {
        steps: ['Back-Log', 'To-Do', 'Doing', 'Done'],
        currentPage: 'login',
        email: '',
        password: '',
        token: 'wdbcn029n30i120jwd0iwnc092c0n',
        tasks: []
    },
    methods: {
        login(){
            axios.get('http://localhost:3000/tasks')
            .then(data => {
                this.tasks = data.data
                console.log(this.tasks)
                this.email = ''
                this.password = ''
                this.currentPage = 'dashboard'
                localStorage.setItem('access_token', this.token)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    
    created(){
        console.log('created')
        if(localStorage.getItem('access_token')){
            this.currentPage = 'dashboard'
        }
        this.login()
    }
})