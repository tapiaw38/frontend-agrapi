<template>
    <div>
        <b-modal id="bv-modal-login" hide-footer>
            <template #modal-title>
                <h4>Iniciar sesión</h4>
            </template>
            <div class="d-block text-center">
                <!--
                <img src="/static/img/sec-produ.png" alt="logo" width="150" height="auto" class="m-0">
                -->
                <h1 class="text-success"><b-icon icon="person" scale="3"></b-icon></h1>
                <div class="login-form">
                    <form action="#" @submit.prevent="login" class="text-left">
                        <div class="form-controls">
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" class="login-input" v-model="email">
                        </div>
                        
                        <div class="form-controls">
                            <label for="Password">Password</label>
                            <input type="password" name="password" id="password" class="login-input" v-model="password">
                        </div>

                        <div class="form-controls">
                            <b-button variant="success" type="submit" class="btn-submit">INGRESAR</b-button>
                        </div>
                    </form>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    name: 'LoginModal',
    data() {
        return {
            email: '',
            password: '',
        }           
    },
    methods: {
        login() {
            this.$store.dispatch('retrieveToken', {
                email: this.email,
                password: this.password,
            })
            .then(response => {
                //location.href = '/home'
                this.$router.push({ name: 'Home' })
            }).catch(error => {
                //this.error = true;
                //this.onReset()
                console.log(error.response.data.non_field_errors)
                let msj = error.response.data.non_field_errors[0]
                Swal.fire('Oops...',msj,'error')
            })
        }
    }
    
}
</script>