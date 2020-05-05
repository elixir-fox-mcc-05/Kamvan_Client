let baseUrl = 'http://localhost:3000'

new Vue ({
    el:'#app',
    data : {
        displayPage : 'login',
        login : {
            email : '',
            password : '',
            error : false,
            errMsg : ''
        },
        register : {
            email : '',
            password : '',
            confirm_password : '',
            error : false,
            errMsg : '',
            success : ''
        }
    },
    methods : {
        // login form
        loginSubmit() {
            axios({
                method : 'post',
                url : baseUrl+'/login',
                data : {
                    email : this.login.email,
                    password : this.login.password
                }
            })
            .then(result=>{
                localStorage.setItem('kamvanToken',result.data.token)
                this.displayPage = 'dashboard'
            })
            .catch(error=>{
                this.login.error = true
                this.login.errMsg = error.response.data.msg
            })
        },
        // register form
        registerSubmit(){
            // console.log(
            //     this.register.email,
            //     this.register.password,
            //     this.register.confirm_password
            // )
            axios({
                method : 'post',
                url : baseUrl+'/register',
                data : {
                    email : this.register.email,
                    password : this.register.password,
                    confirm_password : this.register.confirm_password,
                }
            })
            .then(result=>{
                this.register.email = ''
                this.register.password = ''
                this.register.confirm_password = ''
                this.register.success = result.data.msg
            })
            .catch(error=>{
                this.register.error = true
                this.register.errMsg = error.response.data.error
            })
        },
        // cancel register button
        cancelBtn() {
            this.register.email = ''
            this.register.password = ''
            this.register.confirm_password = ''
            this.register.success = ''
        }
    },
    created() {
        let token = localStorage.getItem('kamvanToken')
        if(token) {
            // this.methods.loginSubmit()
            this.displayPage = 'dashboard'
        }
    }
})