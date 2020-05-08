<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#exampleModalCenter" @click.prevent="fetchOrgList"> Register </button>
        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h4 class="modal-title" id="exampleModalCenterTitle">welcome new user</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body" id="formRegister">
                    
                    <!-- form register -->
                    <form @submit.prevent = "registerSubmit" v-if="!register.success">
                        <h5 style="text-align: center;">please input your valid data below</h5> <hr>
                        <div class="alert alert-danger" v-if="register.error === true">
                            {{ register.errMsg}}
                        </div>
                        <div class="form-group">
                            <input type="email" v-model="register.email" class="form-control" id="emailRegister" aria-describedby="emailHelp" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <input type="password" v-model="register.password" class="form-control" id="passwordRegister" placeholder="Password">
                        </div>
                        <div class="form-group">
                            <input type="password" v-model="register.confirm_password" class="form-control" id="confirm_password" placeholder="Confirm password">
                        </div>
                        <div class="form-group">
                            <label for="org">Choose your organization</label>
                            <select class="form-control" id="org" v-model="register.orgSelect">
                                <option v-for="org in register.orgList" :key="org">
                                    {{ org }}
                                </option>
                            </select>
                        </div> 
                        <div class="form-group">
                            <input type="text" v-model="register.orgInputText" class="form-control" id="orgInputText" placeholder="Or create new organisation">
                        </div>
                        <button type="submit" class="btn btn-primary">Register</button>
                        <button type="button" @click="cancelBtn" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                    </form>
                    <!-- success response -->
                    <div v-if="register.success">
                        <div class="alert alert-success" >
                            {{ register.success }}
                        </div>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="finishRegister">Close</button>
                    </div>
                    <!-- success respond end -->
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "register",
    data() {
        return {
            baseUrl : 'http://localhost:3000',
            register : {
                email : '',
                password : '',
                confirm_password : '',
                error : false,
                errMsg : '',
                success : '',
                orgInputText: '',
                orgSelect: '',
                orgList: []
            },
        }
    },
    methods : {
        registerSubmit(){
            let orgSubmit = ''
            if(this.register.orgInputText) {
                orgSubmit = this.register.orgInputText
            } else if (this.register.orgSelect) {
                orgSubmit = this.register.orgSelect
            } else { }
            axios({
                method : 'post',
                url : this.baseUrl+'/register',
                data : {
                    email : this.register.email,
                    password : this.register.password,
                    confirm_password : this.register.confirm_password,
                    org : orgSubmit,
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
        },
        fetchOrgList(){
            axios({
                methods : 'get',
                url : this.baseUrl+'/getOrgList'
            })
            .then(result=>{
                 let newArr = result.data.orgList.sort()
                 this.register.orgList = this.removeDuplicates(newArr)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        removeDuplicates(array) {
            return array.filter((a, b) => array.indexOf(a) === b)
        },
        finishRegister() {
            location.reload();
        }
    }
}
</script>

<style>

</style>