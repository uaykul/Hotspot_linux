<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link class="navbar-brand" to="/">Hotspot-Auth</router-link>
  <div class="container-fluid">
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/register">Register</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/profile">Profile</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link" to="/logout" @click.prevent="logoutUser">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed:{
    ...mapGetters(["isLoggedIn"])
  },
  methods:{
    ...mapActions(['logout']),
    logoutUser(){
      this.logout();
    }
  }
};
</script>

<style>
</style>