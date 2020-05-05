new Vue({
    el: "#app",
    data: {
        steps: ['Back-Log', 'To-Do', 'Doing', 'Done'],
        currentPage: 'login',
        email: '',
        password: '',
        token: 'wdbcn029n30i120jwd0iwnc092c0n'
    },
    methods: {
        login(){
            this.email = ''
            this.password = ''
            this.currentPage = 'dashboard'
            localStorage.setItem('access_token', this.token)
        }
    }
})