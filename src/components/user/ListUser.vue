<template>
    <div class="content-app">
        <div class="row mx-auto text-center mt-4 justify-content-center">
            <div class="col mt-4">
                <p class="h4">Administradores:<p/>
                <div class="mb-4">
                    <p
                    class="d-inline-block" 
                    v-for="(user, index) in users"
                    :key="index"
                    >
                        <b-avatar
                        size="6rem"
                        v-if="user.is_admin"
                        variant="secondary"
                        class="m-1" 
                        :src=user.profile.picture
                        ></b-avatar>
                    </p>
                </div>
                

                <div 
                class="col-lg-8 col-md-8 col-sm-12 text-center offset-lg-2 offset-md-1"
                v-if="users.length != 0"
                >
                    <p class="h4">Administar Encuestadores:<p/>

                    <b-list-group 
                    style="width: 100%;"
                    v-for="(user, index) in users"
                    :key="'polls'+index" 
                    >
                        <b-list-group-item
                        class="d-flex align-items-center"
                        v-if="!user.is_admin"
                        v-bind:class="{ 'bg-secondary': !user.is_pollster }"
                        >
                            <b-avatar
                            class="mr-3"
                            :src=user.profile.picture 
                            ></b-avatar>
                            <span class="mr-auto">{{user.first_name}} {{user.last_name}}
                                <b-badge variant="info">{{user.profile.polls}}</b-badge>
                            </span>


                            <b-button 
                            size="sm" 
                            class="ml-1" 
                            variant="danger"
                            v-bind:class="{ 'd-none': !user.is_pollster }"
                            v-on:click="updateUser(user.username,false)"
                            ><b-icon icon="x"></b-icon></b-button>

                            <b-button 
                            size="sm" 
                            class="ml-1" 
                            variant="success"
                            v-bind:class="{ 'd-none': user.is_pollster }"
                            v-on:click="updateUser(user.username,true)"
                            ><b-icon icon="check"></b-icon></b-button>

                        </b-list-group-item>
                    </b-list-group>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            users: [],
        }
    },
    methods: {
        getUsers () {
            const config = { 
                headers: {
                    'Authorization': 'Token ' + this.token,
                }
            };
            const path = "http://www.agrapi.com.ar/api/v1.0/pollsters/";
            axios.get(path).then((response) => {

                this.users = response.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        token () {
            return this.$store.state.token
        },
        updateUser(username,bool,index) {
            const config = { 
                headers: {
                    'Authorization': 'Token ' + this.token,
                }
            }
            let form = {
                is_pollster: bool
            }
            const path = `http://www.agrapi.com.ar/api/v1.0/pollsters/${username}/`;
            axios.patch(path,form).then((response) => {
                //this.formUser.is_pollster = localStorage.setItem('pollster',response.data.is_pollster)
                this.getUsers()
            })
            .catch(error => {
                console.log(error)
            })
        },
    },
    created() {
        this.getUsers()
    },
}
</script>

<style>
/*
.div-card {
    height: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    background: linear-gradient(90deg, rgb(179, 173, 173), rgb(223, 210, 208));
    border-radius: 20px;
    
}
.carouser-card-container {
    box-shadow: 1px 6px 24px #8b8585;
    
}
*/
</style>