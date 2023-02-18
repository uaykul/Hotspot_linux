<template>
    <div>
        <h2>Profile</h2>
        <div class="card">
            <ul class="list-group">
                <li class="list-group-item">Email: {{ user.email }} </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    computed: mapGetters(['user']),
    methods:{
        ...mapActions(['getProfile'])
    },
    created(){
        this.getProfile();
    }
}
</script>

<style>
</style>