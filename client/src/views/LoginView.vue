<template>
    <div>
        <h2>Login</h2>
        <div class="row" >
            <div class="card mx-auto">
                <div class="card-header text-white bg-primary">
                    <h4>Login</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="loginUser">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input
                            id="email"
                            type="text" 
                            placeholder="Your e-mail" 
                            name="email" 
                            v-model="email" 
                            class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input
                            id="password"
                            type="password" 
                            placeholder="********" 
                            name="password" 
                            v-model="password" 
                            class="form-control">
                        </div>
                        <input type="submit" class="btn btn-primary" value="Login">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <router-link to="/register" class="card-link">Sign Up</router-link>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            email:"",
            password:"",
        }
    },
    methods:{
        ...mapActions(['login']),
        loginUser(){
           let user= {
            email:this.email,
            password:this.password,
           };
           this.login(user)
           .then(res =>{
            if(res.data.success){
                this.$router.push('/')
            }
           }).catch(err =>{
            console.log(err);
           })
        }
    }
}
</script>
<style>
 .card{
    width: 50%;
    border-radius: 0;
 }
 .btn {
    border-radius: 0;
 }
 .form-control{
    border-radius: 0;
 }
</style>