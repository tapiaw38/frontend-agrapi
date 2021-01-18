<template lang="html">
    <div>
        <div id="img-production">
            <div id="target-production">
                <div id="text-target">
                    <img src="/static/img/sec-produ.png" alt="logo" width="300" height="auto" class="m-0">
                    <p class="h1">Bit</p>
                    <!--<p>BASE AGROPECUARIA TERRITORIAL</p>-->
                </div>
            </div>
        </div>

        <LoginModal/>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import LoginModal from './LoginModal.vue'

export default {
    name: 'login',
    components: {
        LoginModal
    },
    data() {
        return {
            email: '',
            password: '',
            error: false,
            error_msj: "",
        }
    },
    methods: {
        getImage: function () {
            var img = new Image()
            img.onload = function () {
                document.getElementById("img-production").style.backgroundImage = "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(/static/img/img-vid.jpg)"
            }
            img.src = "/static/img/img-vid.jpg"
        }
    },
    created() {
        this.getImage()
    },
}
</script>

<style>
#img-production{
  /*background-image: linear-gradient(
    rgba(0,0,0,0.6),
    rgba(0,0,0,0.6)
    ),  url('/static/img/img-vid.jpg');*/
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background-color: rgb(129, 133, 133);
    height: 100%;
    overflow-y: hidden;
    position: absolute;
    width: 100%;
}

#target-production {
    border-radius: 10px;
    width: 100%;
    height: 300px;
    color: rgb(255, 255, 255);
}
#text-target {
    margin-top: 17%;
    font-size: 150%;
    height: 100%;
    text-align: center;
    font-weight: normal;
    font-weight: bold;
}
label {
    display: block;
    margin-bottom: 4px;
}
.login-heading {
    margin-bottom: 16px;
}
.form-controls {
    margin-bottom: 24px;
}
.mb-more {
    margin-bottom: 42px;
}
.login-form {
    max-width: 500px;
    margin: auto;
    padding-top: 30px;
}
.login-input {
    width: 100%;
    font-size: 16px;
    padding: 12px 16px;
    outline: 0;
    border-radius: 3px;
    border: 1px solid lightgrey;
}
.btn-submit {
    width: 100%;
    padding: 14px 12px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    border-radius: 3px;
    cursor: pointer;
}
</style>